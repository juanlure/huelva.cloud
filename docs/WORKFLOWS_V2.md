# Huelva.cloud Workflows v2.0

Sistema unificado de publicación automatizada.

## 🎯 Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                    WORKFLOW ORCHESTRATOR                     │
├─────────────────────────────────────────────────────────────┤
│  08:00        14:00        20:00                            │
│    │            │            │                              │
│    ▼            ▼            ▼                              │
│ MORNING      MIDDAY      EVENING                           │
│    │            │            │                              │
│    └────────────┴────────────┘                              │
│              │                                              │
│              ▼                                              │
│   ┌─────────────────────┐                                   │
│   │ STAGE 1: SCRAPE     │  Noticias locales (max 3/día)    │
│   ├─────────────────────┤                                   │
│   │ STAGE 2: PROCESS    │  Validación, deduplicación       │
│   ├─────────────────────┤                                   │
│   │ STAGE 3: PUBLISH    │  Git commit + push               │
│   └─────────────────────┘                                   │
└─────────────────────────────────────────────────────────────┘
```

## ⏰ Horarios

| Workflow | Horario | Objetivo | Max Noticias |
|----------|---------|----------|--------------|
| **morning** | 08:00 | Noticia del día + check agenda | 1 |
| **midday** | 14:00 | Actualización mediodía | 2 (acumulado) |
| **evening** | 20:00 | Cierre + agenda finde | 3 (acumulado) |

## 🚀 Uso

### Ejecución manual
```bash
cd /home/claw1/.openclaw/workspace/huelva-is

# Modo específico
node scripts/workflow-orchestrator.mjs morning
node scripts/workflow-orchestrator.mjs midday
node scripts/workflow-orchestrator.mjs evening

# Todo en secuencia
node scripts/workflow-orchestrator.mjs full
```

### Ver estado
```bash
# Logs del día
cat logs/workflow-morning-$(date +%Y-%m-%d).json

# Estado actual
cat logs/.workflow-state.json
```

## 📊 Monitoreo

### Logs
- Ruta: `logs/workflow-{mode}-{YYYY-MM-DD}.json`
- Formato: JSON estructurado con timestamps
- Retención: Manual (revisar trimestral)

### Estado
- Archivo: `logs/.workflow-state.json`
- Tracking: Noticias publicadas hoy, última ejecución

### Métricas clave
| Métrica | Objetivo |
|---------|----------|
| Noticias/día | 1-3 |
| Tiempo ejecución | < 2 min |
| Success rate | > 95% |
| Duplicados evitados | 100% |

## 🔧 Configuración

### Límites (en `workflow-orchestrator.mjs`)
```javascript
// Máximo noticias por modo
morning: 1
midday: 2
evening: 3
```

### Ajustar horarios
```bash
openclaw cron list
grep huelva
# Editar con: openclaw cron edit <id> --cron "0 9 * * *"
```

## 🐛 Troubleshooting

### "No se detectó nueva noticia"
- Posible duplicado (URL ya existe)
- Fuentes sin contenido nuevo
- **Solución**: Verificar `external-news.json`

### "Git push falló"
- Sin conectividad
- Conflicto de ramas
- **Solución**: Ejecutar manual y resolver

### "Scraper falló"
- Fuentes caídas
- Cambio de estructura web
- **Solución**: Revisar logs, actualizar selectores

## 📁 Archivos clave

```
scripts/
├── workflow-orchestrator.mjs    # ← Este archivo
├── scrape-and-rewrite.mjs       # Scraper individual
└── news-daily-publish.sh        # Legacy (reemplazado)

logs/
├── .workflow-state.json         # Estado actual
├── workflow-morning-YYYY-MM-DD.json
├── workflow-midday-YYYY-MM-DD.json
└── workflow-evening-YYYY-MM-DD.json

src/content/
└── external-news.json           # Output (max 15 noticias)
```

## 🔄 Migración desde v1

Los crons antiguos fueron reemplazados:
- ❌ `scraper:huelva-morning` → ✅ `huelva:workflow-morning`
- ❌ `scraper:huelva-midday` → ✅ `huelva:workflow-midday`
- ❌ `scraper:huelva-evening` → ✅ `huelva:workflow-evening`
- ❌ `processor:kimo-huelva` → Eliminado (funcionalidad integrada)

## 📈 Roadmap

- [ ] Dashboard de métricas
- [ ] Alertas por Telegram en fallos
- [ ] Auto-retry con backoff exponencial
- [ ] Rotación de contenido (noticias → eventos → guías)

---

*Implementado: 2026-03-01*  
*Versión: 2.0*
