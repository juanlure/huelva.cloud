/**
 * Robustly parses JSON from an AI response string.
 * It looks for the first '{' and the last '}' to extract the JSON object,
 * ignoring any markdown formatting or surrounding text.
 */
export function safeJsonParse<T = any>(response: string | null | undefined, fallback: T): T {
    if (!response) return fallback;

    try {
        // 1. Try direct parse first (cleanest case)
        return JSON.parse(response);
    } catch (e) {
        // 2. Try extracting from markdown/text
        const jsonStart = response.indexOf('{');
        const jsonEnd = response.lastIndexOf('}');

        if (jsonStart !== -1 && jsonEnd !== -1) {
            const jsonStr = response.substring(jsonStart, jsonEnd + 1);
            try {
                return JSON.parse(jsonStr);
            } catch (innerErr) {
                console.error("Failed to parse extracted JSON string:", jsonStr);
            }
        }
    }

    console.warn("JSON parsing failed fully. Returning fallback.");
    return fallback;
}
