/**
 * FACT CHECKER AGENT
 * Agente especializado en verificación de hechos y datos
 *
 * Basado en: scripts/agents/prompts/fact-checker.txt
 */

import { generateContent, isAiEnabled } from '../gemini';
import type { Draft } from './writer';
import { safeJsonParse } from './utils';

// ============================================================================
// INTERFACES
// ============================================================================

export interface PlaceCheck {
  name: string;
  status: 'verified' | 'not_found' | 'closed' | 'moved';
  address: {
    expected: string;
    actual?: string;
    match: boolean;
  };
  sources: string[];
  confidence: 'high' | 'medium' | 'low';
}

export interface FactCheck {
  statement: string;
  status: 'true' | 'false' | 'partial' | 'uncertain';
  correction?: string;
  sources: string[];
}

export interface Warning {
  type: 'closed' | 'moved' | 'wrong_address' | 'outdated' | 'legal';
  severity: 'critical' | 'warning' | 'info';
  message: string;
}

export interface FactCheckResult {
  article_slug: string;
  verification_date: string;
  overall_status: 'approved' | 'needs_review' | 'rejected';
  confidence_score: number;
  places_checked: PlaceCheck[];
  facts_checked: FactCheck[];
  warnings: Warning[];
  recommendations: string[];
}

// ============================================================================
// PROMPT DEL FACT CHECKER AGENT
// ============================================================================

const FACT_CHECKER_PROMPT = `
# FACT CHECKER AGENT PROMPT
# Agente especializado en verificación de hechos y datos

## ROL
Eres un Verificador de Hechos (Fact Checker) especializado en contenido local de Huelva. Tu misión es garantizar que toda la información publicada sea precisa, actualizada y verificable.

## OBJETIVOS

1. **Verificar existencia**: Confirmar que cada lugar mencionado realmente existe
2. **Validar datos**: Comprobar direcciones, teléfonos, horarios
3. **Cross-reference**: Contrastar información con múltiples fuentes
4. **Detectar obsolescencia**: Identificar información desactualizada
5. **Alertar sobre riesgos**: Señalar posibles problemas legales o de exactitud

## PROCESO DE VERIFICACIÓN

### Checklist por artículo:

#### Lugares mencionados
- [ ] El lugar existe en Google Maps
- [ ] La dirección es correcta
- [ ] El nombre está bien escrito
- [ ] Está en la localidad indicada
- [ ] Sigue abierto (no ha cerrado)

#### Restaurantes y negocios
- [ ] Rating de TripAdvisor verificable
- [ ] Número de reseñas coincide
- [ ] Especialidades mencionadas son reales
- [ ] Rango de precios aproximado correcto
- [ ] Horarios actualizados

#### Datos históricos
- [ ] Fechas verificables en Wikipedia o fuentes oficiales
- [ ] Nombres propios bien escritos
- [ ] Años y períodos históricos correctos

#### Información práctica
- [ ] Cómo llegar: rutas y transportes verificables
- [ ] Precios: aproximación realista
- [ ] Horarios: temporada actual
- [ ] Contacto: teléfonos/webs activos

## SISTEMA DE CONFIANZA

### 🟢 HIGH CONFIDENCE (Verificado directamente)
- Google Maps con fotos recientes
- Web oficial del lugar
- TripAdvisor con >100 reseñas
- Fuente oficial (Ayuntamiento, Turismo)

### 🟡 MEDIUM CONFIDENCE (Verificado indirectamente)
- Blogs locales de reputación
- Reseñas recientes en redes
- Menciones en prensa local
- Wiki con referencias

### 🔴 LOW CONFIDENCE (No verificado)
- Información sin fuente clara
- Datos >2 años de antigüedad
- Fuentes no confiables
- Contradicciones entre fuentes

## FORMATO DE REPORTE JSON

{
  "article_slug": "slug-del-articulo",
  "verification_date": "2026-01-25T12:00:00Z",
  "overall_status": "approved|needs_review|rejected",
  "confidence_score": 0.95,
  "places_checked": [
    {
      "name": "Nombre del lugar",
      "status": "verified|not_found|closed|moved",
      "address": {
        "expected": "Calle Ejemplo, 1",
        "actual": "Calle Ejemplo, 1",
        "match": true
      },
      "sources": ["url1", "url2"],
      "confidence": "high"
    }
  ],
  "facts_checked": [
    {
      "statement": "afirmación verificada",
      "status": "true|false|partial|uncertain",
      "correction": "corrección si es falsa",
      "sources": ["fuente1", "fuente2"]
    }
  ],
  "warnings": [
    {
      "type": "closed|moved|wrong_address|outdated|legal",
      "severity": "critical|warning|info",
      "message": "Descripción del problema"
    }
  ],
  "recommendations": [
    "acción sugerida para mejorar el artículo"
  ]
}

## TIPOS DE ERRORES COMUNES

### 1. Lugares que han cerrado
Señales de alerta:
- Sin reseñas recientes (>6 meses)
- Google marca como "permanently closed"
- Teléfono desconectado
- Web caída

### 2. Direcciones incorrectas
Señales de alerta:
- Google Maps no encuentra exactamente
- Número de calle fuera de rango
- Calle que ha cambiado de nombre

### 3. Horarios desactualizados
Señales de alerta:
- Sin especificar temporada
- Cambios COVID no actualizados
- Días festivos no considerados

### 4. Nombres mal escritos
Errores comunes:
- Acentos incorrectos
- Confusión Huelva capital/provincia
- Nombres compuestos mal escritos

## FUENTES DE VERIFICACIÓN (por orden de prioridad)

1. **Google Maps**: Verificación primaria de existencia y ubicación
2. **Web oficial del lugar**: Horarios, precios, servicios
3. **TripAdvisor**: Ratings y reseñas recientes
4. **Google Reviews**: Confirmación de estado actual
5. **Ayuntamiento**: Información oficial de licencias
6. **Turismo Huelva**: Lugares turísticos oficiales
7. **Wikipedia**: Datos históricos
8. **Prensa local**: Huelva Información, Onda Cero

## CRITERIOS DE APROBACIÓN

### ✅ APROBADO (Puede publicarse)
- Todos los lugares verificados existentes
- Datos históricos contrastados
- Direcciones correctas
- Sin warnings críticos
- Confidence score > 0.8

### ⚠️ NECESITA REVISIÓN (Corregir antes de publicar)
- Al menos un lugar no verificado
- Warnings de medium severity
- Datos contradictorios entre fuentes
- Confidence score entre 0.5 y 0.8

### ❌ RECHAZADO (No publicar sin revisión mayor)
- Lugares cerrados o inexistentes
- Errores graves en datos históricos
- Warnings críticos
- Confidence score < 0.5
`;

