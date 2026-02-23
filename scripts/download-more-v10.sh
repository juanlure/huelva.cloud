#!/bin/bash
# Décima tanda - últimos intentos con términos variados

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

echo "🖼️  Décima tanda - últimos intentos..."

# Más playas y naturaleza
download_search "puntal-playa" "El Puntal Huelva"
download_search "mazagon-dunas" "Mazagon dunas"
download_search "rompido-playa" "El Rompido playa"
download_search "nueva-umbria" "Nueva Umbria"

# Pueblos
download_search "sanlucar-guadiana" "Sanlucar Guadiana"
download_search "san-silvestre" "San Silvestre Guzman"
download_search "trigueros" "Trigueros Huelva"
download_search "beas-huelva" "Beas Huelva"

# Gastronomía
download_search "gazpacho-huelva" "Gazpacho Huelva"
download_search "cocido-huelva" "Cocido Huelva"
download_search "pringa-huelva" "Pringa Huelva"
download_search "piripi-huelva" "Piripi Huelva"

# Turismo
download_search "ruta-colombina" "Ruta Colombina Huelva"
download_search "lugares-colombinos" "Lugares Colombinos"
download_search "descubrimiento-america" "Descubrimiento America"
download_search "carabelas-colon" "Carabelas Colon"

# Cultura
download_search "danza-huelva" "Danza Huelva"
download_search "folklore-huelva" "Folklore Huelva"
download_search "trajes-huelva" "Trajes Huelva"

echo ""
ls -1 *.jpg *.png 2>/dev/null | wc -l | xargs echo "📊 Total imágenes:"
