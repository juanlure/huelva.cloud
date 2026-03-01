#!/usr/bin/env node
/**
 * Huelva.cloud Workflow Orchestrator v2.0
 * Sistema unificado de publicación diaria
 * 
 * Workflow stages:
 *   1. SCRAPE → 2. PROCESS → 3. PUBLISH
 * 
 * Ejecución:
 *   node workflow-orchestrator.mjs [mode]
 *   
 * Modes:
 *   morning  → 08:00 (noticias + repaso agenda)
 *   midday   → 14:00 (agenda + noticias si es necesario)
 *   evening  → 20:00 (agenda finde + noticias + planificación)
 *   full     → Todo en secuencia (para manual)
 */

import { execSync } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración
const REPO = '/home/claw1/.openclaw/workspace/huelva-is';
const LOG_DIR = path.join(REPO, 'logs');
const EXTERNAL_NEWS_FILE = path.join(REPO, 'src/content/external-news.json');
const ARTICLES_FILE = path.join(REPO, 'src/content/articles.ts');

// Estados del workflow
const STATE_FILE = path.join(LOG_DIR, '.workflow-state.json');

// Colores para logs
const C = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// Emojis por nivel
const ICONS = {
  info: 'ℹ️ ',
  success: '✅ ',
  warn: '⚠️ ',
  error: '❌ '
};

// Logger estructurado
class WorkflowLogger {
  constructor() {
    this.logs = [];
    this.startTime = Date.now();
  }

  log(level, message, data = null) {
    const entry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
      elapsed: Date.now() - this.startTime
    };
    this.logs.push(entry);
    
    const icon = ICONS[level] || '';
    console.log(`${icon}${message}`);
    if (data && process.env.DEBUG) {
      console.log(JSON.stringify(data, null, 2));
    }
  }

  info(msg, data) { this.log('info', msg, data); }
  success(msg, data) { this.log('success', msg, data); }
  warn(msg, data) { this.log('warn', msg, data); }
  error(msg, data) { this.log('error', msg, data); }

  async save(mode) {
    const date = new Date().toISOString().split('T')[0];
    const logFile = path.join(LOG_DIR, `workflow-${mode}-${date}.json`);
    await fs.mkdir(LOG_DIR, { recursive: true });
    await fs.writeFile(logFile, JSON.stringify({
      mode,
      executedAt: new Date().toISOString(),
      duration: Date.now() - this.startTime,
      logs: this.logs
    }, null, 2));
    return logFile;
  }
}

