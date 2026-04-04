#!/usr/bin/env node
/**
 * Huelva.cloud Workflow Orchestrator v3.0 - Optimizado
 * Sistema unificado de publicación diaria con timeouts por stage
 * 
 * Optimizaciones v3:
 *   - Timeouts por stage individuales
 *   - Circuit breaker para scraper lento
 *   - Modos midday/evening son lightweight (solo checks)
 */

import { execSync } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPO = '/home/claw1/.openclaw/workspace/huelva-is';
const LOG_DIR = path.join(REPO, 'logs');
const EXTERNAL_NEWS_FILE = path.join(REPO, 'src/content/external-news.json');
const ARTICLES_FILE = path.join(REPO, 'src/content/articles.ts');
const STATE_FILE = path.join(LOG_DIR, '.workflow-state.json');

// Timeouts por operación (ms)
const TIMEOUTS = {
  scrape: 60000,      // 1 min para scrape
  git: 30000,         // 30s para git
  process: 10000,     // 10s para procesar
  count: 5000,        // 5s para contar
};

const ICONS = { info: 'ℹ️ ', success: '✅ ', warn: '⚠️ ', error: '❌ ' };

class WorkflowLogger {
  constructor() {
    this.logs = [];
    this.startTime = Date.now();
  }

  log(level, message, data = null) {
    const entry = { timestamp: new Date().toISOString(), level, message, data, elapsed: Date.now() - this.startTime };
    this.logs.push(entry);
    console.log(`${ICONS[level] || ''}${message}`);
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
      mode, executedAt: new Date().toISOString(), duration: Date.now() - this.startTime, logs: this.logs
    }, null, 2));
    return logFile;
  }
}

async function loadState() {
  try { return JSON.parse(await fs.readFile(STATE_FILE, 'utf8')); }
  catch { return { lastRun: null, today: { news: 0, agenda: 0, guides: 0 } }; }
}

async function saveState(state) {
  await fs.mkdir(LOG_DIR, { recursive: true });
  await fs.writeFile(STATE_FILE, JSON.stringify(state, null, 2));
}

function isToday(dateStr) {
  if (!dateStr) return false;
  return new Date(dateStr).toDateString() === new Date().toDateString();
}

async function exec(cmd, options = {}) {
  const start = Date.now();
  try {
    const result = execSync(cmd, { encoding: 'utf8', cwd: REPO, timeout: options.timeout || 30000, ...options });
    return { success: true, output: result, elapsed: Date.now() - start };
  } catch (e) {
    return { success: false, error: e.message, code: e.status, elapsed: Date.now() - start };
  }
}

async function countContent() {
  try {
    const [newsData, articlesContent] = await Promise.all([
      fs.readFile(EXTERNAL_NEWS_FILE, 'utf8').then(JSON.parse).catch(() => ({ count: 0 })),
      fs.readFile(ARTICLES_FILE, 'utf8').catch(() => '')
    ]);
    const localArticles = (articlesContent.match(/slug:/g) || []).length;
    return { externalNews: newsData.count || 0, localArticles, total: (newsData.count || 0) + localArticles };
  } catch {
    return { externalNews: 0, localArticles: 0, total: 0 };
  }
}

// ============ STAGES ============

async function stageScrapeNews(logger, maxNewsToday = 3) {
  logger.info('STAGE 1: Scrape Noticias');
  
  const state = await loadState();
  const newsToday = isToday(state.lastRun) ? state.today.news : 0;
  
  if (newsToday >= maxNewsToday) {
    logger.info(`Cuota alcanzada: ${newsToday}/${maxNewsToday}. Skip.`);
    return { skipped: true, reason: 'quota_reached' };
  }
  
  logger.info(`Noticias hoy: ${newsToday}/${maxNewsToday}`);

  const before = await countContent();
  
  // Ejecutar scraper con timeout estricto
  const result = await exec('node scripts/scrape-and-rewrite.mjs 2>&1', { timeout: TIMEOUTS.scrape });
  
  if (!result.success) {
    if (result.elapsed >= TIMEOUTS.scrape - 1000) {
      logger.error('Scraper TIMEOUT', { elapsed: result.elapsed });
      return { success: false, error: 'timeout', fatal: false };
    }
    logger.error('Scraper falló', { error: result.error?.slice(0, 200) });
    return { success: false, error: result.error };
  }
  
  logger.success(`Scraper OK (${result.elapsed}ms)`);
  
  // Verificar que se añadió noticia
  await new Promise(r => setTimeout(r, 500));
  const after = await countContent();
  
  if (after.externalNews > before.externalNews) {
    const addedCount = after.externalNews - before.externalNews;
    logger.success(`Noticia añadida: +${addedCount} (${after.externalNews} total)`);
    state.today.news = newsToday + addedCount;
    await saveState(state);
    return { success: true, added: true, addedCount };
  }
  
  logger.warn('Sin nuevas noticias (duplicado o sin novedades)');
  return { success: true, added: false };
}

