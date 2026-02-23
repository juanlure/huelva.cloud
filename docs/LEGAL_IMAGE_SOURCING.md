# Sistema Legal de Imágenes para Huelva.is

## Problema
- Wikimedia Commons: bloqueado / nombres inconsistentes
- Necesitamos: 7 imágenes temáticas específicas
- Requisito: 100% legal, con licencia clara

## Opciones Legales Recomendadas

### 1. Unsplash (GRATIS, sin atribución requerida)
- **Licencia:** Unsplash License (gratis para cualquier uso, sin atribución)
- **Pros:** Alta calidad, fácil descarga
- **Cons:** Menos específico de Huelva
- **URL:** https://unsplash.com

### 2. Pexels (GRATIS, sin atribución)
- **Licencia:** Pexels License (gratis, sin atribución)
- **Pros:** Buena selección de España/paisajes
- **URL:** https://pexels.com

### 3. Pixabay (GRATIS, sin atribución)
- **Licencia:** Pixabay License (gratis, sin atribución)
- **Pros:** Muchas fotos de Andalucía
- **URL:** https://pixabay.com

### 4. Flickr Creative Commons
- **Licencia:** CC-BY (requiere atribución)
- **Pros:** Fotos específicas de Huelva de usuarios locales
- **Cons:** Requiere atribución visible en web
- **URL:** https://flickr.com/creativecommons

### 5. Fotos Propias (MEJOR OPCIÓN)
- **Licencia:** Tú la decides
- **Pros:** Únicas, auténticas, sin problemas legales
- **Cons:** Requiere tiempo o contratar fotógrafo

---

## Búsquedas Sugeridas por Imagen

### huelva-puerto.jpg
**Unsplash:** "industrial port", "shipping port", "cargo ship"
**Pexels:** "harbor", "port industrial"
**Pixabay:** "harbor", "container ship"

### huelva-gran-teatro.jpg
**Unsplash:** "theater building", "theatre facade", "historic theater"
**Pexels:** "theater", "theatre building"
**Pixabay:** "theater", "theatre"

### fiesta-tradicional-huelva.jpg
**Unsplash:** "spanish festival", "andalusia festival", "traditional festival"
**Pexels:** "spanish fiesta", "festival spain"
**Pixabay:** "spanish festival", "romeria"

### sierra-aracena.jpg
**Unsplash:** "mountain landscape", "forest mountain", "sierra spain"
**Pexels:** "mountain forest", "sierra"
**Pixabay:** "mountain landscape", "forest spain"

### ermita-rocio.jpg
**Unsplash:** "spanish church", "white church", "sanctuary"
**Pexels:** "church spain", "hermitage"
**Pixabay:** "church spain", "sanctuary"

### muelle-tinto.jpg
**Unsplash:** "industrial bridge", "train bridge", "rusty bridge"
**Pexels:** "industrial structure", "iron bridge"
**Pixabay:** "industrial bridge", "old bridge"

### ayamonte-guadiana.jpg
**Unsplash:** "river bridge", "border bridge", "guadiana"
**Pexels:** "international bridge", "river portugal"
**Pixabay:** "guadiana", "border bridge"

---

## Script de Descarga Legal

Para Unsplash (API gratuita):
```bash
# Registrate en unsplash.com/developers para API key
# Luego usa la API para buscar y descargar
```

Para uso manual:
1. Busca en Unsplash/Pexels/Pixabay
2. Descarga la imagen
3. Renómbrala al nombre requerido
4. Colócala en `public/images/guides/`

---

## Metadatos Recomendados

Para cada imagen, guarda en `docs/image-sources.md`:
```
huelva-puerto.jpg
- Fuente: Unsplash
- Fotógrafo: [Nombre]
- URL: https://unsplash.com/photos/...
- Licencia: Unsplash License
- Fecha descarga: 2026-02-23
```

---

## Plan de Acción Inmediato

### Opción A: Rápida (stock photos)
1. Ir a Unsplash/Pexels
2. Buscar términos genéricos similares
3. Descargar 7 imágenes
4. Renombrar según especificaciones
5. Listo en 30 minutos

### Opción B: Específica (Flickr CC)
1. Buscar en Flickr fotos específicas de Huelva
2. Filtrar por Creative Commons
3. Descargar con atribución
4. Añadir crédito en página legal o pie de foto

### Opción C: Profesional (fotógrafo)
1. Contratar fotógrafo local en Huelva
2. Sesión de 1 día en los 7 lugares
3. Fotos únicas y exclusivas
4. Coste: 300-600€ estimado

---

## Notas Legales Importantes

⚠️ **NO USAR:**
- Google Imágenes (sin verificar licencia)
- Instagram (copyright del autor)
- Web de terceros (sin permiso)
- IA generativa (problemas de copyright en algunos países)

✅ **SÍ USAR:**
- Unsplash License
- Pexels License  
- Pixabay License
- CC0 (dominio público)
- CC-BY (con atribución)
- Fotos propias

---

## Verificación Final

Antes de subir:
```bash
# Verificar que todas las imágenes existen
ls -la public/images/guides/

# Verificar que son archivos válidos
file public/images/guides/*.jpg

# Build
npm run build

# Todo OK → commit
git add public/images/guides/
git commit -m "media: add legally sourced images for all articles"
```
