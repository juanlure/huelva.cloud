import { generateContent, isAiEnabled } from '../gemini';
import { InteractiveData } from './classifier';
import { safeJsonParse } from './utils';

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
    
    ## Misión
    Genera el JSON *exacto* que necesita el componente React "${classification.component_type}" para el tema "${topic}".
    Cualquier error de sintaxis romperá la UI. Sé preciso.

    ## Contexto
    - Rationale: "${classification.rationale}"
    - Tipo: "${classification.component_type}"

    ## ESQUEMAS ESTRICTOS (Sigue el que corresponda)

    1. **TRANSLATOR**
       { "title": "Diccionario Choquero", "subtitle": "...", "items": [{ "id": "1", "name": "Termino", "ratio": "Traducción", "description": "Uso...", "tip": "Consejo", "price_range": "€" }] }

    2. **ITINERARY**
       { "title": "Ruta X", "itineraries": { "classic": { "day1": [{ "time": "10:00", "title": "Lugar", "description": "...", "emoji": "📍" }] } } }
       *Claves obligatorias itinerarios: 'classic', 'foodie'.

    3. **QUIZ** (Mínimo 5 preguntas)
       { "title": "Test X", "subtitle": "...", "questions": [{ "question": "¿...?", "options": [{ "text": "Resp A", "points": 10 }, { "text": "Resp B", "points": 0 }] }], "results": [{ "minPoints": 0, "maxPoints": 50, "title": "Novato", "description": "...", "emoji": "👶" }] }

    4. **CARDS** (Comparador)
       { "title": "Batalla: A vs B", "items": [{ "name": "Sitio A", "attributes": [{ "label": "Precio", "value": "€€", "better": true }, { "label": "Vistas", "value": "Mar", "better": false }] }], "winner": 0 }

    5. **CHECKLIST**
       { "title": "Mochila para X", "items": [{ "id": "1", "label": "Gafas", "category": "Ropa" }] }

    ## Output
    JSON válido. Sin markdown, sin comentarios. Solo el objeto JSON.
  `;

    try {
        const response = await generateContent(prompt, 0.5); // Balance between creativity and structure
        const data = safeJsonParse(response, null);

        if (!data) {
            console.error("[GENERATOR] Falló el parsing del JSON generado.");
            return null;
        }

        return data;
    } catch (e) {
        console.error("[GENERATOR] Error generando datos", e);
        return null;
    }
}
