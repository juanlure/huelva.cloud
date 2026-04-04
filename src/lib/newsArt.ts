function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function escapeXml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function truncate(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 1).trim()}…`;
}

function tidyLineEnding(value: string): string {
  return value
    .replace(/\s+(de|del|la|las|el|los|y|o|en|con|sin|por|para|a)$/i, '')
    .trim();
}

function splitTitle(text: string, maxLineLength = 24, maxLines = 2): string[] {
  const cleaned = (text || '').replace(/\s+/g, ' ').trim();
  if (!cleaned) return ['Huelva.cloud'];

  const words = cleaned.split(' ');
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;

    if (candidate.length <= maxLineLength) {
      current = candidate;
      continue;
    }

    if (current) {
      lines.push(tidyLineEnding(current) || current);
      current = word;
    } else {
      lines.push(truncate(word, maxLineLength));
      current = '';
    }

    if (lines.length === maxLines - 1) {
      break;
    }
  }

  if (lines.length < maxLines && current) {
    lines.push(current);
  }

  if (lines.length === 0) return [truncate(cleaned, maxLineLength)];

  const normalizedLines = lines.slice(0, maxLines).map((line, index, arr) => {
    if (index < arr.length - 1) return tidyLineEnding(line) || line;
    return line;
  });

  const joined = normalizedLines.join(' ').trim();
  if (cleaned.length > joined.length && normalizedLines.length > 0) {
    normalizedLines[normalizedLines.length - 1] = truncate(normalizedLines[normalizedLines.length - 1], maxLineLength);
  }

  return normalizedLines;
}

function buildNewsHook(title: string, source?: string): string {
  const lower = `${title} ${source || ''}`.toLowerCase();

  if (/(adamuz|causa|accidente)/.test(lower)) {
    return 'Huelva sigue en la causa';
  }

  if (/(estafa|detenido|ayamonte|fraude)/.test(lower)) {
    return 'Detenido por la estafa de Ayamonte';
  }

  if (/(juzgado|tribunal|audiencia|fiscal[ií]a|recurso)/.test(lower)) {
    return 'Ahora importa quién mueve ficha';
  }

  if (/(polic|guardia civil|suces|investigaci[oó]n|arrest)/.test(lower)) {
    return 'El caso gira, pero faltan piezas';
  }

  if (/(playa|verano|turismo|hotel|restaurante|chiringuito)/.test(lower)) {
    return 'Esto sí cambia el plan si vienes';
  }

  if (/(ayuntamiento|pleno|obra|barrio|calle|provincia)/.test(lower)) {
    return 'Aquí hay más fondo que titular';
  }

  return truncate(title.replace(/\s+/g, ' ').trim(), 36);
}

function buildSupportLine(title: string, source?: string): string {
  const lower = `${title} ${source || ''}`.toLowerCase();

  if (/(adamuz|causa|accidente|recurso)/.test(lower)) {
    return 'Una lectura rápida para entender quién intenta seguir dentro';
  }

  if (/(estafa|detenido|ayamonte|fraude)/.test(lower)) {
    return 'Una lectura rápida para entender qué se sabe y qué falta';
  }

  if (/(polic|guardia civil|suces|juzgado|tribunal)/.test(lower)) {
    return 'Una lectura rápida para separar hechos, ruido y consecuencias';
  }

  return 'Una lectura rápida para entender qué cambia';
}

export function generateNewsArtDataUri(title: string, source?: string) {
  const seed = hashString(`${title}-${source || ''}`);
  const palettes = [
    ['#0F1A24', '#1F3A4D', '#D4553A'],
    ['#111827', '#1D4ED8', '#F97316'],
    ['#172635', '#0EA5E9', '#FB7185'],
    ['#1E293B', '#7C3AED', '#F59E0B'],
    ['#0B1F2A', '#14B8A6', '#F97316'],
  ];
  const palette = palettes[seed % palettes.length];
  const hook = buildNewsHook(title, source);
  const supportLine = buildSupportLine(title, source);
  const headlineLines = splitTitle(hook, 24, 2);
  const safeTitle1 = escapeXml(headlineLines[0] || 'Huelva.cloud');
  const safeTitle2 = escapeXml(headlineLines[1] || '');
  const safeSupportLine = escapeXml(supportLine);
  const safeSource = escapeXml(source || 'Huelva.cloud');

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900" fill="none">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1600" y2="900" gradientUnits="userSpaceOnUse">
          <stop stop-color="${palette[0]}" />
          <stop offset="0.55" stop-color="${palette[1]}" />
          <stop offset="1" stop-color="${palette[2]}" />
        </linearGradient>
        <radialGradient id="glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1320 140) rotate(132) scale(520 520)">
          <stop stop-color="white" stop-opacity="0.22"/>
          <stop offset="1" stop-color="white" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <rect width="1600" height="900" rx="48" fill="url(#bg)" />
      <rect width="1600" height="900" rx="48" fill="url(#glow)" />
      <circle cx="1380" cy="170" r="210" fill="white" fill-opacity="0.06" />
      <circle cx="1280" cy="780" r="280" fill="white" fill-opacity="0.05" />
      <path d="M0 742C166 676 279 653 451 679C629 706 716 814 897 817C1081 820 1217 693 1600 638V900H0V742Z" fill="white" fill-opacity="0.08"/>

      <rect x="88" y="88" width="208" height="48" rx="24" fill="white" fill-opacity="0.14" />
      <text x="118" y="119" fill="white" font-size="24" font-family="Inter, Arial, sans-serif" font-weight="700" letter-spacing="3">NOTICIAS</text>

      <text x="88" y="520" fill="white" font-size="96" font-family="Inter, Arial, sans-serif" font-weight="800">${safeTitle1}</text>
      ${safeTitle2 ? `<text x="88" y="628" fill="white" font-size="96" font-family="Inter, Arial, sans-serif" font-weight="800">${safeTitle2}</text>` : ''}

      <text x="92" y="736" fill="rgba(255,255,255,0.90)" font-size="34" font-family="Inter, Arial, sans-serif" font-weight="600">${safeSupportLine}</text>
      <text x="92" y="790" fill="rgba(255,255,255,0.82)" font-size="28" font-family="Inter, Arial, sans-serif" font-weight="500">Provincia de Huelva · ${safeSource}</text>
      <text x="92" y="838" fill="rgba(255,255,255,0.62)" font-size="22" font-family="Inter, Arial, sans-serif" font-weight="500">Curado por Huelva.cloud</text>
    </svg>
  `.trim();

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
