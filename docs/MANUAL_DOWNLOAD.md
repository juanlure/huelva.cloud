# Descarga Manual de Imágenes — Wikimedia Commons

Las imágenes automáticas no funcionaron porque los nombres de archivo son diferentes.
Aquí tienes el proceso manual paso a paso.

## Pasos para cada imagen

### 1. Puerto de Huelva → `huelva-puerto.jpg`

1. Ve a: https://commons.wikimedia.org/wiki/Special:Search?search=Puerto+de+Huelva
2. Encuentra una imagen del puerto (grúas, muelles, barcos)
3. Haz clic en la imagen
4. Copia el nombre del archivo (ej: `Puerto_de_Huelva_2023.jpg`)
5. Descarga con:
```bash
curl -L -o public/images/guides/huelva-puerto.jpg "https://commons.wikimedia.org/wiki/Special:FilePath/Puerto_de_Huelva_2023.jpg"
```

### 2. Gran Teatro → `huelva-gran-teatro.jpg`

1. Busca: https://commons.wikimedia.org/wiki/Special:Search?search=Gran+Teatro+Huelva
2. Selecciona imagen del teatro por fuera o interior
3. Descarga:
```bash
curl -L -o public/images/guides/huelva-gran-teatro.jpg "https://commons.wikimedia.org/wiki/Special:FilePath/NOMBRE_EXACTO.jpg"
```

### 3. Fiesta tradicional → `fiesta-tradicional-huelva.jpg`

1. Busca: https://commons.wikimedia.org/wiki/Special:Search?search=Romeria+Huelva+Colombinas
2. Imágenes de eventos, romerías, fiestas populares
3. Descarga:
```bash
curl -L -o public/images/guides/fiesta-tradicional-huelva.jpg "https://commons.wikimedia.org/wiki/Special:FilePath/NOMBRE_EXACTO.jpg"
```

### 4. Sierra de Aracena → `sierra-aracena.jpg`

1. Busca: https://commons.wikimedia.org/wiki/Special:Search?search=Sierra+de+Aracena+paisaje
2. Paisajes de montaña, bosques, naturaleza
3. Descarga:
```bash
curl -L -o public/images/guides/sierra-aracena.jpg "https://commons.wikimedia.org/wiki/Special:FilePath/NOMBRE_EXACTO.jpg"
```

### 5. Ermita del Rocío → `ermita-rocio.jpg`

1. Busca: https://commons.wikimedia.org/wiki/Special:Search?search=Ermita+del+Rocio
2. Imágenes de la ermita, la aldea, el entorno
3. Descarga:
```bash
curl -L -o public/images/guides/ermita-rocio.jpg "https://commons.wikimedia.org/wiki/Special:FilePath/NOMBRE_EXACTO.jpg"
```

### 6. Muelle del Tinto → `muelle-tinto.jpg`

1. Busca: https://commons.wikimedia.org/wiki/Special:Search?search=Muelle+del+Tinto+Huelva
2. Estructuras metálicas, puente, río Odiel
3. Descarga:
```bash
curl -L -o public/images/guides/muelle-tinto.jpg "https://commons.wikimedia.org/wiki/Special:FilePath/NOMBRE_EXACTO.jpg"
```

### 7. Ayamonte → `ayamonte-guadiana.jpg`

1. Busca: https://commons.wikimedia.org/wiki/Special:Search?search=Ayamonte+Guadiana
2. Vistas del río, puente internacional, casco antiguo
3. Descarga:
```bash
curl -L -o public/images/guides/ayamonte-guadiana.jpg "https://commons.wikimedia.org/wiki/Special:FilePath/NOMBRE_EXACTO.jpg"
```

## Verificar descargas

Después de descargar, verifica que sean imágenes válidas:
```bash
file public/images/guides/*.jpg
```

Debe decir `JPEG image data`, NO `HTML document`.

## Si no encuentras en Commons

Alternativas:
1. **Fotos propias**: Sube tus propias fotos de Huelva
2. **Unsplash**: https://unsplash.com (gratis, sin atribución)
3. **Pixabay**: https://pixabay.com (gratis)
4. **Pexels**: https://pexels.com (gratis)

## Lista de verificación

- [ ] `huelva-puerto.jpg` — Puerto de Huelva
- [ ] `huelva-gran-teatro.jpg` — Gran Teatro
- [ ] `fiesta-tradicional-huelva.jpg` — Evento tradicional
- [ ] `sierra-aracena.jpg` — Sierra de Aracena
- [ ] `ermita-rocio.jpg` — Ermita del Rocío
- [ ] `muelle-tinto.jpg` — Muelle del Tinto
- [ ] `ayamonte-guadiana.jpg` — Ayamonte

## Después de descargar

```bash
# Verificar
npm run prebuild

# Build
npm run build

# Si todo OK, commit y push
git add public/images/guides/
git commit -m "media: add topic-specific images for all articles"
git push origin main
```
