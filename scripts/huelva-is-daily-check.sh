#!/bin/bash
# huelva-is-daily-check.sh
# Script de revisión diaria para huelva.is
# Genera un artículo nuevo cada día basado en temas pendientes

set -e

WORKSPACE="/home/claw1/.openclaw/workspace/huelva-is"
LOG_FILE="$WORKSPACE/logs/daily-check.log"
DATE=$(date +%Y-%m-%d)

# Crear directorio de logs si no existe
mkdir -p "$WORKSPACE/logs"

echo "[$DATE] Iniciando revisión diaria de huelva.is" >> "$LOG_FILE"

# 1. Verificar estado del repo
cd "$WORKSPACE"
echo "[$DATE] Verificando estado del repositorio..." >> "$LOG_FILE"

if [ -n "$(git status --porcelain)" ]; then
  echo "[$DATE] ⚠️  Cambios sin commitear detectados" >> "$LOG_FILE"
  git add .
  git commit -m "auto: cambios pendientes del $(date +%Y-%m-%d)" --author "juanlure <132950338+juanlure@users.noreply.github.com>" || true
  git push origin main || echo "[$DATE] ⚠️  Push fallido" >> "$LOG_FILE"
fi

# 2. Verificar build
echo "[$DATE] Verificando build..." >> "$LOG_FILE"
if ! npm run build >> "$LOG_FILE" 2>&1; then
  echo "[$DATE] ❌ ERROR: Build fallido" >> "$LOG_FILE"
  exit 1
fi

echo "[$DATE] ✅ Build exitoso" >> "$LOG_FILE"

# 3. Contar artículos actuales
ARTICLE_COUNT=$(grep -c "slug:" src/content/articles.ts)
echo "[$DATE] 📊 Artículos actuales: $ARTICLE_COUNT" >> "$LOG_FILE"

# 4. Contar imágenes
IMAGE_COUNT=$(ls -1 public/images/guides/*.jpg public/images/guides/*.png 2>/dev/null | wc -l)
echo "[$DATE] 🖼️  Imágenes actuales: $IMAGE_COUNT" >> "$LOG_FILE"

# 5. Verificar enlaces rotos (si hay herramienta instalada)
if command -v linkchecker &> /dev/null; then
  echo "[$DATE] 🔍 Verificando enlaces..." >> "$LOG_FILE"
  linkchecker http://localhost:3000 --output=csv >> "$LOG_FILE" 2>&1 || true
fi

echo "[$DATE] ✅ Revisión diaria completada" >> "$LOG_FILE"
echo "---" >> "$LOG_FILE"
