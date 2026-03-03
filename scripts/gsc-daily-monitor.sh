#!/usr/bin/env bash
# CRON: huelva-is:gsc-daily-monitor
# Monitoreo diario de caídas de posición y anomalías
# Ejecutar: Todos los días 8:00 AM

set -euo pipefail

export MATON_API_KEY="aOtG32mwagGW0aR-GVjywzs-AFWr0NWvDC4nahQlJudNJ9UtSIdv6bmGTZvRH95r5CeXDobLLTOtIVIbcdHmUNw2txHp8irSjy8"

LOGS_DIR="/home/claw1/.openclaw/workspace/huelva-is/logs"
ALERTS_FILE="$LOGS_DIR/seo-alerts.json"
HISTORY_FILE="$LOGS_DIR/gsc-metrics-history.json"

SITE_URL="sc-domain:huelva-is.vercel.app"

mkdir -p "$LOGS_DIR"

python3 <<'PYEOF'
import urllib.request
import os
import json
from urllib.parse import quote
from datetime import datetime, timedelta
import sys

API_KEY = os.environ["MATON_API_KEY"]
SITE_URL = "sc-domain:huelva-is.vercel.app"
HISTORY_FILE = "/home/claw1/.openclaw/workspace/huelva-is/logs/gsc-metrics-history.json"
ALERTS_FILE = "/home/claw1/.openclaw/workspace/huelva-is/logs/seo-alerts.json"

def load_history():
    if os.path.exists(HISTORY_FILE):
        with open(HISTORY_FILE, 'r') as f:
            return json.load(f)
    return []

def save_alert(alert_type, message, data=None):
    alerts = []
    if os.path.exists(ALERTS_FILE):
        with open(ALERTS_FILE, 'r') as f:
            alerts = json.load(f)
    
    alerts.append({
        'date': datetime.now().isoformat(),
        'type': alert_type,
        'message': message,
        'data': data or {}
    })
    alerts = alerts[-100:]
    with open(ALERTS_FILE, 'w') as f:
        json.dump(alerts, f, indent=2)
    
    # Imprimir a stderr para que el cron lo capture
    print(f"ALERTA_SEO: {message}", file=sys.stderr)

def fetch_gsc_data(start, end, dimensions, row_limit=50):
    site_url = quote(SITE_URL, safe='')
    payload = json.dumps({
        'startDate': start,
        'endDate': end,
        'dimensions': dimensions,
        'rowLimit': row_limit
    }).encode()
    
    req = urllib.request.Request(
        f'https://gateway.maton.ai/google-search-console/webmasters/v3/sites/{site_url}/searchAnalytics/query',
        data=payload,
        headers={'Authorization': f'Bearer {API_KEY}', 'Content-Type': 'application/json'},
        method='POST'
    )
    
    resp = urllib.request.urlopen(req, timeout=30)
    return json.load(resp)

try:
    # Comparar últimos 3 días vs 3 días anteriores
    end_current = (datetime.now() - timedelta(days=2)).strftime('%Y-%m-%d')
    start_current = (datetime.now() - timedelta(days=4)).strftime('%Y-%m-%d')
    end_prev = (datetime.now() - timedelta(days=5)).strftime('%Y-%m-%d')
    start_prev = (datetime.now() - timedelta(days=7)).strftime('%Y-%m-%d')
    
    current_data = fetch_gsc_data(start_current, end_current, ['query', 'page'], 50)
    prev_data = fetch_gsc_data(start_prev, end_prev, ['query', 'page'], 50)
    
    current_rows = current_data.get('rows', [])
    prev_rows = prev_data.get('rows', [])
    
    # Indexar por query+page
    current_index = {}
    for row in current_rows:
        key = tuple(row.get('keys', []))
        current_index[key] = row
    
    prev_index = {}
    for row in prev_rows:
        key = tuple(row.get('keys', []))
        prev_index[key] = row
    
    # Detectar caídas significativas (>5 posiciones)
    alerts_triggered = []
    
    for key, current_row in current_index.items():
        if key in prev_index:
            prev_row = prev_index[key]
            curr_pos = current_row.get('position', 0)
            prev_pos = prev_row.get('position', 0)
            
            if curr_pos > prev_pos + 5 and prev_pos < 20:
                # Solo alertar si estaba en top 20 y cayó más de 5 pos
                query, page = key
                alerts_triggered.append({
                    'query': query,
                    'page': page.replace('https://huelva-is.vercel.app', ''),
                    'previous': prev_pos,
                    'current': curr_pos
                })
    
    # Detectar caída masiva de clics (>50%)
    total_clicks_curr = sum(r.get('clicks', 0) for r in current_rows)
    total_clicks_prev = sum(r.get('clicks', 0) for r in prev_rows)
    
    if total_clicks_prev > 10 and total_clicks_curr < total_clicks_prev * 0.5:
        save_alert('traffic_drop', 
            f'🚨 CAÍDA MASIVA: Clics bajaron {(1-total_clicks_curr/total_clicks_prev)*100:.0f}% ({total_clicks_prev} → {total_clicks_curr})',
            {'previous': total_clicks_prev, 'current': total_clicks_curr})
    
    # Reportar caídas individuales
    for alert in alerts_triggered[:10]:  # Máximo 10 alertas
        query_short = alert['query'][:30]
        page_short = alert['page'][:30]
        prev_pos = alert['previous']
        curr_pos = alert['current']
        save_alert('position_drop',
            f'📉 "{query_short}..." en {page_short} — Pos {prev_pos:.0f} → {curr_pos:.0f}',
            alert)
    
    if not alerts_triggered and total_clicks_curr >= total_clicks_prev * 0.5:
        print("✅ Sin alertas de posición significativas")
    
    print(f"📊 Monitoreo completado: {len(current_rows)} queries analizadas")
    
except urllib.error.HTTPError as e:
    if e.code == 403:
        print(f"⚠️ Site no registrado en GSC aún. Registra: https://huelva-is.vercel.app", file=sys.stderr)
    else:
        print(f"❌ Error HTTP {e.code}: {e.reason}", file=sys.stderr)
    sys.exit(1)
except Exception as e:
    print(f"❌ Error: {e}", file=sys.stderr)
    sys.exit(1)
PYEOF
