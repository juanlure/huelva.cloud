# 🎯 SEO Setup — Huelva.is

Configuración de Google Search Console y sistema de informes automatizados.

## Estado

- [x] Scripts de informes creados
- [ ] Site registrado en GSC (requerido)
- [ ] Verificación de propiedad (requerido)
- [ ] Sitemap enviado (opcional)
- [ ] Crons activados

---

## Paso 1: Registrar huelva.is en Google Search Console

1. Ve a https://search.google.com/search-console
2. Haz clic en **"Añadir propiedad"**
3. Selecciona **"Dominio"** (recomendado) o **"Prefijo de URL"**

### Opción A: Dominio (recomendado)
- Introduce: `huelva-is.vercel.app`
- Verificación mediante registro DNS (requiere acceso al panel de Vercel/domains)

### Opción B: Prefijo de URL (más rápido)
- Introduce: `https://huelva-is.vercel.app/`
- Verificación mediante etiqueta HTML o archivo HTML

---

## Paso 2: Verificar con Maton Gateway

Una vez registrado, el gateway automáticamente detectará el site (usa la misma cuenta de Google).

Verifica que funciona:
```bash
cd /home/claw1/.openclaw/workspace/huelva-is
bash scripts/gsc-daily-monitor.sh
```

Si ves "✅ Sin alertas de posición significativas", todo listo.

---

## Paso 3: Enviar Sitemap (opcional)

1. En GSC, ve a "Sitemaps" en el menú lateral
2. Añade: `https://huelva-is.vercel.app/sitemap.xml`
3. Envía

---

## Scripts Disponibles

### 📈 Informe Semanal (Lunes 9:00)
```bash
bash scripts/gsc-weekly-report.sh
```
Genera: `reports/seo-weekly-YYYY-WXX.md`

Incluye:
- Resumen ejecutivo (impresiones, clics, CTR, posición)
- Top 5 artículos por clics
- Oportunidades (queries con impresiones pero 0 clics)
- Alertas de caídas de posición
- Top queries por clics

### 📉 Monitoreo Diario (8:00 AM)
```bash
bash scripts/gsc-daily-monitor.sh
```
Detecta:
- Caídas de posición >5 lugares
- Caídas masivas de tráfico (>50%)
- Guarda alertas en `logs/seo-alerts.json`

---

## Crons Propuestos (añadir a OpenClaw)

```bash
# Informe semanal completo
openclaw cron add --name "huelva-is:seo-weekly" \
  --schedule "0 9 * * 1" \
  --command "cd /home/claw1/.openclaw/workspace/huelva-is && bash scripts/gsc-weekly-report.sh | telegram:nero-tg"

# Monitoreo diario de alertas
openclaw cron add --name "huelva-is:seo-monitor" \
  --schedule "0 8 * * *" \
  --command "cd /home/claw1/.openclaw/workspace/huelva-is && bash scripts/gsc-daily-monitor.sh 2>&1 | grep 'ALERTA_SEO' | telegram:nero-tg || echo 'OK'"
```

---

## Estructura de Archivos

```
huelva-is/
├── scripts/
│   ├── gsc-weekly-report.sh      # Informe semanal
│   └── gsc-daily-monitor.sh       # Alertas diarias
├── reports/
│   ├── seo-weekly-latest.md       # Último informe
│   └── seo-weekly-YYYY-WXX.md     # Históricos
└── logs/
    ├── gsc-metrics-history.json   # Historial de métricas
    └── seo-alerts.json            # Alertas detectadas
```

---

## Formato del Informe Semanal

```
📈 SEO REPORT — Huelva.is — Semana XX

📊 Resumen Ejecutivo
· Impresiones: X (+X% vs semana anterior)
· Clics orgánicos: X (+X%)
· CTR: X% | Posición media: X

🏆 Top 5 artículos esta semana
1. /articulo — X clics (pos. X)
...

🚀 OPORTUNIDADES — Actúa esta semana
· Keyword "..." genera X impresiones con 0 clics
· "..." en posición X — potencial de subir a top 5

⚠️ ALERTAS DETECTADAS
· Caída de posición: "..." de X a Y

🔍 Top queries por clics
· "..." — X clics (pos. X)
...
```

---

## Troubleshooting

### "Site no registrado en GSC"
→ El site aún no está verificado en GSC. Completa el Paso 1.

### Error 403 Forbidden
→ La cuenta de Google no tiene acceso al site. Añade la cuenta a GSC.

### Sin datos (rows vacío)
→ Normal para sites nuevos. Los datos tardan 2-3 días en aparecer.

---

## Próximas Mejoras

- [ ] Integración con PageSpeed API (velocidad de carga)
- [ ] Keyword research automatizado
- [ ] Comparativa con competidores locales
- [ ] Predicción de tendencias

---

*Configuración SEO creada: 2026-03-03*
