/**
 * ARTICLE GENERATION WORKFLOW
 * Orquestador de todos los agentes para generar contenido completo
 *
 * Este módulo coordina todos los agentes en el orden correcto:
 *
 * 1. Diversity → Selecciona tema
 * 2. Researcher → Investiga sobre el tema
 * 3. Scraper → Extrae contenido de URL (si existe)
 * 4. Image Researcher → Busca imágenes reales
 * 5. Writer → Genera el borrador
 * 6. Fact Checker → Verifica datos
 * 7. Editor → Revisa calidad
 * 8. SEO → Optimiza metadatos
 * 9. Designer → Genera imágenes adicionales
 */

import { analyzeDiversity, type TopicSuggestion } from './diversity';
import {
  performWebResearch,
  findSourceUrl,
  verifyPlace,
  type ResearchResult
} from './researcher';
import { scrapeArticle, type ScrapedArticle } from './scraper';
import { searchImage, searchGallery } from './image-researcher';
import {
  generateDraft,
  refineDraft,
  type Draft
} from './writer';
import {
  factCheckDraft,
  extractPlaces,
  calculateConfidenceScore
} from './fact-checker';
import {
  reviewDraft,
  quickCheck as editorQuickCheck
} from './editor';
import {
  optimizeSeo,
  quickSeoScore
} from './seo';
import {
  generateHeaderImage,
  generateEditorialGallery,
  enhanceArticleVisuals
} from './designer';
import { generateContent } from '../gemini';

// ============================================================================
// INTERFACES
// ============================================================================

export interface WorkflowConfig {
  maxIterations?: number;
  skipFactCheck?: boolean;
  skipImageGeneration?: boolean;
  skipEditor?: boolean;
  forceCategory?: string;
}

export interface WorkflowResult {
  success: boolean;
  draft?: Draft;
  research?: ResearchResult;
  scrapedData?: ScrapedArticle;
  factCheck?: any;
  editorReview?: any;
  seoOptimization?: any;
  images?: {
    header: string;
    gallery: string[];
    enhanced: { header: string; imageUrl: string }[];
  };
  iterations: number;
  errors: string[];
  warnings: string[];
  duration: number;
}

export interface WorkflowProgress {
  step: string;
  message: string;
  data?: any;
}

type ProgressCallback = (progress: WorkflowProgress) => void;

// ============================================================================
// WORKFLOW PRINCIPAL
// ============================================================================

/**
 * Genera un artículo completo usando todos los agentes
 */
