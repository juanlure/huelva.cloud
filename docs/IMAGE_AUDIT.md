# Auditoría de Imágenes — Huelva.is
## Fecha: 2026-02-23

### Estado Actual
- **Total artículos:** 12
- **Imágenes válidas disponibles:** 6
- **Problema:** 8 artículos usan la misma imagen (plaza de las monjas)

### Artículos y sus imágenes CORRECTAS

| # | Slug | Categoría | Tema | Imagen CORRECTA | Estado |
|---|------|-----------|------|-----------------|--------|
| 1 | huelva-puerto-ampliacion-muelle-2026 | Noticias | Puerto/muelle contenedores | **NECESITA:** Puerto de Huelva, muelle, grúas | ❌ Mal |
| 2 | huelva-festival-cine-europeo-2026 | Noticias | Festival cine/Gran Teatro | **NECESITA:** Gran Teatro, cine, proyección | ❌ Mal |
| 3 | agenda-huelva-esta-semana-claves | Eventos | Agenda general | huelva-plaza-las-monjas.jpg | ✅ OK |
| 4 | fiesta-tinajas-trigueros | Eventos | Fiesta tradicional/tinajas | **NECESITA:** Tinajas, alfarería, evento tradicional | ❌ Mal |
| 5 | ruta-gamba-blanca-huelva-capital | Gastronomía | Gamba blanca | coquinas-huelva.jpg (gamba/crustáceo) | ✅ OK |
| 6 | choco-frito-huelva-como-se-come-bien | Gastronomía | Choco frito | choco-frito-tapa.jpg | ✅ OK |
| 7 | donde-dormir-huelva-capital-opciones-reales | Alojamiento | Hoteles centro | huelva-plaza-las-monjas.jpg (casco urbano) | ⚠️ Aceptable |
| 8 | alojarse-sierra-aracena-opciones | Alojamiento | Sierra/naturaleza | **NECESITA:** Sierra de Aracena, paisaje, naturaleza | ❌ Mal (tiene jamón) |
| 9 | el-rocio-guia-principiantes | Guías Locales | El Rocío/ermita | **NECESITA:** Ermita del Rocío, aldea, paisaje marismeño | ❌ Mal |
| 10 | muelle-tinto-atardecer-guia-real | Guías Locales | Muelle Tinto | **NECESITA:** Muelle Tinto, estructuras metálicas, río | ❌ Mal |
| 11 | ayamonte-casco-historico-y-tapeo | Guías Locales | Ayamonte/Guadiana | **NECESITA:** Ayamonte, río Guadiana, puente internacional | ❌ Mal |
| 12 | aracena-que-hacer-fin-de-semana | Guías Locales | Aracena/cueva | corte-jamon-iberico.jpg (jamón de zona) | ⚠️ Aceptable |

### Distribución actual (MALA)
- huelva-plaza-las-monjas.jpg: 8 artículos ❌
- coquinas-huelva.jpg: 1 artículo ✅
- choco-frito-tapa.jpg: 1 artículo ✅
- choco-frito-hero.jpg: No usada
- cafe-vaso-huelva.jpg: No usada
- corte-jamon-iberico.jpg: 2 artículos ⚠️

### Imágenes NECESITADAS (buscar en Wikimedia Commons)
1. **Puerto de Huelva / Muelle de contenedores** → Artículo #1
2. **Gran Teatro de Huelva / Cine** → Artículo #2
3. **Fiesta tradicional / Tinajas / Alfarería** → Artículo #4
4. **Sierra de Aracena / Paisaje natural** → Artículo #8
5. **El Rocío / Ermita / Marismas** → Artículo #9
6. **Muelle del Tinto / Estructuras / Río** → Artículo #10
7. **Ayamonte / Guadiana / Puente** → Artículo #11
8. **Aracena / Gruta / Casco urbano** → Opcional para #12

### Solución propuesta

**FASE 1 — Reasignar existentes (ya)
- Art #3 (Agenda): plaza-monjas ✅
- Art #5 (Gamba): coquinas ✅
- Art #6 (Choco): choco-frito ✅
- Art #7 (Alojamiento capital): plaza-monjas ✅
- Art #12 (Aracena): corte-jamon ✅

**FASE 2 — Buscar en Wikimedia Commons (prioridad)
- Puerto/Huelva → #1
- Teatro/Cine → #2
- Sierra/Naturaleza → #8
- Rocío/Ermita → #9
- Muelle Tinto → #10
- Ayamonte → #11

**FASE 3 — Fallbacks creativos
- Art #4 (Fiesta tinajas): usar plaza-monjas temporalmente (evento social)
- Art #8 (Sierra): usar plaza-monjas temporalmente (fallback general)

### Archivos a modificar
1. `src/content/articles.ts` — Actualizar campo `image` en cada artículo
2. `src/lib/api.ts` — Mantener fallback por categoría como seguridad
3. `scripts/download-images-simple.mjs` — Añadir búsquedas para imágenes prioritarias
