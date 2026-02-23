#!/bin/bash
# Novena tanda - términos alternativos y creativos

OUTPUT_DIR="/home/claw1/.openclaw/workspace/huelva-is/public/images/guides"
cd "$OUTPUT_DIR"

USER_AGENT="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36"

download_search() {
  local name="$1"
  local query="$2"
  
  echo "🔍 $name"
  
  local thumb_urls=$(curl -s -A "$USER_AGENT" \
    "https://commons.wikimedia.org/w/index.php?search=${query// /+}&title=Special:MediaSearch&type=image" | \
    grep -oP 'https://upload\.wikimedia\.org/wikipedia/commons/thumb/[^"]+\.(jpg|png)' | \
    sort -u | head -3)
  
  [ -z "$thumb_urls" ] && { echo "  ✗ Sin resultados"; return 1; }
  
  echo "$thumb_urls" | head -1 | while read -r thumb_url; do
    local highres=$(echo "$thumb_url" | sed 's|/thumb/|/|' | sed -E 's|/[0-9]+px-[^/]+$||')
    if curl -s -L "$highres" -o "${name}.jpg" --max-time 45; then
      local size=$(stat -c%s "${name}.jpg" 2>/dev/null || echo "0")
      local magic=$(xxd -l 2 -p "${name}.jpg" 2>/dev/null)
      if [ "${magic:0:4}" = "ffd8" ] && [ "$size" -gt 20000 ]; then
        echo "  ✓ ${name}.jpg ($((size/1024))KB)"
      else
        rm -f "${name}.jpg"
      fi
    fi
  done
}

echo "🖼️  Novena tanda - términos alternativos..."

# Playas y costa
download_search "playa-huelva-atlantico" "Playa Huelva Atlantico"
download_search "costa-huelva" "Costa Huelva"
download_search "pinar-huelva" "Pinar Huelva"
download_search "duna-huelva" "Duna Huelva"

# Sierra y naturaleza
download_search "aracena-gruta" "Aracena Gruta Maravillas"
download_search "aracena-castillo" "Aracena castillo"
download_search "santa-ana-laguna" "Santa Ana la Real"
download_search "linares-aracena" "Linares Aracena"

# Gastronomía
download_search "marisco-huelva" "Marisco Huelva"
download_search "pescado-huelva" "Pescado Huelva"
download_search "marisco-fresco" "Marisco fresco"
download_search "parrillada-huelva" "Parrillada Huelva"

# Cultura y fiestas
download_search "carnaval-huelva-cabalgata" "Carnaval Huelva"
download_search "cabalgata-reyes" "Cabalgata Reyes Magos"
download_search "semana-santa-procesion" "Semana Santa procesion"
download_search "virgen-rocio" "Virgen Rocio"

# Industria y patrimonio
download_search "fabrica-huelva" "Fabrica Huelva"
download_search "industria-huelva" "Industria Huelva"
download_search "patrimonio-industrial" "Patrimonio industrial Huelva"
download_search "arquitectura-huelva" "Arquitectura Huelva"

echo ""
ls -1 *.jpg *.png 2>/dev/null | wc -l | xargs echo "📊 Total imágenes:"