export async function generateArticle(
  topic?: string,
  config: WorkflowConfig = {},
  onProgress?: ProgressCallback
): Promise<WorkflowResult> {
  const startTime = Date.now();
  const maxIterations = config.maxIterations || 2;

  const result: WorkflowResult = {
    success: false,
    iterations: 0,
    errors: [],
    warnings: [],
    duration: 0
  };

  try {
    // ========================================================================
    // PASO 1: OBTENER TEMA (si no se proporciona)
    // ========================================================================

    let finalTopic = topic;
    let topicSource: TopicSuggestion | null = null;

    if (!finalTopic) {
      onProgress?.({ step: 'diversity', message: 'Analizando diversidad de contenido...' });
      topicSource = await analyzeDiversity();
      if (topicSource) {
        finalTopic = topicSource.topic;
        onProgress?.({ step: 'diversity', message: `Tema seleccionado: ${finalTopic}`, data: topicSource });
      }
    }

    if (!finalTopic) {
      throw new Error('No se pudo seleccionar un tema');
    }

    // ========================================================================
    // PASO 2: INVESTIGACIÓN (RESEARCHER)
    // ========================================================================

    onProgress?.({ step: 'research', message: `Investigando sobre: ${finalTopic}` });

    const research = await performWebResearch(finalTopic);
    result.research = research || undefined;

    if (research?.warnings && research.warnings.length > 0) {
      result.warnings.push(...research.warnings);
    }

    // ========================================================================
    // PASO 3: SCRAPING (si hay URL)
    // ========================================================================

    let sourceUrl: string | null = null;
    let scrapedData: ScrapedArticle | null = null;

    // Buscar URL oficial si es un lugar específico
    if (finalTopic.split(' ').length <= 4) {
      sourceUrl = await findSourceUrl(finalTopic);
    }

    if (sourceUrl) {
      onProgress?.({ step: 'scraping', message: 'Extrayendo contenido de fuente externa...' });
      scrapedData = await scrapeArticle(sourceUrl);
      result.scrapedData = scrapedData || undefined;
    }

    // ========================================================================
    // PASO 4: BÚSQUEDA DE IMÁGENES REALES
    // ========================================================================

    let realImages: string[] = [];

    if (!config.skipImageGeneration) {
      onProgress?.({ step: 'image_research', message: 'Buscando imágenes reales...' });

      try {
        const galleryResult = await searchGallery(finalTopic, 3);
        realImages = galleryResult.map(img => img.selected_image.url);
        onProgress?.({ step: 'image_research', message: `${realImages.length} imágenes encontradas` });
      } catch (e) {
        result.warnings.push('No se pudieron buscar imágenes reales');
      }
    }

    // ========================================================================
    // PASO 5: GENERACIÓN DE BORRADOR (WRITER)
    // ========================================================================

    onProgress?.({ step: 'writer', message: 'Generando borrador...' });

    let draft: Draft;
    let researchContext = research ? JSON.stringify(research.facts) : undefined;

    draft = await generateDraft(
      finalTopic,
      scrapedData?.content,
      scrapedData?.url,
      [...(scrapedData?.gallery || []), ...realImages],
      researchContext
    );

    if (config.forceCategory) {
      draft.category = config.forceCategory;
    }

    onProgress?.({ step: 'writer', message: `Borrador generado: ${draft.title}` });

    // ========================================================================
    // LOOP DE MEJORA (Editor → Writer)
    // ========================================================================

    for (let i = 0; i < maxIterations; i++) {
      result.iterations = i + 1;

      // --------------------------------------------------------
      // PASO 6: FACT CHECKER
      // --------------------------------------------------------

      if (!config.skipFactCheck) {
        onProgress?.({ step: 'fact_check', message: 'Verificando datos...' });

        try {
          const factCheck = await factCheckDraft(draft);
          result.factCheck = factCheck || undefined;

          if (factCheck?.overall_status === 'rejected') {
            result.warnings.push('Fact check rechazó el artículo');
            // No continuar si hay errores críticos
            if (factCheck.confidence_score < 0.5) {
              result.errors.push('Confidence score demasiado bajo');
              return result;
            }
          }
        } catch (e) {
          result.warnings.push(`Fact check falló: ${(e as Error).message}`);
        }
      }

      // --------------------------------------------------------
      // PASO 7: EDITOR REVIEW
      // --------------------------------------------------------

      if (!config.skipEditor) {
        onProgress?.({ step: 'editor', message: 'Revisando calidad...' });

        const editorReview = await reviewDraft(draft);
        result.editorReview = editorReview;

        onProgress?.({
          step: 'editor',
          message: `Puntuación: ${editorReview.score}/100`,
          data: editorReview
        });

        // Si está aprobado, salir del loop
        if (editorReview.approved) {
          break;
        }

        // Si no está aprobado y tenemos iteraciones, refinar
        if (i < maxIterations - 1) {
          onProgress?.({ step: 'writer', message: 'Refinando borrador...' });
          draft = await refineDraft(draft, editorReview.feedback);
        }
      } else {
        break;
      }
    }

    // ========================================================================
    // PASO 8: SEO OPTIMIZATION
    // ========================================================================

    onProgress?.({ step: 'seo', message: 'Optimizando SEO...' });

    const seoOptimization = await optimizeSeo(draft);
    result.seoOptimization = seoOptimization;

    // Aplicar SEO al draft
    draft.slug = seoOptimization.slug;
    draft.excerpt = seoOptimization.metaDescription;

    onProgress?.({ step: 'seo', message: `SEO: ${seoOptimization.metaTitle}` });

    // ========================================================================
    // PASO 9: IMAGE GENERATION
    // ========================================================================

    if (!config.skipImageGeneration) {
      onProgress?.({ step: 'designer', message: 'Generando imágenes...' });

      const headerImage = await generateHeaderImage(
        draft.title,
        draft.excerpt,
        scrapedData?.image,
        draft.slug
      );

      const editorialGallery = await generateEditorialGallery(draft.title, 3);

      const enhanced = await enhanceArticleVisuals(
        draft.content,
        draft.slug,
        draft.category
      );

      result.images = {
        header: headerImage,
        gallery: editorialGallery,
        enhanced
      };

      onProgress?.({ step: 'designer', message: 'Imágenes generadas' });
    }

    // ========================================================================
    // RESULTADO FINAL
    // ========================================================================

    result.draft = draft;
    result.success = true;

    onProgress?.({ step: 'complete', message: 'Artículo completado', data: draft });

  } catch (e) {
    result.errors.push((e as Error).message);
    console.error('[WORKFLOW] Error:', e);
  }

  result.duration = Date.now() - startTime;
  return result;
}

