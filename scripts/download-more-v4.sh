#!/bin/bash
# Cuarta tanda - temas variados

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
  
  if [ -z "$thumb_urls" ]; then
    echo "  ✗ Sin resultados"
    return 1
  fi
  
  echo "$thumb_urls" | head -1 | while read -r thumb_url; do
    local highres=$(echo "$thumb_url" | sed 's|/thumb/|/|' | sed -E 's|/[0-9]+px-[^/]+$||')
    local outname="${name}.jpg"
    
    for url in "$highres" "$thumb_url"; do
      if curl -s -L "$url" -o "$outname" --max-time 45; then
        local size=$(stat -c%s "$outname" 2>/dev/null || echo "0")
        local magic=$(xxd -l 2 -p "$outname" 2>/dev/null)
        
        if [ "${magic:0:4}" = "ffd8" ] && [ "$size" -gt 20000 ]; then
          echo "  ✓ ${name}.jpg ($((size/1024))KB)"
          break 2
        else
          rm -f "$outname"
        fi
      fi
    done
  done
}

echo "🖼️  Cuarta tanda de imágenes..."

download_search "caldero-huelva" "Caldero Huelva"
download_search "atun-rojo" "Atun rojo almadraba"
download_search "piensos-huelva" "Piensos Huelva agricultura"
download_search "azulejos-huelva" "Azulejos ceramica Huelva"
download_search "bodega-huelva" "Bodega vino Huelva"
download_search "coto-huelva" "Coto Donana Huelva"
download_search "lince-huelva" "Lince Iberico Huelva"
download_search "flamenco-huelva" "Flamenco Huelva baile"
download_search "semana-santa-huelva" "Semana Santa Huelva paso"
download_search "encierro-huelva" "Encierro Huelva"

echo ""
echo "📊 Total: $(ls -1 *.jpg *.png 2>/dev/null | wc -l) imágenes"