// ============================================================================
// FUNCIONES DEL FACT CHECKER
// ============================================================================

/**
 * Verifica los hechos y datos de un borrador
 */
export async function factCheckDraft(draft: Draft): Promise<FactCheckResult | null> {
  console.log(`[FACT_CHECKER] Verificando artículo: "${draft.title}"`);

  if (!isAiEnabled) {
    return {
      article_slug: draft.slug,
      verification_date: new Date().toISOString(),
      overall_status: 'approved',
      confidence_score: 1.0,
      places_checked: [],
      facts_checked: [],
      warnings: [],
      recommendations: ['Fact-checking deshabilitado']
    };
  }

  const prompt = `
${FACT_CHECKER_PROMPT}

## ARTÍCULO A VERIFICAR

TÍTULO: "${draft.title}"
SLUG: "${draft.slug}"
CATEGORÍA: "${draft.category}"

CONTENIDO:
${draft.content}

---

## TU TAREA

Usa la herramienta de búsqueda para verificar TODOS los lugares, datos y afirmaciones mencionados en el artículo.

Devuelve SOLO el JSON de verificación.
`;

  try {
    const response = await generateContent(prompt, 0.2, true);
    const result = safeJsonParse<FactCheckResult>(response, null as unknown as FactCheckResult);

    if (result) {
      console.log(`[FACT_CHECKER] Verificación completada. Status: ${result.overall_status}, Score: ${result.confidence_score}`);
      return result;
    }
  } catch (e) {
    console.error("[FACT_CHECKER] Error en verificación:", e);
  }

  return null;
}

/**
 * Verifica un lugar específico
 */
export async function verifyPlace(placeName: string, expectedAddress?: string): Promise<PlaceCheck | null> {
  console.log(`[FACT_CHECKER] Verificando lugar: "${placeName}"`);

  if (!isAiEnabled) {
    return {
      name: placeName,
      status: 'verified',
      address: {
        expected: expectedAddress || 'N/A',
        actual: expectedAddress || 'N/A',
        match: true
      },
      sources: [],
      confidence: 'low'
    };
  }

  const prompt = `
# PLACE VERIFICATION - Huelva Fact Checker

Verify if this place exists and get its current status:

PLACE: "${placeName}"
EXPECTED ADDRESS: "${expectedAddress || 'Not provided'}"
LOCATION: Huelva province, Spain

Use Google Maps search to verify.

Return JSON only:
{
  "name": "verified name",
  "status": "verified|not_found|closed|moved",
  "address": {
    "expected": "${expectedAddress || 'N/A'}",
    "actual": "actual address from Google",
    "match": true/false
  },
  "sources": ["google_maps_url", "other_url"],
  "confidence": "high|medium|low",
  "notes": "any relevant information"
}
`;

  try {
    const response = await generateContent(prompt, 0.1, true);
    return safeJsonParse<PlaceCheck>(response, null);
  } catch (e) {
    console.error("[FACT_CHECKER] Error verificando lugar:", e);
    return null;
  }
}

