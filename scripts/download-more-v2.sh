#!/bin/bash
# Descarga más imágenes de Huelva - Segunda tanda
# Temas específicos que faltan

OUTPUT_DIR="/home/claw1/.openclaw/workspace/huelva-is/public/images/guides"
mkdir -p "$OUTPUT_DIR"
cd "$OUTPUT_DIR"

USER_AGENT="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36"

get_highres_url() {
  local thumb_url="$1"
  local highres=$(echo "$thumb_url" | sed 's|/thumb/|/|' | sed -E 's|/[0-9]+px-[^/]+$||')
  echo "$highres"
}

download_search() {
  local name="$1"
  local query="$2"
  local limit="${3:-5}"
  
  echo "🔍 $name: '$query'"
  
  local thumb_urls=$(curl -s -A "$USER_AGENT" \
    "https://commons.wikimedia.org/w/index.php?search=${query// /+}&title=Special:MediaSearch&type=image" | \
    grep -oP 'https://upload\.wikimedia\.org/wikipedia/commons/thumb/[^"]+\.(jpg|png)' | \
    sort -u | head -$limit)
  
  if [ -z "$thumb_urls" ]; then
    echo "  ✗ Sin resultados"
    return 1
  fi
  
  local count=1
  local success=false
  
  echo "$thumb_urls" | while read -r thumb_url && [ "$success" = false ]; do
    local highres_url=$(get_highres_url "$thumb_url")
    local medium_url=$(echo "$thumb_url" | sed -E "s|/[0-9]+px-|/1200px-|")
    
    local outname="${name}.jpg"
    
    for url in "$highres_url" "$medium_url" "$thumb_url"; do
      if curl -s -L "$url" -o "$outname" --max-time 45; then
        local size=$(stat -c%s "$outname" 2>/dev/null || echo "0")
        local magic=$(xxd -l 2 -p "$outname" 2>/dev/null)
        local is_jpeg="${magic:0:4}"
        local is_png="${magic:0:4}"
        
        if [ "$is_jpeg" = "ffd8" ] && [ "$size" -gt 20000 ]; then
          local kb=$((size / 1024))
          echo "  ✓ $outname (${kb}KB)"
          success=true
          break 2
        elif [ "$is_png" = "8950" ] && [ "$size" -gt 20000 ]; then
          mv "$outname" "${name}.png"
          echo "  ✓ ${name}.png ($((size/1024))KB)"
          success=true
          break 2
        else
          rm -f "$outname"
        fi
      fi
    done
    
    ((count++))
    if [ $count -gt $limit ]; then
      echo "  ✗ Agotadas opciones"
      break
    fi
  done
}

echo "🖼️  Descargando más imágenes de Huelva (segunda tanda)..."
echo ""

# Más búsquedas específicas
download_search "tren-minero-riotinto" "Tren minero Riotinto"
download_search "fresas-huelva" "Fresas Huelva"
download_search "vino-condado" "Vino Condado Huelva"
download_search "naranjas-huelva" "Naranjas Huelva"
download_search "bacalao-huelva" "Bacalao Huelva"
download_search "tarta-huelva" "Tarta Huelva"
download_search "cabalgata-huelva" "Cabalgata Reyes Huelva"
download_search "cruz-mayo-huelva" "Cruz Mayo Huelva"
download_search "vela-huelva" "Velá Huelva"
download_search "corpus-huelva" "Corpus Christi Huelva"
download_search "romeria-huelva" "Romeria Huelva"
download_search "sendero-huelva" "Sendero Huelva naturaleza"
download_search "ciclista-huelva" "Ciclista Huelva"
download_search "kayak-huelva" "Kayak Huelva Odiel"
download_search "observacion-aves" "Observacion aves Huelva"

echo ""
echo "📁 Total imágenes: $(ls -1 "$OUTPUT_DIR"/*.jpg 2>/dev/null | wc -l)"
