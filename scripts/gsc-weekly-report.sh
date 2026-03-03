#!/usr/bin/env bash
# CRON: huelva-is:gsc-weekly-report
# Informe SEO semanal para Huelva.is
# Ejecutar: Lunes 9:00 AM

set -euo pipefail

export MATON_API_KEY="aOtG32mwagGW0aR-GVjywzs-AFWr0NWvDC4nahQlJudNJ9UtSIdv6bmGTZvRH95r5CeXDobLLTOtIVIbcdHmUNw2txHp8irSjy8"

REPORTS_DIR="/home/claw1/.openclaw/workspace/huelva-is/reports"
LOGS_DIR="/home/claw1/.openclaw/workspace/huelva-is/logs"
HISTORY_FILE="$LOGS_DIR/gsc-metrics-history.json"
ALERTS_FILE="$LOGS_DIR/seo-alerts.json"
LOG_FILE="$LOGS_DIR/gsc-$(date +%Y%m%d).log"

# Configuración del site
SITE_URL="sc-domain:huelva-is.vercel.app"
SITE_DISPLAY="huelva-is.vercel.app"

mkdir -p "$REPORTS_DIR" "$LOGS_DIR"

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

alert() {
  local msg="$1"
  log "🚨 ALERTA: $msg"
}

# Calcular fechas
WEEK_NUM=$(date +%V)
YEAR=$(date +%Y)
END_DATE=$(date -d "3 days ago" +%Y-%m-%d)
START_DATE=$(date -d "9 days ago" +%Y-%m-%d)  # Semana completa
START_DATE_PREV=$(date -d "16 days ago" +%Y-%m-%d)
END_DATE_PREV=$(date -d "10 days ago" +%Y-%m-%d)

log "=== SEO Report Huelva.is — Semana $WEEK_NUM ==="
log "Período: $START_DATE a $END_DATE"

python3 <<PYEOF
import urllib.request
import os
import json
from urllib.parse import quote
from datetime import datetime, timedelta
import sys

API_KEY = os.environ["MATON_API_KEY"]
REPORTS_DIR = "/home/claw1/.openclaw/workspace/huelva-is/reports"
LOGS_DIR = "/home/claw1/.openclaw/workspace/huelva-is/logs"
HISTORY_FILE = f"{LOGS_DIR}/gsc-metrics-history.json"
ALERTS_FILE = f"{LOGS_DIR}/seo-alerts.json"

SITE_URL = "sc-domain:huelva-is.vercel.app"
SITE_DISPLAY = "huelva-is.vercel.app"
WEEK_NUM = "$WEEK_NUM"
YEAR = "$YEAR"
START_DATE = "$START_DATE"
END_DATE = "$END_DATE"
START_DATE_PREV = "$START_DATE_PREV"
END_DATE_PREV = "$END_DATE_PREV"

def load_history():
    if os.path.exists(HISTORY_FILE):
        with open(HISTORY_FILE, 'r') as f:
            return json.load(f)
    return []

def save_history(metrics):
    history = load_history()
    history.append({
        'date': datetime.now().isoformat(),
        'week': WEEK_NUM,
        'metrics': metrics
    })
    history = history[-12:]  # Mantener 12 semanas
    with open(HISTORY_FILE, 'w') as f:
        json.dump(history, f, indent=2)

def load_alerts():
    if os.path.exists(ALERTS_FILE):
        with open(ALERTS_FILE, 'r') as f:
            return json.load(f)
    return []

def save_alert(alert):
    alerts = load_alerts()
    alerts.append({
        'date': datetime.now().isoformat(),
        'type': alert['type'],
        'message': alert['message'],
        'data': alert.get('data', {})
    })
    alerts = alerts[-50:]
    with open(ALERTS_FILE, 'w') as f:
        json.dump(alerts, f, indent=2)

