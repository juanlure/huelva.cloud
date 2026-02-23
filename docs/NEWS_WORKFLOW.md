# Flujo de Noticias Diarias - Huelva.is

## Resumen

Sistema automatizado de generación de noticias locales con contenido original escrito por IA.

## Arquitectura

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Fuentes RSS    │────▶│  Scrape + AI     │────▶│  JSON Output    │
│  (5 fuentes)    │     │  (OpenClaw)      │     │  (1 noticia)    │
└─────────────────┘     └──────────────────┘     └────────┬────────┘
                                                          │
┌─────────────────┐     ┌──────────────────┐              │
│  Cron Daily     │────▶│  Commit + Push   │◀─────────────┘
│  (7:30 AM)      │     │  (Git)           │
└─────────────────┘     └──────────────────┘
                               │
                               ▼
                        ┌──────────────┐
                        │  Vercel      │
                        │  Deploy      │
                        └──────────────┘
```

## Fuentes de Noticias

| Fuente | Método | Prioridad |
|--------|--------|-----------|
| Huelva Información | RSS | Alta |
| Europa Press Huelva | RSS → HTML fallback | Media |
| Huelva24 | RSS → HTML fallback | Media |
| COPE Huelva | HTML fallback | Baja |
| Canal Sur Huelva | HTML fallback | Baja |

## Criterios de Selección

1. **Mención de "Huelva"** en título o URL (+2 puntos)
2. **Fuente local** (+1 punto)
3. **Frescura** (timestamp más reciente)

## Estructura del Artículo Generado

Cada noticia se reescribe con esta estructura:

1. **Lead impactante** - Qué pasó, en Huelva, ahora
2. **Contexto** - Por qué importa para el lector local
3. **Detalles relevantes** - Quién, cuándo, dónde, con datos
4. **Implicaciones** - Qué puede pasar ahora

Longitud objetivo: 400-600 palabras.

## Archivos Clave

```
scripts/
├── scrape-and-rewrite.mjs    # Scraper + generador IA
└── news-daily-publish.sh     # Orquestador del flujo

src/content/
└── external-news.json        # Output (1 noticia/día)
```

## Formato de Salida

```json
{
  "lastUpdated": "2026-02-23T20:11:02Z",
  "count": 1,
  "news": [{
    "title": "...",
    "excerpt": "...",
    "content": "HTML con artículo completo",
    "url": "URL original (referencia)",
    "publishedAt": "...",
    "source": "Nombre del medio",
    "category": "Noticias",
    "image": null,
    "external": false
  }]
}
```

## Tono Editorial

- Cercano, directo, sin relleno corporativo
- Sin frases tipo "según fuentes" o "se informa que"
- Contexto local siempre presente
- Cierre con perspectiva sobre Huelva

## Ejecución Manual

```bash
cd /home/claw1/.openclaw/workspace/huelva-is

# Solo scrape y generación
node scripts/scrape-and-rewrite.mjs

# Flujo completo (con commit/push)
bash scripts/news-daily-publish.sh
```

## Configuración del Cron

```bash
openclaw cron add \
  --name "huelva-is:news-daily" \
  --cron "30 7 * * *" \
  --tz "Europe/Berlin" \
  --session isolated \
  --message "cd /home/claw1/.openclaw/workspace/huelva-is && bash scripts/news-daily-publish.sh"
```

## Filtros Anti-Ruido

Se descartan noticias que contengan:
- `podcast` / `audio`
- `galeria` / `galería`
- `opinion` / `opinión`

## Dependencias

- `xml2js` - Parseo RSS
- `cheerio` - Scraping HTML
- OpenClaw agent local (`main`) - Generación de contenido

## Coste Operativo

- Scraping: ~5-10 llamadas HTTP/día
- IA: 1 generación de ~500 tokens/día
- Tiempo total: ~30-60 segundos/ejecución

---

*Flujo implementado: 2026-02-23*
*Documentación: WORKFLOWS.md (root workspace)*
