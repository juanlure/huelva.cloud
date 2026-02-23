#!/bin/bash
# Octava tanda - última

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

echo "🖼️  Octava tanda (última)..."

download_search "valverde-camino" "Valverde Camino Huelva"
download_search "bonares" "Bonares Huelva"
download_search "manzanilla-huelva" "Manzanilla Huelva"
download_search "vino-generoso" "Vino generoso Huelva"
download_search "aceite-oliva" "Aceite oliva Huelva"
download_search "olivar-huelva" "Olivar Huelva"
download_search "encina-huelva" "Encina Huelva"
download_search "dehesa-huelva" "Dehesa Huelva"
download_search "alcornocal" "Alcornocal Huelva"
download_search "quercus" "Quercus Huelva"
download_search "nervilla" "Nervilla Huelva"
download_search "rio-tinto-color" "Rio Tinto color"
download_search "peña-hierro" "Peña Hierro Riotinto"
download_search "villanueva-los-castillejos" "Villanueva Rio Tinto"
download_search "minas-tharsis" "Minas Tharsis Huelva"

echo ""
ls -1 *.jpg *.png 2>/dev/null | wc -l | xargs echo "📊 Total imágenes:"
