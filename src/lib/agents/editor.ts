/**
 * EDITOR AGENT
 * Agente especializado en revisión de calidad y tono
 *
 * Basado en: los principios de calidad de Huelva.is
 */

import { generateContent, isAiEnabled } from '../gemini';
import type { Draft } from './writer';
import { safeJsonParse } from './utils';

export interface ReviewResult {
  approved: boolean;
  feedback: string;
  score: number;
  issues: {
    category: 'tone' | 'accuracy' | 'style' | 'structure' | 'localism';
    severity: 'critical' | 'warning' | 'info';
    message: string;
    location?: string; // fragmento del texto
  }[];
  strengths: string[];
}

// ============================================================================
// PROMPT DEL EDITOR AGENT
// ============================================================================

const EDITOR_PROMPT = `
# EDITOR AGENT PROMPT
# Agente especializado en revisión de calidad y tono - Huelva.is

## ROL
Eres "El Cabezo", el Editor Jefe de Huelva.is. Tu trabajo es asegurar calidad humana y local. Eres estricto pero justo. Tu misión es que cada artículo suene como escrito por un onubense de pro, no como un bot.

## FILOSOFÍA DE EDICIÓN

Huelva.is no es una guía turística más. Es la voz del que conoce la tierra, del que se ha criado comiendo choco en barra y sufriendo el levante en verano. Nos dirigimos a:
- El onubense que busca planes nuevos
- El recién llegado que quiere integrarse de verdad
- El que visita y quiere vivir Huelva como un local

## CRITERIOS DE CALIDAD (POR ORDEN DE IMPORTANCIA)

### 1. ANTI-IA (Prioridad Máxima)
Busca y destruye estas señales de IA:
- "joya escondida" ❌
- "un tapiz de" ❌
- "mezcla de tradición y modernidad" ❌
- "sumérgete en la cultura" ❌
- "descubre los encantos" ❌
- "viaje a través de los sentidos" ❌
- "rincón lleno de magia" ❌
- "donde el tiempo parece detenerse" ❌
- "encantador pueblo pesquero" ❌
- "auténtica experiencia local" ❌

Si encuentras una de estas, el artículo necesita reescritura.

### 2. LOCALISMO vs CENTRALISMO
- ¿Suena a Huelva de verdad o a alguien que ha visto fotos en Instagram?
- ¿Hay referencias locales específicas? (barrios, calles, comercios reales)
- ¿Se usa el vocabulario local correctamente?

### 3. SUSTANCIA Y DATOS
- ¿Dice algo útil o es paja?
- Si es un restaurante: dirección, precio aproximado, qué pedir
- Si es un lugar: cómo llegar, cuándo ir, qué llevar
- Si es una noticia: impacto en el lector, qué hacer

### 4. ESTRUCTURA
- ¿Hay un lead gancho que enganche?
- ¿Los H2 tienen personalidad?
- ¿Es fácil de escanear?

### 5. TONO
- ¿Es cercano y coloquial sin ser vulgar?
- ¿Hay humor sin ser ofensivo?
- ¿Es honesto (dice lo malo también)?

## SISTEMA DE PUNTUACIÓN

Calcula una puntuación de 0-100:

| Criterio | Peso | Evaluación |
|----------|------|------------|
| Anti-IA | 30% | 0 si hay clichés, 30 si está limpio |
| Localismo | 25% | 0 si genérico, 25 si muy específico |
| Sustancia | 25% | 0 si vacío, 25 si denso de datos |
| Estructura | 10% | 0 si desordenado, 10 si sólido |
| Tono | 10% | 0 si aburrido, 10 si auténtico |

**UMBRAL DE APROBACIÓN**: 65/100

## FORMATO DE FEEDBACK

El feedback debe ser:
1. **Específico**: Indica la frase exacta que chirría
2. **Acccionable**: Di qué hay que cambiar
3. **Constructivo**: Ofrece alternativas cuando puedas

## REPORTE DE REVISIÓN

Devuelve SOLO un JSON válido con esta estructura:
{
  "approved": boolean (false si score < 65),
  "score": number (0-100),
  "feedback": "Resumen del feedback principal",
  "issues": [
    {
      "category": "tone|accuracy|style|structure|localism",
      "severity": "critical|warning|info",
      "message": "Descripción del problema",
      "location": "fragmento del texto si aplica"
    }
  ],
  "strengths": ["cosa buena 1", "cosa buena 2"]
}
`;

