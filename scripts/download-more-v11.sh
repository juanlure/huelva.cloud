#!/bin/bash
# Undécima tanda - términos genéricos pero útiles

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

echo "🖼️  Undécima tanda (última)..."

# Términos genéricos útiles
download_search "barco-ria" "Barco ria"
download_search "embarcacion-tradicional" "Embarcacion tradicional"
download_search "remo-ria" "Remo ria"
download_search "puerto-pesquero" "Puerto pesquero"
download_search "amanecer-huelva" "Amanecer Huelva"
download_search "atardecer-huelva" "Atardecer Huelva"
download_search "puesta-sol-huelva" "Puesta sol Huelva"
download_search "rio-huelva" "Rio Huelva"
download_search "ria-huelva" "Ria Huelva"
download_search "estuario-huelva" "Estuario Huelva"
download_search "paisaje-huelva" "Paisaje Huelva"
download_search "naturaleza-huelva" "Naturaleza Huelva"
download_search "vegetacion-huelva" "Vegetacion Huelva"
download_search "flora-huelva" "Flora Huelva"
download_search "fauna-huelva" "Fauna Huelva"

echo ""
ls -1 *.jpg *.png 2>/dev/null | wc -l | xargs echo "📊 Total imágenes:"