/**
 * Verifica una afirmación factual
 */
export async function verifyFact(statement: string): Promise<FactCheck | null> {
  console.log(`[FACT_CHECKER] Verificando hecho: "${statement.substring(0, 50)}..."`);

  if (!isAiEnabled) {
    return {
      statement,
      status: 'uncertain',
      sources: []
    };
  }

  const prompt = `
# FACT VERIFICATION - Huelva Fact Checker

Verify this factual statement about Huelva:

STATEMENT: "${statement}"

Use search to verify if this is true. Check multiple sources.

Return JSON only:
{
  "statement": "${statement}",
  "status": "true|false|partial|uncertain",
  "correction": "correct information if false",
  "sources": ["url1", "url2"],
  "notes": "verification details"
}
`;

  try {
    const response = await generateContent(prompt, 0.1, true);
    return safeJsonParse<FactCheck>(response, null);
  } catch (e) {
    console.error("[FACT_CHECKER] Error verificando hecho:", e);
    return null;
  }
}

/**
 * Quick check para validar un artículo antes de publicación
 */
export async function quickFactCheck(content: string): Promise<{
  passes: boolean;
  issues: string[];
}> {
  console.log(`[FACT_CHECKER] Quick check del contenido...`);

  const issues: string[] = [];

  // Check sin IA - solo validaciones básicas
  const lowerContent = content.toLowerCase();

  // Detectar posible nombres inventados o genéricos
  const genericNames = ['el restaurante', 'la cafeteria', 'el bar', 'el sitio'];
  const hasGenericReferences = genericNames.some(name =>
    new RegExp(`\\b${name}\\s+(de|en|del|la)\\s+[a-z]+`, 'i').test(content)
  );

  if (hasGenericReferences) {
    issues.push('Contiene referencias genéricas a restaurantes/cafeterías sin nombre específico');
  }

  // Detectar falta de direcciones en mención de lugares
  const placeMentions = (content.match(/<strong>[^<]+<\/strong>:/g) || []).length;
  if (placeMentions > 3 && !content.includes('Calle') && !content.includes('Avda')) {
    issues.push('Se mencionan varios lugares pero no hay direcciones específicas');
  }

  return {
    passes: issues.length === 0,
    issues
  };
}

/**
 * Extrae todos los nombres de lugares de un artículo para verificación
 */
export function extractPlaces(content: string): string[] {
  const places: string[] = [];

  // Extraer nombres en negrita seguidos de dirección
  const addressPattern = /<strong>([^<]+)<\/strong>[^:]*:\s*([A-Z][^,]+)/gi;
  let match;

  while ((match = addressPattern.exec(content)) !== null) {
    places.push(match[1].trim());
  }

  // Extraer nombres entre comillas que parezcan lugares
  const quotedPattern = /"([A-Z][a-záéíóúñ\s]+(?:Restaurante|Bar|Café|Chiringuito|Playa|Parque|Plaza|Muelle|Calle|Avda)[^"]*)"/g;
  while ((match = quotedPattern.exec(content)) !== null) {
    places.push(match[1].trim());
  }

  return Array.from(new Set(places)); // Deduplicar
}

/**
 * Calcula el confidence score basado en los resultados
 */
export function calculateConfidenceScore(
  places: PlaceCheck[],
  facts: FactCheck[],
  warnings: Warning[]
): number {
  let score = 1.0;

  // Lugares no verificados reducen el score
  const unverifiedPlaces = places.filter(p => p.confidence !== 'high').length;
  score -= unverifiedPlaces * 0.1;

  // Hechos inciertos reducen el score
  const uncertainFacts = facts.filter(f => f.status !== 'true').length;
  score -= uncertainFacts * 0.05;

  // Warnings reducen el score según severidad
  const criticalWarnings = warnings.filter(w => w.severity === 'critical').length;
  const warningWarnings = warnings.filter(w => w.severity === 'warning').length;

  score -= criticalWarnings * 0.2;
  score -= warningWarnings * 0.05;

  return Math.max(0, Math.min(1, score));
}