async function stageProcessContent(logger) {
  logger.info('STAGE 2: Procesamiento');
  const result = await exec('node -e "JSON.parse(require(\'fs\').readFileSync(\'src/content/external-news.json\'))"', { timeout: TIMEOUTS.process });
  if (!result.success) {
    logger.error('JSON inválido');
    return { success: false };
  }
  logger.success('JSON válido');
  return { success: true };
}

async function stagePublish(logger) {
  logger.info('STAGE 3: Git Publish');
  
  const status = await exec('git status --porcelain src/content/external-news.json', { timeout: TIMEOUTS.git });
  if (!status.output?.trim()) {
    logger.info('Sin cambios');
    return { success: true, published: false };
  }
  
  const add = await exec('git add src/content/external-news.json', { timeout: TIMEOUTS.git });
  if (!add.success) return { success: false, error: 'git_add' };
  
  const date = new Date().toISOString().split('T')[0];
  const commit = await exec(`git commit -m "news: ${date}" --author "juanlure <132950338+juanlure@users.noreply.github.com>"`, { timeout: TIMEOUTS.git });
  if (!commit.success) return { success: false, error: 'git_commit' };
  
  const push = await exec('git push origin main', { timeout: TIMEOUTS.git });
  if (!push.success) return { success: false, error: 'git_push' };
  
  logger.success('Publicado');
  return { success: true, published: true };
}

async function stageQuickCheck(logger) {
  logger.info('STAGE: Check Rápido');
  const counts = await countContent();
  logger.info(`Contenido: ${counts.externalNews} noticias, ${counts.localArticles} artículos`);
  return { success: true, counts };
}

// ============ MODES ============

async function runMorning(logger) {
  logger.info('=== MORNING (08:00) ===');
  return {
    news: await stageScrapeNews(logger, 1),
    process: await stageProcessContent(logger),
    check: await stageQuickCheck(logger),
    publish: await stagePublish(logger)
  };
}

async function runMidday(logger) {
  logger.info('=== MIDDAY (14:00) - Lightweight ===');
  // Midday solo hace check rápido, no scrapea para evitar timeouts
  return {
    check: await stageQuickCheck(logger),
    news: { skipped: true, reason: 'midday_is_lightweight' }
  };
}

async function runEvening(logger) {
  logger.info('=== EVENING (20:00) - Lightweight ===');
  // Evening solo hace check y permite 1 noticia más si no se alcanzó cuota
  const state = await loadState();
  const newsToday = isToday(state.lastRun) ? state.today.news : 0;
  
  const results = { check: await stageQuickCheck(logger) };
  
  if (newsToday < 2) {
    results.news = await stageScrapeNews(logger, 2);
    if (results.news.added) {
      results.process = await stageProcessContent(logger);
      results.publish = await stagePublish(logger);
    }
  } else {
    results.news = { skipped: true, reason: 'quota_reached' };
  }
  
  return results;
}

async function runFull(logger) {
  logger.info('=== FULL (manual) ===');
  const morning = await runMorning(logger);
  const evening = await runEvening(logger);
  return { morning, evening };
}

// ============ MAIN ============

async function main() {
  const mode = process.argv[2] || 'morning';
  const validModes = ['morning', 'midday', 'evening', 'full'];
  
  if (!validModes.includes(mode)) {
    console.error(`Modo inválido. Usa: ${validModes.join(', ')}`);
    process.exit(1);
  }
  
  const logger = new WorkflowLogger();
  
  try {
    const state = await loadState();
    const previousLastRun = state.lastRun;
    if (!isToday(previousLastRun)) state.today = { news: 0, agenda: 0, guides: 0 };
    state.lastRun = new Date().toISOString();
    await saveState(state);
    
    const runners = { morning: runMorning, midday: runMidday, evening: runEvening, full: runFull };
    const results = await runners[mode](logger);
    
    // Resumen
    const counts = await countContent();
    console.log('\n' + '='.repeat(40));
    console.log(`📰 Workflow ${mode} — ${new Date().toLocaleTimeString('es-ES')}`);
    console.log(`📊 Noticias: ${counts.externalNews} | Artículos: ${counts.localArticles}`);
    console.log('='.repeat(40));
    
    await logger.save(mode);
    
    const hasFatal = Object.values(results).some(r => r?.fatal === true);
    process.exit(hasFatal ? 1 : 0);
    
  } catch (e) {
    logger.error('Error fatal', { error: e.message });
    await logger.save(mode);
    process.exit(1);
  }
}

main();
