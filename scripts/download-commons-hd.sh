#!/bin/bash
# Descarga imágenes en ALTA RESOLUCIÓN desde Wikimedia Commons
# Transforma URLs de thumbnail a imagen original

OUTPUT_DIR="/home/claw1/.openclaw/workspace/huelva-is/public/images/guides"
mkdir -p "$OUTPUT_DIR"
cd "$OUTPUT_DIR"

USER_AGENT="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36"

# Función para obtener URL de alta resolución
get_highres_url() {
  local thumb_url="$1"
  # Reemplazar /thumb/ por / y quitar el sufijo de tamaño
  # Ej: /thumb/3/36/Foto.jpg/500px-Foto.jpg → /3/36/Foto.jpg
  local highres=$(echo "$thumb_url" | sed 's|/thumb/|/|' | sed -E 's|/[0-9]+px-[^/]+$||')
  echo "$highres"
}

# Función para descargar imágenes de una búsqueda
download_search() {
  local name="$1"
  local query="$2"
  local limit="${3:-5}"
  
  echo "🔍 $name: '$query'"
  
  # Obtener URLs de thumbnails
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
    # Transformar a URL de alta resolución
    local highres_url=$(get_highres_url "$thumb_url")
    
    # También probar con tamaño intermedio (1200px) si la original falla
    local medium_url=$(echo "$thumb_url" | sed -E "s|/[0-9]+px-|/1200px-|")
    
    local outname="${name}.jpg"
    
    # Intentar descargar: primero alta res, luego media
    for url in "$highres_url" "$medium_url" "$thumb_url"; do
      if curl -s -L "$url" -o "$outname" --max-time 45; then
        local size=$(stat -c%s "$outname" 2>/dev/null || echo "0")
        
        # Verificar que sea imagen válida (no HTML de error)
        local magic=$(xxd -l 2 -p "$outname" 2>/dev/null)
        local is_jpeg="${magic:0:4}"
        local is_png="${magic:0:4}"
        
        # ff d8 = JPEG, 89 50 = PNG
        if [ "$is_jpeg" = "ffd8" ] && [ "$size" -gt 20000 ]; then
          local kb=$((size / 1024))
          echo "  ✓ $outname (${kb}KB) - ${url: -30}"
          success=true
          break 2  # Salir de ambos loops
        elif [ "$is_png" = "8950" ] && [ "$size" -gt 20000 ]; then
          mv "$outname" "${name}.png"
          echo "  ✓ ${name}.png ($((size/1024))KB)"
          success=true
          break 2
        else
          rm -f "$outname"
          echo "  ✗ No válida o muy pequeña"
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

echo "🖼️  Descargando imágenes en ALTA RESOLUCIÓN..."
echo ""

# Búsquedas específicas
download_search "huelva-aerea" "Huelva aerial view"
download_search "huelva-puerto-grande" "Puerto de Huelva port"
download_search "huelva-plaza-monjas" "Plaza de las Monjas Huelva"
download_search "huelva-catedral" "Catedral Huelva"
download_search "huelva-muelle-tinto" "Muelle Tinto"
download_search "aracena-pueblo" "Aracena village"
download_search "huelva-playa-punta" "Playa Punta Umbría"
download_search "huelva-marismas" "Marismas Odiel"

echo ""
echo "📁 Imágenes descargadas:"
ls -lh "$OUTPUT_DIR"/*.jpg 2>/dev/null | awk '{print $9, "→", $5}'

echo ""
echo "📊 Total: $(ls -1 "$OUTPUT_DIR"/*.jpg 2>/dev/null | wc -l) imágenes"
