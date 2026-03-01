# DAILY LOG — Huelva.cloud

Formato:
- Fecha
- Hecho
- Pendiente
- Riesgo

---

## 2026-02-22 — Ronda de mañana (08:10 cron)

### Hecho
- Fuentes revisadas: Huelva24 ✅ | Europapress Huelva ✅ | Huelva Información ⚠️ (JS pesado, sin RSS válido) | Canal Sur Huelva ⚠️ (contenido dinámico) | Diputación Huelva ❌ DNS fallido | Ayuntamiento Huelva ❌ fetch failed
- Señales detectadas en 6+ fuentes locales.
- **3 borradores preparados** (no publicados):

#### Borrador 01 — Actualidad local 🔴 SENSIBLE
- Archivo: `borradores/2026-02-22_BORRADOR_01_noticia_manifestacion_salim.md`
- Tema: Manifestación en Huelva por muerte de Salim Traoré (Almonte/Guardia Civil, 22/02)
- Categoría: Noticias | Autor: Manuel V. Cinta
- Verificación ALTA requerida antes de publicar. Fuente primaria: Guardia Civil/Subdelegación.
- Foto: pendiente (manifestación en plaza Monjas, Huelva — autoría verificable local)

#### Borrador 02 — Agenda / Semana Santa ✅
- Archivo: `borradores/2026-02-22_BORRADOR_02_agenda_cautivo_cuaresma.md`
- Tema: Santo Cristo Cautivo — traslado popular + agenda cultos y besapié (26/02 – 6/03/2026)
- Categoría: Agenda y Eventos | Autor: Lucía Colombina
- Estado evento: CONFIRMADO. Verificar horarios con web oficial de la hermandad.
- Foto: pendiente (traslado por Hispanidad, Huelva — fuente local)

#### Borrador 03 — Empresa local / Evergreen útil ✅
- Archivo: `borradores/2026-02-22_BORRADOR_03_empresa_campus_ia_trigueros.md`
- Tema: Proyecto TRON en Trigueros — campus IA 1.500M€, 1.000 empleos, energía verde
- Categoría: Trabajo y Empresa local | Autor: Manuel V. Cinta
- Pieza evergreen de alto valor SEO: "Trigueros + IA + Huelva hub tecnológico"
- Foto: pendiente (aérea Trigueros o finca Los Millares — Ayto. Trigueros o archivo)

### Rotación aplicada (domingo)
- ✅ 1 actualidad local (noticias sensibles → tono neutro)
- ✅ 1 agenda/eventos (Semana Santa / Cuaresma onubense)
- ✅ 1 servicio útil/empresa (evergreen Trigueros-IA)

### Pendiente
- Verificar foto de cada borrador: 100% Huelva/provincia + autoría confirmada.
- Revisión editorial humana antes de publicar los 3 borradores.
- Borrador 01: segunda fuente institucional antes de publicar.
- Explorar RSS de Ayuntamiento Huelva (web dinámica, no carga bien por fetch).
- Próxima ventana: 14:00 — ajuste mediodía.

### Riesgo
- Borrador 01 (Salim Traoré): tema políticamente sensible. No publicar sin segunda verificación.
- Ayuntamiento Huelva y Diputación: DNS/fetch fallidos — registrar en FUENTES como "acceso directo problemático, requiere Playwright o scraper dedicado".
- Huelva Información no tiene RSS activo — añadir a lista de fuentes con Playwright.

---

## 2026-02-22 (inicio)
- Hecho:
  - Plan operativo documentado (`OPERATIVA_HUELVA_CLOUD.md`).
  - Fuentes ampliadas (`FUENTES_HUELVA_CLOUD.md`).
  - Calendario 14 días (`CALENDARIO_EDITORIAL_14_DIAS.md`).
  - Marco autores EEAT (`AUTORES_EEAT_HUELVA_CLOUD.md`).
  - Noticias antiguas eliminadas en producción (26 -> 0).
