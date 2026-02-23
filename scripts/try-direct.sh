#!/bin/bash
# Descarga manual con curl directo desde URLs conocidas de Commons

mkdir -p public/images/guides

echo "Intentando descargas directas desde Commons..."

# Intentar varias URLs conocidas de estructura Commons

# Plaza Monjas - intentar varios nombres posibles
curl -L --max-time 30 -o public/images/guides/huelva-plaza.jpg \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Huelva_-_Plaza_de_las_Monjas.jpg/800px-Huelva_-_Plaza_de_las_Monjas.jpg" 2>/dev/null && echo "✓ Plaza encontrada" || echo "✗ Plaza no encontrada"

# Puerto Huelva  
curl -L --max-time 30 -o public/images/guides/huelva-puerto.jpg \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Puerto_de_Huelva.jpg/800px-Puerto_de_Huelva.jpg" 2>/dev/null && echo "✓ Puerto encontrado" || echo "✗ Puerto no encontrado"

# Muelle Tinto
curl -L --max-time 30 -o public/images/guides/huelva-muelle.jpg \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Muelle_del_Tinto.jpg/800px-Muelle_del_Tinto.jpg" 2>/dev/null && echo "✓ Muelle encontrado" || echo "✗ Muelle no encontrado"

ls -la public/images/guides/
