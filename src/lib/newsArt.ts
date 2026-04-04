function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function splitTitle(title: string): string[] {
  const cleaned = (title || '').replace(/\s+/g, ' ').trim();
  if (!cleaned) return ['Huelva.cloud', 'Noticias'];

  const words = cleaned.split(' ');
  const midpoint = Math.ceil(words.length / 2);
  const first = words.slice(0, midpoint).join(' ');
  const second = words.slice(midpoint).join(' ');
  return second ? [first, second] : [first];
}

function truncate(line: string, max = 28): string {
  return line.length > max ? `${line.slice(0, max - 1)}…` : line;
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
  const [line1, line2] = splitTitle(title).map((line) => truncate(line, 30));
  const safeTitle1 = line1.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const safeTitle2 = (line2 || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const safeSource = (source || 'Huelva.cloud').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

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

      <text x="88" y="560" fill="white" font-size="84" font-family="Inter, Arial, sans-serif" font-weight="800">${safeTitle1}</text>
      ${safeTitle2 ? `<text x="88" y="656" fill="white" font-size="84" font-family="Inter, Arial, sans-serif" font-weight="800">${safeTitle2}</text>` : ''}

      <text x="92" y="774" fill="rgba(255,255,255,0.82)" font-size="28" font-family="Inter, Arial, sans-serif" font-weight="500">Provincia de Huelva · ${safeSource}</text>
      <text x="92" y="826" fill="rgba(255,255,255,0.62)" font-size="22" font-family="Inter, Arial, sans-serif" font-weight="500">Curado por Huelva.cloud</text>
    </svg>
  `.trim();

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