// ============================================================================
// FUNCIONES DEL EDITOR
// ============================================================================

export async function reviewDraft(draft: Draft): Promise<ReviewResult> {
  console.log(`[EDITOR] Revisando borrador: "${draft.title}"`);

  if (!isAiEnabled) {
    return {
      approved: true,
      feedback: 'Auto-aprobado (Modo Mock)',
      score: 100,
      issues: [],
      strengths: ['Modo Mock']
    };
  }

  const prompt = `
${EDITOR_PROMPT}

## ARTÍCULO A REVISAR

TÍTULO: ${draft.title}
CATEGORÍA: ${draft.category}
AUTOR: ${draft.author}

CONTENIDO COMPLETO:
${draft.content}

EXCERPT: ${draft.excerpt}

---

## TU TAREA

Revisa el artículo según los criterios above. Devuelve SOLO el JSON de revisión.
`;

  try {
    const response = await generateContent(prompt, 0.2);
    const result = safeJsonParse<any>(response, {
      approved: false,
      score: 0,
      feedback: "Error de análisis",
      issues: [],
      strengths: []
    });

    return {
      approved: result.approved === true,
      score: result.score || 0,
      feedback: result.feedback || 'Sin feedback',
      issues: result.issues || [],
      strengths: result.strengths || []
    };
  } catch (e) {
    console.error("Editor AI parsing failed", e);
    return {
      approved: false,
      feedback: "Error técnico en Editor IA",
      score: 0,
      issues: [],
      strengths: []
    };
  }
}

/**
 * Verifica que un artículo cumple los criterios mínimos de publicación
 */
export async function quickCheck(content: string): Promise<{
  passes: boolean;
  reason: string;
}> {
  // Quick checks sin IA para filtrar obvios
  const lowerContent = content.toLowerCase();

  const aiCliches = [
    'joya escondida',
    'un tapiz de',
    'mezcla de tradición',
    'sumérgete en',
    'descubre los encantos',
    'viaje a través de',
    'rincón lleno de magia',
    'donde el tiempo parece',
    'auténtica experiencia',
    'encantador pueblo'
  ];

  const foundCliches = aiCliches.filter(cliche => lowerContent.includes(cliche));

  if (foundCliches.length > 2) {
    return {
      passes: false,
      reason: `Demasiados clichés de IA detectados: ${foundCliches.join(', ')}`
    };
  }

  // Verificar longitud mínima
  const textContent = content.replace(/<[^>]*>/g, '').trim();
  if (textContent.length < 500) {
    return {
      passes: false,
      reason: 'Contenido demasiado corto (< 500 caracteres)'
    };
  }

  return {
    passes: true,
    reason: 'Pasa validaciones básicas'
  };
}

/**
 * Sugiere mejoras específicas para un artículo
 */
export async function suggestImprovements(draft: Draft): Promise<string[]> {
  console.log(`[EDITOR] Sugiriendo mejoras para: "${draft.title}"`);

  if (!isAiEnabled) return [];

  const prompt = `
# EDITOR SUGGESTIONS - Huelva.is

Eres "El Cabezo", editor de Huelva.is. Sugiere 3-5 mejoras CONCRETAS para este artículo.

TÍTULO: ${draft.title}
CONTENIDO: ${draft.content.substring(0, 2000)}...

Reglas:
- Sé específico: "Añade la dirección de X", no "Añade más detalles"
- Máximo 5 sugerencias
- Formato: lista bullet points

Devuelve solo la lista, sin JSON.
`;

  try {
    const response = await generateContent(prompt, 0.5);
    if (!response) return [];

    // Extraer bullet points
    const lines = response.split('\n').filter(line =>
      line.trim().startsWith('-') || line.trim().startsWith('*')
    );

    return lines.map(line => line.replace(/^[-*]\s*/, '').trim()).filter(Boolean);
  } catch (e) {
    console.error("[EDITOR] Error sugiriendo mejoras", e);
    return [];
  }
}
