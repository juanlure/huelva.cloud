# Imágenes Pendientes — URLs de Wikimedia Commons

Estas son las imágenes que necesitas descargar manualmente si el script automático falla:

## 1. huelva-puerto.jpg (Puerto de Huelva)
Buscar en: https://commons.wikimedia.org/wiki/Special:Search?search=Puerto+de+Huelva
Posibles nombres de archivo:
- Puerto_de_Huelva.jpg
- Puerto_de_Huelva_01.jpg
- Port_of_Huelva.jpg

Descargar con:
```bash
curl -L -o public/images/guides/huelva-puerto.jpg "https://commons.wikimedia.org/wiki/Special:FilePath/Puerto_de_Huelva.jpg"
```

## 2. huelva-gran-teatro.jpg (Gran Teatro)
Buscar en: https://commons.wikimedia.org/wiki/Special:Search?search=Gran+Teatro+Huelva
Posibles nombres:
- Gran_Teatro_de_Huelva.jpg
- Gran_Teatro_Huelva.jpg

## 3. fiesta-tradicional-huelva.jpg (Evento tradicional)
Buscar en: https://commons.wikimedia.org/wiki/Special:Search?search=Romeria+Huelva
Posibles nombres:
- Romeria_de_Huelva.jpg
- Colombinas_Huelva.jpg
- Fiesta_tradicional_Huelva.jpg

## 4. sierra-aracena.jpg (Sierra de Aracena)
Buscar en: https://commons.wikimedia.org/wiki/Special:Search?search=Sierra+Aracena
Posibles nombres:
- Sierra_de_Aracena.jpg
- Sierra_de_Aracena_y_Picos_de_Aroche.jpg
- Parque_natural_Sierra_de_Aracena.jpg

## 5. ermita-rocio.jpg (El Rocío)
Buscar en: https://commons.wikimedia.org/wiki/Special:Search?search=Ermita+Rocio
Posibles nombres:
- Ermita_del_Rocio.jpg
- Ermita_de_El_Rocio.jpg
- Santuario_de_la_Virgen_del_Rocio.jpg
- Aldea_del_Rocio.jpg

## 6. muelle-tinto.jpg (Muelle del Tinto)
Buscar en: https://commons.wikimedia.org/wiki/Special:Search?search=Muelle+Tinto+Huelva
Posibles nombres:
- Muelle_del_Tinto.jpg
- Muelle_del_Tinto_Huelva.jpg
- Muelle_Tinto.jpg

## 7. ayamonte-guadiana.jpg (Ayamonte)
Buscar en: https://commons.wikimedia.org/wiki/Special:Search?search=Ayamonte
Posibles nombres:
- Ayamonte.jpg
- Puente_internacional_del_Guadiana.jpg
- Guadiana_Ayamonte.jpg

## Verificación
Después de descargar, verifica que son imágenes válidas:
```bash
file public/images/guides/*.jpg
```

Debe decir "JPEG image data", NUNCA "HTML document".

## Comando rápido para todas
```bash
npm run download:missing
# o
node scripts/download-missing-images.mjs
```
