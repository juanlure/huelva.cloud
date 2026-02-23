#!/bin/bash
# Descarga automática de imágenes desde Wikimedia Commons
# Uso: ./download-commons-curl.sh

OUTPUT_DIR="/home/claw1/.openclaw/workspace/huelva-is/public/images/guides"
mkdir -p "$OUTPUT_DIR"
cd "$OUTPUT_DIR"

USER_AGENT="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36"

# Función para descargar imágenes de una búsqueda
download_search() {
  local name="$1"
  local query="$2"
  local limit="${3:-3}"
  
  echo "🔍 $name: '$query'"
  
  # Obtener URLs de imágenes
  local urls=$(curl -s -A "$USER_AGENT" \
    "https://commons.wikimedia.org/w/index.php?search=${query// /+}&title=Special:MediaSearch&type=image" | \
    grep -oP 'https://upload\.wikimedia\.org/wikipedia/commons/thumb/[^"]+\.(jpg|png)' | \
    sort -u | head -$limit)
  
  if [ -z "$urls" ]; then
    echo "  ✗ Sin resultados"
    return 1
  fi
  
  local count=1
  echo "$urls" | while read -r url; do
    # Extraer nombre de archivo limpio
    local filename=$(echo "$url" | sed \
      -e 's/.*\///' \
      -e 's/%28/(/g; s/%29/)/g' \
      -e 's/%20/ /g; s/%2C/,/g' \
      -e 's/%C3%A1/á/g; s/%C3%A9/é/g; s/%C3%AD/í/g; s/%C3%B3/ó/g; s/%C3%BA/ú/g' \
      -e 's/%C3%81/Á/g; s/%C3%89/É/g; s/%C3%8D/Í/g; s/%C3%93/Ó/g; s/%C3%9A/Ú/g' \
      -e 's/%C3%B1/ñ/g; s/%C3%91/Ñ/g')
    
    # Quitar prefijo de tamaño (500px-, 960px-, etc.)
    filename=$(echo "$filename" | sed -E 's/^[0-9]+px-//')
    
    local outname="${name}-${count}.jpg"
    
    # Descargar
    if curl -s -L "$url" -o "$outname" --max-time 30; then
      local size=$(stat -c%s "$outname" 2>/dev/null || echo "0")
      if [ "$size" -gt 10000 ]; then
        echo "  ✓ $outname (${size} bytes)"
        break  # Solo la primera válida por búsqueda
      else
        rm -f "$outname"
        echo "  ✗ $outname (muy pequeña)"
      fi
    else
      echo "  ✗ Error descargando"
    fi
    
    ((count++))
  done
}

echo "🖼️  Descargando imágenes de Wikimedia Commons..."
echo ""

# Búsquedas específicas
download_search "huelva" "Huelva city Spain"
download_search "huelva-puerto" "Puerto de Huelva port"
download_search "huelva-plaza" "Plaza de las Monjas Huelva"
download_search "huelva-catedral" "Catedral Huelva"
download_search "huelva-playa" "Playa Huelva beach"
download_search "aracena" "Aracena Huelva Spain"
download_search "choco" "choco frito sepia"

echo ""
echo "📁 Imágenes descargadas:"
ls -la "$OUTPUT_DIR"/*.jpg 2>/dev/null | tail -20
