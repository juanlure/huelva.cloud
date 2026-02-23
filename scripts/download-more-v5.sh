#!/bin/bash
# Quinta tanda - términos más genéricos

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

echo "🖼️  Última búsqueda..."

download_search "parque-moret" "Parque Moret Huelva"
download_search "barrio-alto" "Barrio Alto Huelva"
download_search "poblado-minero" "Poblado minero Huelva"
download_search "zanjon" "Zanjon Huelva"
download_search "torre-muelle" "Torre del Muelle Huelva"
download_search "baluarte-huelva" "Baluarte Huelva"
download_search "conquero" "Conquero Huelva"
download_search "laguna-huelva" "Laguna Huelva"

echo ""
ls -1 *.jpg *.png 2>/dev/null | wc -l | xargs echo "📊 Total imágenes:"
