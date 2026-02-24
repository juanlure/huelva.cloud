#!/usr/bin/env bash
# CRON: huelva-is:news-daily
# Mejorado con: logging, retry logic, notificaciones de error

set -euo pipefail

REPO="/home/claw1/.openclaw/workspace/huelva-is"
LOG_DIR="/home/claw1/.openclaw/workspace/huelva-is/logs"
LOG_FILE="$LOG_DIR/news-daily-$(date +%Y%m%d).log"
MAX_RETRIES=3
RETRY_DELAY=30

# Crear directorio de logs si no existe
mkdir -p "$LOG_DIR"

# Función de logging
log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Función de notificación de error
notify_error() {
  local message="$1"
  log "ERROR: $message"
  # Notificar vía OpenClaw si está disponible
  if command -v openclaw &> /dev/null; then
    openclaw notify --message "🚨 huelva-is:news-daily failed: $message" --priority high 2>/dev/null || true
  fi
}

# Función de retry
retry() {
  local n=1
  local cmd="$1"
  while [ $n -le $MAX_RETRIES ]; do
    log "Intento $n/$MAX_RETRIES: $cmd"
    if eval "$cmd"; then
      return 0
    fi
    n=$((n + 1))
    if [ $n -le $MAX_RETRIES ]; then
      log "Esperando ${RETRY_DELAY}s antes de reintentar..."
      sleep $RETRY_DELAY
    fi
  done
  return 1
}

cd "$REPO" || { notify_error "No se puede acceder al repositorio"; exit 1; }

log "=== Iniciando news-daily ==="

# Verificar que el script existe
if [[ ! -f "scripts/scrape-and-rewrite.mjs" ]]; then
  notify_error "Script scrape-and-rewrite.mjs no encontrado"
  exit 1
fi

# Ejecutar scraper con retry
if ! retry "node scripts/scrape-and-rewrite.mjs >> '$LOG_FILE' 2>&1"; then
  notify_error "Scraper falló después de $MAX_RETRIES intentos"
  exit 1
fi

# Verificar que se generó el archivo
if [[ ! -f "src/content/external-news.json" ]]; then
  notify_error "Archivo external-news.json no generado"
  exit 1
fi

# Validar JSON
if ! jq empty src/content/external-news.json 2>/dev/null; then
  notify_error "JSON inválido en external-news.json"
  exit 1
fi

# Commit solo si hay cambios reales
if [[ -n "$(git status --porcelain src/content/external-news.json)" ]]; then
  log "Cambios detectados, haciendo commit..."
  
  # Verificar conectividad con GitHub
  if ! git ls-remote origin &>/dev/null; then
    notify_error "Sin conectividad con GitHub"
    exit 1
  fi
  
  git add src/content/external-news.json
  
  if git commit -m "news: noticia diaria $(date +%Y-%m-%d)" --author "juanlure <132950338+juanlure@users.noreply.github.com>"; then
    if git push origin main; then
      log "✅ Push exitoso"
      
      # Obtener título de la noticia para el resumen
      TITLE=$(jq -r '.news[0].title // "Sin título"' src/content/external-news.json | cut -c1-80)
      log "Noticia publicada: $TITLE"
    else
      notify_error "Push falló"
      exit 1
    fi
  else
    notify_error "Commit falló"
    exit 1
  fi
else
  log "ℹ️ Sin cambios para publicar"
fi

log "=== news-daily completado ==="
exit 0
