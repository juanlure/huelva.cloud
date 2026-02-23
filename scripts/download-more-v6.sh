#!/bin/bash
# Sexta tanda - imágenes específicas que faltan

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

echo "🖼️  Sexta tanda - más específico..."

download_search "matalascanas-playa" "Matalascanas playa"
download_search "la-antilla-playa" "La Antilla playa Huelva"
download_search "lepe-huelva" "Lepe Huelva"
download_search "cartaya-huelva" "Cartaya Huelva"
download_search "moguer-huelva" "Moguer Huelva"
download_search "flamencos-huelva" "Flamencos Huelva marismas"
download_search "marismas-odiel" "Marismas Odiel Huelva"
download_search "flamingo-rosa" "Flamenco rosa Huelva"
download_search "jamon-iberico-corte" "Jamon iberico corte"
download_search "presa-iberica" "Presa iberica"
download_search "gamba-blanca-plato" "Gamba blanca plato"
download_search "carrillada-iberica" "Carrillada"
download_search "horchata-huelva" "Horchata Huelva"
download_search "tortilla-camarones" "Tortilla camarones Huelva"
download_search "pescado-frito-huelva" "Pescado frito Huelva"

echo ""
ls -1 *.jpg *.png 2>/dev/null | wc -l | xargs echo "📊 Total imágenes:"
