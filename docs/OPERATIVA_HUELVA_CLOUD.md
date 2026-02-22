# Operativa Huelva.cloud — Plan Maestro (Referencia #1 en Huelva y Provincia)

> Voz: onubense cuando encaje. Seriedad total en noticias sensibles.
> Regla visual: fotos 100% Huelva/provincia (sin imágenes genéricas de otras ciudades).

## Estado actual (2026-02-22)
- ✅ Noticias eliminadas de la base (`category=Noticias`): **0 restantes**.
- 🔎 Contenido restante:
  - Eventos: 2 (1 publicado)
  - Guías: 3 (0 publicadas)
- ⚠️ Sitio ahora sin bloque de actualidad (hay que repoblar con control editorial).

---

## Objetivo
Convertir Huelva.cloud en **la web de referencia de Huelva** en 90 días:
- Actualidad local fiable
- Agenda al día
- Guías interactivas diferenciales
- Cobertura capital + provincia

---

## Estructura editorial definitiva
1. Noticias
2. Agenda y Eventos
3. Comer y Beber
4. Playas y Naturaleza
5. Barrios de Huelva
6. Pueblos de la provincia
7. Cultura e Historia
8. Trabajo y Empresa local
9. Guías interactivas

---

## Normas de contenido (inmutables)
1. **Fotos**: solo Huelva/provincia verificable.
2. **Gastronomía**: terminología onubense correcta (choco, coquinas, gamba blanca, etc.).
3. **Turismo**: nada de copiar narrativa de Sevilla/Málaga/Cádiz.
4. **Fuentes**: siempre enlazar fuente primaria cuando exista.
5. **Noticias serias**: tono neutro, preciso, sin bromas.
6. **No relleno**: utilidad real por pieza.
7. **Autoría EEAT**: toda publicación lleva autor ficticio estable con perfil experto (ver `docs/AUTORES_EEAT_HUELVA_CLOUD.md`).

---

## Cadencia diaria (obligatoria)
- **2-3 publicaciones al día**
  - 1 x actualidad local
  - 1 x agenda/ocio/comer/rutas
  - 0-1 x servicio útil (tráfico, avisos, trámites, transporte)

### Ventanas de actualización
- 08:00 — repaso de mañana
- 14:00 — ajuste mediodía
- 20:00 — cierre y agenda próxima

### SLA de eventos
- Eventos de hoy/finde siempre actualizados.
- Si cambia horario/cancelación: corregir en la siguiente ventana (<6h).

---

## Rotación semanal por categoría
- Lunes: Noticias + Barrios
- Martes: Agenda + Comer
- Miércoles: Pueblos + Rutas
- Jueves: Cultura + Empresa local
- Viernes: Agenda finde + ranking local
- Sábado: Planes + guía interactiva
- Domingo: Agenda semanal + pieza evergreen útil

---

## Fuentes (ampliadas)

## A) Institucionales Huelva
- Ayuntamiento de Huelva
- Diputación de Huelva
- Puerto de Huelva
- Universidad de Huelva
- Subdelegación del Gobierno en Huelva
- Junta de Andalucía (delegaciones en Huelva)
- AEMET (alertas/meteo)

## B) Ayuntamientos provincia (prioritarios)
- Almonte, Ayamonte, Isla Cristina, Lepe, Cartaya, Punta Umbría
- Moguer, Palos de la Frontera, Bollullos Par del Condado, Valverde del Camino
- Aracena, La Palma del Condado, Aljaraque, San Juan del Puerto, Gibraleón
- Trigueros, Niebla, Bonares, Rociana del Condado, Villablanca

## C) Agenda / cultura / deporte local
- Programaciones municipales
- teatros/auditorios/casas de cultura
- clubes deportivos y federaciones locales
- peñas/festivales/eventos gastronómicos

## D) Economía y empleo
- Cámara de Comercio de Huelva
- asociaciones empresariales locales
- boletines públicos de empleo/contratación local

## E) Medios locales (solo señal)
- Usar para detectar temas.
- Reescribir con enfoque propio + fuente primaria.

---

## Flujo técnico de publicación
1. Ingesta de fuentes (RSS cuando exista)
2. Scraping con Playwright en fuentes sin RSS
3. Deduplicación por URL + hash de título
4. Clasificación automática por categoría + municipio
5. Revisión editorial humana/semiautomática
6. Publicación + interlinking a guía/categoría relacionada
7. Control de frescura por sección

---

## SEO + GEO (prioridad alta)
- Slugs locales claros (`/agenda/hoy-huelva`, `/pueblos/ayamonte`, etc.)
- Schema: `NewsArticle`, `Event`, `Breadcrumb`, `FAQ`
- Enlazado interno fuerte entre noticia ↔ guía ↔ barrio/pueblo
- Bloque fijo en artículos: “Qué significa para Huelva”
- Sitemap actualizado diario

---

## Checklist diario (Navaja Suiza)
- [ ] Revisar fuentes de mañana (08:00)
- [ ] Publicar 1 noticia local útil
- [ ] Actualizar agenda hoy/finde
- [ ] Publicar 1 contenido de rotación (comer/rutas/barrios/pueblos)
- [ ] Revisión mediodía (14:00)
- [ ] Revisión tarde (20:00)
- [ ] Comprobar que todas las secciones tienen contenido fresco
- [ ] Verificar imágenes 100% Huelva
- [ ] Actualizar sitemap/indexación
- [ ] Reporte breve a Juanlu (hecho / pendiente / riesgo)

---

## Checklist semanal
- [ ] Auditoría de secciones desactualizadas
- [ ] Publicar/actualizar 1 guía interactiva
- [ ] Revisar rendimiento SEO (GSC: impresiones/CTR/queries)
- [ ] Limpiar contenido débil o duplicado
- [ ] Ajustar rotación editorial según demanda real