// Estado del workflow (para saber qué se hizo hoy)
async function loadState() {
  try {
    const data = await fs.readFile(STATE_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return { lastRun: null, today: { news: 0, agenda: 0, guides: 0 } };
  }
}

async function saveState(state) {
  await fs.mkdir(LOG_DIR, { recursive: true });
  await fs.writeFile(STATE_FILE, JSON.stringify(state, null, 2));
}

// Helpers
function isToday(dateStr) {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  const today = new Date();
  return d.toDateString() === today.toDateString();
}

async function exec(cmd, options = {}) {
  try {
    const result = execSync(cmd, { 
      encoding: 'utf8', 
      cwd: REPO,
      timeout: options.timeout || 120000,
      ...options 
    });
    return { success: true, output: result };
  } catch (e) {
    return { success: false, error: e.message, code: e.status };
  }
}

// Contadores de contenido
async function countContent() {
  const [newsData, articlesContent] = await Promise.all([
    fs.readFile(EXTERNAL_NEWS_FILE, 'utf8').then(JSON.parse).catch(() => ({ count: 0 })),
    fs.readFile(ARTICLES_FILE, 'utf8').catch(() => '')
  ]);
  
  const localArticles = (articlesContent.match(/slug:/g) || []).length;
  
  return {
    externalNews: newsData.count || 0,
    localArticles,
    total: (newsData.count || 0) + localArticles
  };
}

// ============ WORKFLOW STAGES ============

async function stageScrapeNews(logger, maxNewsToday = 3) {
  logger.info('STAGE 1: Scrape Noticias');
  
  const state = await loadState();
  const newsToday = isToday(state.lastRun) ? state.today.news : 0;
  
  if (newsToday >= maxNewsToday) {
    logger.info(`Ya se publicaron ${newsToday} noticias hoy. Skip.`);
    return { skipped: true, reason: 'quota_reached' };
  }
  
  logger.info(`Publicadas hoy: ${newsToday}/${maxNewsToday}. Ejecutando scraper...`);
  
  const result = await exec('node scripts/scrape-and-rewrite.mjs 2>&1');
  
  if (!result.success) {
    logger.error('Scraper falló', { error: result.error });
    return { success: false, error: result.error };
  }
  
  logger.info('Scraper completado', { output: result.output?.slice(0, 200) });
  
  // Verificar que se añadió una noticia
  const contentBefore = await countContent();
  await new Promise(r => setTimeout(r, 500));
  const contentAfter = await countContent();
  
  if (contentAfter.externalNews > contentBefore.externalNews) {
    logger.success(`Noticia añadida. Total: ${contentAfter.externalNews}`);
    state.today.news = (state.today.news || 0) + 1;
    await saveState(state);
    return { success: true, added: true };
  } else {
    logger.warn('No se detectó nueva noticia (posible duplicado o sin novedades)');
    return { success: true, added: false };
  }
}

async function stageProcessContent(logger) {
  logger.info('STAGE 2: Procesamiento de Contenido');
  
  // Verificar integridad del JSON
  const result = await exec('node -e "JSON.parse(require(\'fs\').readFileSync(\'src/content/external-news.json\'))"');
  
  if (!result.success) {
    logger.error('JSON inválido', { error: result.error });
    return { success: false, error: 'invalid_json' };
  }
  
  logger.success('JSON válido');
  return { success: true };
}

async function stagePublish(logger) {
  logger.info('STAGE 3: Publicación (Git)');
  
  // Verificar si hay cambios
  const status = await exec('git status --porcelain src/content/external-news.json');
  
  if (!status.output?.trim()) {
    logger.info('Sin cambios para publicar');
    return { success: true, published: false, reason: 'no_changes' };
  }
  
  // Commit y push
  const add = await exec('git add src/content/external-news.json');
  if (!add.success) {
    logger.error('Git add falló', { error: add.error });
    return { success: false, error: 'git_add_failed' };
  }
  
  const date = new Date().toISOString().split('T')[0];
  const commit = await exec(`git commit -m "news: actualización ${date}" --author "juanlure <132950338+juanlure@users.noreply.github.com>"`);
  
  if (!commit.success) {
    logger.error('Git commit falló', { error: commit.error });
    return { success: false, error: 'git_commit_failed' };
  }
  
  const push = await exec('git push origin main');
  if (!push.success) {
    logger.error('Git push falló', { error: push.error });
    return { success: false, error: 'git_push_failed' };
  }
  
  logger.success('Publicado en Vercel');
  return { success: true, published: true };
}

async function stageAgendaCheck(logger) {
  logger.info('STAGE: Check Agenda');
  
  // Aquí iría lógica de verificación de eventos
  // Por ahora solo logging
  const counts = await countContent();
  logger.info(`Contenido actual: ${counts.externalNews} noticias, ${counts.localArticles} artículos`);
  
  return { success: true };
}

// ============ MODES ============

async function runMorning(logger) {
  logger.info('=== MODO: MORNING (08:00) ===');
  
  const results = {
    news: await stageScrapeNews(logger, 1),     // 1 noticia en morning
    process: await stageProcessContent(logger),
    agenda: await stageAgendaCheck(logger),
    publish: await stagePublish(logger)
  };
  
  return results;
}

async function runMidday(logger) {
  logger.info('=== MODO: MIDDAY (14:00) ===');
  
  const results = {
    news: await stageScrapeNews(logger, 2),     // Max 2 al día
    agenda: await stageAgendaCheck(logger),
    publish: await stagePublish(logger)
  };
  
  return results;
}

async function runEvening(logger) {
  logger.info('=== MODO: EVENING (20:00) ===');
  
  const results = {
    news: await stageScrapeNews(logger, 3),     // Max 3 al día
    agenda: await stageAgendaCheck(logger),
    process: await stageProcessContent(logger),
    publish: await stagePublish(logger)
  };
  
  // Resumen diario
  const counts = await countContent();
  logger.info('=== RESUMEN DEL DÍA ===');
  logger.info(`Noticias acumuladas: ${counts.externalNews}`);
  logger.info(`Artículos locales: ${counts.localArticles}`);
  
  return results;
}

async function runFull(logger) {
  logger.info('=== MODO: FULL (ejecución manual) ===');
  
  await runMorning(logger);
  await runMidday(logger);
  await runEvening(logger);
}

// ============ MAIN ============

async function main() {
  const mode = process.argv[2] || 'morning';
  const validModes = ['morning', 'midday', 'evening', 'full'];
  
  if (!validModes.includes(mode)) {
    console.error(`Modo inválido: ${mode}. Usa: ${validModes.join(', ')}`);
    process.exit(1);
  }
  
  const logger = new WorkflowLogger();
  
  try {
    // Actualizar estado
    const state = await loadState();
    state.lastRun = new Date().toISOString();
    if (!isToday(state.lastRun)) {
      state.today = { news: 0, agenda: 0, guides: 0 };
    }
    await saveState(state);
    
    // Ejecutar modo
    const runners = {
      morning: runMorning,
      midday: runMidday,
      evening: runEvening,
      full: runFull
    };
    
    const results = await runners[mode](logger);
    
    // Guardar log
    const logFile = await logger.save(mode);
    logger.info(`Log guardado: ${logFile}`);
    
    // Exit code basado en resultados
    const hasErrors = Object.values(results).some(r => r?.success === false && !r?.skipped);
    process.exit(hasErrors ? 1 : 0);
    
  } catch (e) {
    logger.error('Error fatal', { error: e.message });
    await logger.save(mode);
    process.exit(1);
  }
}

main();
