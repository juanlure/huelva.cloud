import { generateContent, isAiEnabled } from '../gemini';
import { InteractiveData } from './classifier';

export async function generateInteractiveData(
    topic: string,
    classification: InteractiveData
): Promise<any> {
    console.log(`[GENERATOR] Generando datos para componente: ${classification.component_type} (${classification.component_name})`);

    if (!isAiEnabled || !classification.component_type) {
        return null;
    }

    const prompt = `
    # AGENTE: Generador de Datos para Componentes React

    ## Tu rol
    Dado un tipo de componente y un tema específico de Huelva, generas el JSON de datos que alimentará el componente React.

    ## Input
    - component_type: "${classification.component_type}"
    - component_name: "${classification.component_name || classification.component_type}"
    - topic: "${topic}"
    - rationale: "${classification.rationale}"
    - data_schema: (Implícito según el tipo)

    ## Esquemas Esperados (Elige según component_type)

    1. TRANSLATOR ({ title, subtitle, items: [{ id, name, ratio, description, tip, price_range? }] })
    2. ITINERARY ({ title, itineraries: { style_id: { day1: [{ time, title, description, emoji }], day2: ... } } })
       - Styles IDs: 'classic', 'foodie', 'nature', 'relaxed'
    3. QUIZ ({ title, subtitle, questions: [{ question, options: [{ text, points }] }], results: [{ minPoints, maxPoints, title, description, emoji }] })
    4. CARDS ({ title, items: [{ name, attributes: [{ label, value, better: boolean }] }], winner: index (optional) })
    5. CHECKLIST ({ title, items: [{ id, label, category }] })

    ## Output
    JSON válido con los datos específicos de Huelva, incluyendo:
    - Terminología local correcta
    - Datos verificados (precios, horarios, ubicaciones)
    - Tono de voz consistente con la persona editorial asignada
    - Emojis apropiados para el contexto

    ## Ejemplo Output (Solo JSON puro):
    {
      "title": "Traductor de Jamón de Jabugo",
      "subtitle": "Descifra las etiquetas...",
      "items": [...]
    }
  `;

    try {
        const response = await generateContent(prompt, 0.7);
        const cleanJson = response?.replace(/```json/g, '').replace(/```/g, '').trim() || '{}';
        return JSON.parse(cleanJson);
    } catch (e) {
        console.error("[GENERATOR] Error generando datos", e);
        return null;
    }
}