// ============================================================================
// FUNCIONES AUXILIARES
// ============================================================================

/**
 * Genera un artículo simple (sin loops de refinamiento)
 */
export async function generateSimpleArticle(
  topic: string,
  category?: string,
  onProgress?: ProgressCallback
): Promise<WorkflowResult> {
  return generateArticle(topic, {
    maxIterations: 1,
    skipFactCheck: true,
    skipEditor: false,
    forceCategory: category
  }, onProgress);
}

/**
 * Genera un artículo a partir de una URL (modo curador)
 */
export async function generateFromUrl(
  url: string,
  onProgress?: ProgressCallback
): Promise<WorkflowResult> {
  const startTime = Date.now();

  const result: WorkflowResult = {
    success: false,
    iterations: 0,
    errors: [],
    warnings: [],
    duration: 0
  };

  try {
    // Scrapear la URL
    onProgress?.({ step: 'scraping', message: 'Extrayendo contenido...' });
    const scrapedData = await scrapeArticle(url);

    if (!scrapedData) {
      throw new Error('No se pudo extraer contenido de la URL');
    }

    result.scrapedData = scrapedData;

    // Generar borrador
    onProgress?.({ step: 'writer', message: 'Generando borrador...' });
    const draft = await generateDraft(
      scrapedData.title,
      scrapedData.content,
      scrapedData.url,
      scrapedData.gallery || []
    );

    result.draft = draft;
    result.success = true;

    onProgress?.({ step: 'complete', message: 'Artículo completado', data: draft });

  } catch (e) {
    result.errors.push((e as Error).message);
  }

  result.duration = Date.now() - startTime;
  return result;
}

/**
 * Valida que un artículo esté listo para publicar
 */
export async function validateForPublishing(result: WorkflowResult): Promise<{
  ready: boolean;
  issues: string[];
}> {
  const issues: string[] = [];

  // Verificar que tenemos un draft
  if (!result.draft) {
    issues.push('No hay borrador generado');
    return { ready: false, issues };
  }

  // Quick checks del editor
  const editorCheck = await editorQuickCheck(result.draft.content);
  if (!editorCheck.passes) {
    issues.push(editorCheck.reason);
  }

  // Verificar SEO
  if (result.seoOptimization) {
    const seoScore = quickSeoScore(
      result.seoOptimization.metaTitle,
      result.seoOptimization.metaDescription,
      result.seoOptimization.slug
    );
    if (seoScore.score < 70) {
      issues.push(`SEO score bajo (${seoScore.score}/100): ${seoScore.issues.join(', ')}`);
    }
  }

  // Verificar imágenes
  if (!result.images?.header) {
    issues.push('Falta imagen de cabecera');
  }

  // Verificar fact check si se realizó
  if (result.factCheck?.overall_status === 'rejected') {
    issues.push('Fact check rechazó el artículo');
  }

  return {
    ready: issues.length === 0,
    issues
  };
}

/**
 * Obtiene un resumen del resultado
 */
export function getResultSummary(result: WorkflowResult): string {
  if (!result.success) {
    return `❌ Error: ${result.errors.join(', ')}`;
  }

  const parts: string[] = [];

  parts.push(`✅ Artículo: ${result.draft?.title}`);
  parts.push(`📊 Categoría: ${result.draft?.category}`);
  parts.push(`🔄 Iteraciones: ${result.iterations}`);

  if (result.editorReview) {
    parts.push(`⭐ Editor: ${result.editorReview.score}/100`);
  }

  if (result.factCheck) {
    parts.push(`🔍 Fact Check: ${result.factCheck.confidence_score.toFixed(2)} confidence`);
  }

  if (result.images) {
    parts.push(`🖼️ Imágenes: ${result.images.gallery.length + 1} (header + gallery)`);
  }

  if (result.warnings.length > 0) {
    parts.push(`⚠️ Warnings: ${result.warnings.length}`);
  }

  parts.push(`⏱️ Duración: ${(result.duration / 1000).toFixed(1)}s`);

  return parts.join('\n');
}