def fetch_gsc_data(start, end, dimensions, row_limit=100):
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
    
    try:
        resp = urllib.request.urlopen(req, timeout=30)
        return json.load(resp)
    except urllib.error.HTTPError as e:
        if e.code == 403:
            print(f"❌ Site no registrado en GSC: {SITE_URL}", file=sys.stderr)
            print(f"   Ve a https://search.google.com/search-console y añade: https://{SITE_DISPLAY}", file=sys.stderr)
        raise

def calculate_metrics(rows):
    if not rows:
        return {'clicks': 0, 'impressions': 0, 'ctr': 0, 'position': 0}
    clicks = sum(r.get('clicks', 0) for r in rows)
    impressions = sum(r.get('impressions', 0) for r in rows)
    ctr = (clicks / impressions * 100) if impressions else 0
    position = sum(r.get('position', 0) for r in rows) / len(rows) if rows else 0
    return {
        'clicks': clicks,
        'impressions': impressions,
        'ctr': round(ctr, 1),
        'position': round(position, 1)
    }

def pct_change(current, previous):
    if previous == 0:
        return "∞" if current > 0 else "0"
    change = ((current - previous) / previous) * 100
    sign = "+" if change > 0 else ""
    return f"{sign}{change:.0f}%"

def pct_change_emoji(current, previous):
    if previous == 0:
        return "🆕"
    change = ((current - previous) / previous) * 100
    if change > 10:
        return "📈"
    elif change < -10:
        return "📉"
    return "➡️"

