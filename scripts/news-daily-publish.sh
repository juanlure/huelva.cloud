#!/usr/bin/env bash
set -euo pipefail

REPO="/home/claw1/.openclaw/workspace/huelva-is"
cd "$REPO"

echo "[news-daily] $(date -Iseconds) starting"

node scripts/scrape-news.mjs

# Commit solo si hay cambios reales
if [[ -n "$(git status --porcelain src/content/external-news.json)" ]]; then
  git add src/content/external-news.json
  git commit -m "news: actualización diaria de noticia local" --author "juanlure <132950338+juanlure@users.noreply.github.com>"
  git push origin main
  echo "[news-daily] pushed"
else
  echo "[news-daily] no changes"
fi
