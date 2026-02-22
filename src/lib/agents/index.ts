/**
 * AGENTS MODULE - Huelva.cloud
 *
 * Sistema de agentes IA para generación, verificación y optimización de contenido.
 *
 * @module agents
 */

// ============================================================================
// WORKFLOW (Orquestador principal)
// ============================================================================

export {
  generateArticle,
  generateSimpleArticle,
  generateFromUrl,
  validateForPublishing,
  getResultSummary,
  type WorkflowConfig,
  type WorkflowResult,
  type WorkflowProgress
} from './workflow';

// ============================================================================
// RESEARCHER AGENT
// ============================================================================

export {
  performWebResearch,
  findSourceUrl,
  verifyPlace,
  getReviews,
  type ResearchResult,
  type PlaceData,
  type SourceData,
  type FactData
} from './researcher';

// ============================================================================
// SCRAPER AGENT
// ============================================================================

export {
  scrapeArticle,
  type ScrapedArticle
} from './scraper';

// ============================================================================
// WRITER AGENT
// ============================================================================

export {
  generateDraft,
  refineDraft,
  generateSeoMetadata,
  type Draft
} from './writer';

// ============================================================================
// EDITOR AGENT
// ============================================================================

export {
  reviewDraft,
  quickCheck,
  suggestImprovements,
  type ReviewResult
} from './editor';

// ============================================================================
// FACT CHECKER AGENT
// ============================================================================

export {
  factCheckDraft,
  verifyPlace as verifyPlaceFact,
  verifyFact,
  quickFactCheck,
  extractPlaces,
  calculateConfidenceScore,
  type FactCheckResult,
  type PlaceCheck,
  type FactCheck,
  type Warning
} from './fact-checker';

// ============================================================================
// SEO AGENT
// ============================================================================

export {
  optimizeSeo,
  generateSlug,
  extractKeywords,
  generateSchema,
  quickSeoScore,
  type SeoOptimization
} from './seo';

// ============================================================================
// DESIGNER AGENT
// ============================================================================

export {
  generateEditorialGallery,
  generateHeaderImage,
  enhanceArticleVisuals,
  searchUnsplashImage
} from './designer';

// ============================================================================
// IMAGE RESEARCHER AGENT
// ============================================================================

export {
  searchImage,
  searchGallery,
  getCuratedImage,
  type ImageResult,
  type ImageAlternative
} from './image-researcher';

// ============================================================================
// DIVERSITY AGENT
// ============================================================================

export {
  analyzeDiversity,
  type TopicSuggestion
} from './diversity';

// ============================================================================
// CLASSIFIER AGENT
// ============================================================================

export {
  classifyContent,
  type InteractiveData
} from './classifier';

// ============================================================================
// GENERATOR AGENT
// ============================================================================

export {
  generateInteractiveData
} from './generator';

// ============================================================================
// GUIDE AGENT
// ============================================================================

export {
  generateGuideStructure
} from './structure_guide';

// ============================================================================
// UTILS
// ============================================================================

export {
  safeJsonParse
} from './utils';

// ============================================================================
// CONSTANTES Y CONFIGURACIÓN
// ============================================================================

/**
 * Versión del sistema de agentes
 */
export const AGENTS_VERSION = '2.0.0';

/**
 * Lista de todos los agentes disponibles
 */
export const AVAILABLE_AGENTS = [
  'diversity',
  'researcher',
  'scraper',
  'image-researcher',
  'writer',
  'fact-checker',
  'editor',
  'seo',
  'designer',
  'classifier',
  'generator',
  'guide'
] as const;

export type AgentName = typeof AVAILABLE_AGENTS[number];

/**
 * Configuración por defecto del workflow
 */
export const DEFAULT_WORKFLOW_CONFIG = {
  maxIterations: 2,
  skipFactCheck: false,
  skipImageGeneration: false,
  skipEditor: false,
  forceCategory: undefined as string | undefined
};

/**
 * Categorías válidas para artículos
 */
export const VALID_CATEGORIES = [
  'Noticias',
  'Comer',
  'Eventos',
  'Guías'
] as const;

export type ValidCategory = typeof VALID_CATEGORIES[number];
