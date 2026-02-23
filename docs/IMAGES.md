# Sistema de Imágenes de Huelva.is

## Problema anterior
El sistema anterior descargaba imágenes de Wikimedia Commons pero no validaba el contenido. Cuando una imagen no existía o había un error, se guardaba HTML en lugar de la imagen, causando:
- Imágenes rotas en la web
- Duplicados visuales
- Validación fallida en build

## Solución actual

### Scripts disponibles

#### 1. `download-images-simple.mjs` (RECOMENDADO)
Descargador robusto con validación de formato:
- Verifica magic bytes (JPEG/PNG) antes de guardar
- Detecta si recibe HTML en lugar de imagen
- Sigue redirecciones
- Tiene nombres alternativos para cada imagen
- Tamaño mínimo: 1KB

Uso:
```bash
npm run download-images:simple
# o
node scripts/download-images-simple.mjs
```

#### 2. `download-images.mjs` (AVANZADO)
Buscador por categorías usando API de Commons:
- Busca imágenes por términos
- Filtra por tamaño mínimo
- Organiza por categorías
- Requiere dependencia `file-type`

Uso:
```bash
npm run download-images
# o
node scripts/download-images.mjs
```

### Imágenes core actuales (6 válidas)
1. `huelva-plaza-las-monjas.jpg` - Plaza principal (fallback general)
2. `coquinas-huelva.jpg` - Gastronomía
3. `choco-frito-tapa.jpg` / `choco-frito-hero.jpg` - Choco
4. `cafe-vaso-huelva.jpg` - Café
5. `corte-jamon-iberico.jpg` - Jamón

### Lista completa objetivo (24 imágenes)
Ver `scripts/download-images-simple.mjs` → constante `CORE_IMAGES`

## Validación
El build incluye validación automática (`prebuild`):
```bash
npm run build
# Ejecuta automáticamente: node scripts/validate-content.mjs
```

Valida:
- ✅ Todas las imágenes referenciadas existen
- ✅ Son archivos binarios (no HTML)
- ✅ Formatos válidos (JPEG/PNG)

## Fallback por categoría
En `src/lib/api.ts`, si una imagen no existe o es remota, se usa fallback local:
- Noticias/Eventos: `huelva-plaza-las-monjas.jpg`
- Gastronomía: `coquinas-huelva.jpg`
- Alojamiento/Guías: `huelva-plaza-las-monjas.jpg`

## Workflow recomendado

1. **Limpiar imágenes corruptas** (si existen):
   ```bash
   rm public/images/guides/*.jpg
   ```

2. **Descargar imágenes válidas**:
   ```bash
   npm run download-images:simple
   ```

3. **Verificar build**:
   ```bash
   npm run build
   ```

4. **Si todo OK, commit**:
   ```bash
   git add public/images/guides/
   git commit -m "media: refresh image bank with validated assets"
   ```

## Troubleshooting

### "Received HTML instead of image"
El archivo en Wikimedia Commons no existe o el nombre es incorrecto. Revisar en:
https://commons.wikimedia.org/wiki/Special:Search

### "File too small"
La imagen descargada es menor a 1KB, probablemente un placeholder o error.

### "Unknown file format"
No es JPEG ni PNG. Comprobar manualmente la URL.

### Build falla con "image file not found"
Ejecutar:
```bash
node scripts/download-images-simple.mjs
npm run build
```

## Añadir nuevas imágenes

1. Buscar en Wikimedia Commons: https://commons.wikimedia.org
2. Copiar el nombre exacto del archivo (incluyendo espacios→underscores)
3. Añadir a `CORE_IMAGES` en `download-images-simple.mjs`
4. Ejecutar script
5. Verificar en build