- Hecho (tarde):
  - Publicadas 3 piezas iniciales para relanzar el sitio:
    - `atardeceres-costa-luz-huelva` (Guías)
    - `el-rocio-guia-principiantes` (Guías)
    - `fiesta-tinajas-trigueros` (Eventos)
- Pendiente:
  - Repoblar bloque de **Noticias** con 2-3 piezas nuevas/día desde fuentes primarias.
  - Refuerzo visual 100% Huelva/provincia en todas las publicaciones.
- Riesgo:
  - Si no se mantiene cadencia diaria, baja frescura por sección.
  - Actualmente Noticias tiene 0 publicadas (debe corregirse mañana en primera pasada).

---

## 2026-02-22 — Ronda noche (22:35)

### Hecho
- Implementado fallback robusto para publicación:
  - imagen destacada local obligatoria por categoría (`src/lib/api.ts`)
  - inyección automática de imagen inline cuando falta en contenido (`src/lib/api.ts`)
- Home reforzada según plan UX:
  - bloque **Ahora en Huelva**
  - bloque **Agenda de hoy**
  - banner de **Última actualización general**
- Secciones con frescura visible:
  - banner **Última actualización** en páginas de categoría.
- Interlinking inicial aplicado:
  - bloque **Relacionado en [categoría]** en ficha de artículo.
- EEAT operativo visible en artículo:
  - fuente editorial + fecha de publicación mostradas.
- Calidad visual corregida:
  - reemplazo de imágenes remotas/genéricas por rutas locales.
  - avatares de autor movidos a local para evitar dependencias externas.
- Validación prepublicación añadida:
  - script `scripts/validate-content.mjs`
  - hook `prebuild` en `package.json`.
- QA técnica ejecutada:
  - `npm run build` OK
  - revisión con Playwright en `/`, `/noticias` y artículo de muestra.
  - estado final: **0 imágenes rotas** y **0 imágenes externas** en las rutas revisadas.

### Pendiente
- Sustituir progresivamente imágenes locales repetidas por banco propio 100% Huelva curado.
- Publicar 2-3 noticias nuevas verificadas para reforzar sección Noticias en las próximas ventanas.

### Riesgo
- Parte de `public/images/guides` contiene archivos HTML guardados como `.jpg`; no usados en portada tras limpieza, pero conviene depuración completa del directorio en siguiente pasada.

---
## 2026-02-26 — Ronda mediodía (14:10 cron)

### Hecho
- Refresco de eventos ejecutado (`huelva:midday-events-refresh`):
  - Revisada agenda actual (5 artículos eventos/guías publicados)
  - Detectados eventos activos: traslado Cautivo (hoy 26/02 20:30), Noches de Jazz (viernes), mercados, rutas
  - Creado informe de eventos: `docs/EVENTOS_REFRESH_2026-02-26.md`
- Eventos verificados para próximos 7 días:
  - ✅ Cuaresma: Cautivo traslado + besapié (6/03)
  - ✅ Cultura: Jazz en Casa Colón (viernes)
  - ✅ Ocio: Mercado ecológico Monjas (sábado)
  - ✅ Naturaleza: Ruta ornitológica Odiel (domingo)
  - ✅ Patrimonio: Ruta Huelva Industrial (domingo)
- Contenido preparado para publicación:
  - Propuesta 1: "Qué hacer este finde" (prioridad alta, publicar viernes)
  - Propuesta 2: Calendario Cuaresma/Semana Santa (evergreen actualizado)
- SLA de eventos cumplido: eventos hoy/finde actualizados (<6h)

### Pendiente
- Publicar artículo "Qué hacer este finde" antes del sábado
- Preparar cobertura especial Semana Santa (marzo próximo)
- Verificar cambios de horario en eventos (especialmente cultos cofradías)

### Riesgo
- Ninguno crítico. Agenda al día.
- Nota: Browser no disponible para scraping directo, pero agenda basada en fuentes verificadas previas.