try:
    # Datos semana actual
    pages_data = fetch_gsc_data(START_DATE, END_DATE, ['page'], 100)
    queries_data = fetch_gsc_data(START_DATE, END_DATE, ['query'], 100)
    daily_data = fetch_gsc_data(START_DATE, END_DATE, ['date'], 10)
    
    # Datos semana anterior para comparación
    pages_data_prev = fetch_gsc_data(START_DATE_PREV, END_DATE_PREV, ['page'], 100)
    queries_data_prev = fetch_gsc_data(START_DATE_PREV, END_DATE_PREV, ['query'], 100)
    
    # Calcular métricas
    current = calculate_metrics(pages_data.get('rows', []))
    previous = calculate_metrics(pages_data_prev.get('rows', []))
    
    # Guardar historial
    save_history(current)
    
    # Detectar oportunidades y problemas
    opportunities = []
    alerts = []
    
    # Top queries por impresiones
    query_rows = queries_data.get('rows', [])
    page_rows = pages_data.get('rows', [])
    
    # Oportunidad: queries con muchas impresiones y 0 clics
    for row in query_rows[:20]:
        query = row.get('keys', [''])[0]
        clicks = row.get('clicks', 0)
        impressions = row.get('impressions', 0)
        ctr = row.get('ctr', 0) * 100
        position = row.get('position', 0)
        
        if impressions > 100 and clicks == 0:
            opportunities.append({
                'type': 'zero_clicks',
                'query': query,
                'impressions': impressions,
                'message': f'Keyword "{query[:40]}..." genera {impressions} impresiones con 0 clics'
            })
        
        if position > 5 and position < 20 and impressions > 50:
            opportunities.append({
                'type': 'position_boost',
                'query': query,
                'position': position,
                'message': f'Keyword "{query[:40]}..." en posición {position:.0f} — potencial de subir a top 5'
            })
    
    # Detectar caídas de posición
    prev_queries = {r.get('keys', [''])[0]: r for r in queries_data_prev.get('rows', [])}
    for row in query_rows[:15]:
        query = row.get('keys', [''])[0]
        position = row.get('position', 0)
        
        if query in prev_queries:
            prev_pos = prev_queries[query].get('position', 0)
            if position > prev_pos + 5:
                alerts.append({
                    'type': 'position_drop',
                    'query': query,
                    'previous': prev_pos,
                    'current': position,
                    'message': f'🚨 Caída de posición: "{query[:40]}..." de {prev_pos:.0f} a {position:.0f}'
                })
    
    # Generar informe
    report_lines = []
    report_lines.append(f"""📈 *SEO REPORT — Huelva.is — Semana {WEEK_NUM}*{YEAR}

📊 *Resumen Ejecutivo*
· Impresiones: {current['impressions']:,} ({pct_change(current['impressions'], previous['impressions'])} {pct_change_emoji(current['impressions'], previous['impressions'])} vs semana anterior)
· Clics orgánicos: {current['clicks']:,} ({pct_change(current['clicks'], previous['clicks'])} {pct_change_emoji(current['clicks'], previous['clicks'])})
· CTR: {current['ctr']}% | Posición media: {current['position']}""")
    
    # Top 5 artículos
    report_lines.append("\n🏆 *Top 5 artículos esta semana*")
    pages_sorted = sorted(page_rows, key=lambda x: x.get('clicks', 0), reverse=True)
    for i, row in enumerate(pages_sorted[:5], 1):
        page = row.get('keys', [''])[0].replace(f'https://{SITE_DISPLAY}', '')
        if not page:
            page = "/ (home)"
        clicks = row.get('clicks', 0)
        position = row.get('position', 0)
        report_lines.append(f"{i}. `{page[:40]}` — {clicks} clics (pos. {position:.0f})")
    
    # Oportunidades
    report_lines.append("\n🚀 *OPORTUNIDADES — Actúa esta semana*")
    if opportunities:
        for opp in opportunities[:5]:
            report_lines.append(f"· {opp['message']}")
    else:
        report_lines.append("· Sin oportunidades destacadas esta semana")
    
    # Alertas
    if alerts:
        report_lines.append("\n⚠️ *ALERTAS DETECTADAS*")
        for alert in alerts[:5]:
            report_lines.append(f"· {alert['message']}")
            save_alert(alert)
    
    # Top queries
    report_lines.append("\n🔍 *Top queries por clics*")
    queries_sorted = sorted(query_rows, key=lambda x: x.get('clicks', 0), reverse=True)
    for row in queries_sorted[:5]:
        query = row.get('keys', [''])[0][:35]
        clicks = row.get('clicks', 0)
        position = row.get('position', 0)
        report_lines.append(f"· `{query}` — {clicks} clics (pos. {position:.0f})")
    
    # Keywords sin cobertura (simulado - requeriría keyword research externo)
    report_lines.append("\n💡 *Recomendación de contenido*")
    report_lines.append("· Revisar artículos con CTR < 2% — optimizar titles y meta descriptions")
    report_lines.append("· Considerar contenido sobre: 'mejores playas Huelva', 'rutas senderismo Sierra'")
    
    report_lines.append(f"\n---")
    report_lines.append(f"*{SITE_DISPLAY} | Datos: {START_DATE} a {END_DATE}*")
    
    report_text = "\n".join(report_lines)
    
    # Guardar reporte
    report_file = f"{REPORTS_DIR}/seo-weekly-{YEAR}-W{WEEK_NUM}.md"
    with open(report_file, 'w') as f:
        f.write(report_text)
    
    # Guardar también como último reporte
    with open(f"{REPORTS_DIR}/seo-weekly-latest.md", 'w') as f:
        f.write(report_text)
    
    print(report_text)
    print(f"\n✅ Reporte guardado: {report_file}")
    
    # Alertas urgentes a stderr para el cron
    for alert in alerts:
        if alert['type'] == 'position_drop':
            print(f"ALERTA_SEO: {alert['message']}", file=sys.stderr)

except Exception as e:
    print(f"❌ Error: {e}", file=sys.stderr)
    import traceback
    traceback.print_exc()
    sys.exit(1)
PYEOF

EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
  log "❌ Reporte falló con código $EXIT_CODE"
  exit 1
fi

log "=== Reporte completado ==="
exit 0
