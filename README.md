# HUELVA.IS - Documentación del Proyecto

**Última actualización:** 23 de febrero de 2026  
**Estado:** Web viva con 50 artículos y 43 imágenes

---

## 📊 Estadísticas

| Métrica | Valor |
|---------|-------|
| **Artículos publicados** | 50 |
| **Imágenes en banco** | 43 |
| **Categorías** | 4 (Guías, Gastronomía, Eventos, Alojamiento) |
| **Autores** | Lucía Colombina, Rocío Limón, Antonio Torre |

---

## 📁 Estructura de Contenido

### Artículos por Categoría

**Guías Locales (31 artículos)**
- Plaza de las Monjas, Puerto de Huelva, Miradores
- Aracena, Muelle del Tinto, Punta Umbría
- Reina Victoria, Ayamonte, El Rocío, El Portil
- La Rábida, Monumento a Colón, Doñana
- Museo de Huelva, Minas de Riotinto, Palos
- Estación de tren, Puente Internacional
- Parque Moret, Baluarte Concepción
- Sierra de Huelva, Huelva en 48 horas
- Turista vs Choquero, Hablar como onubense

**Gastronomía (13 artículos)**
- Choco frito (2 artículos), Coquinas (2 artículos)
- Gamba blanca (eliminado por imagen incorrecta)
- Café en Huelva, Desayuno en Huelva
- Jamón ibérico DOP, Fresas de Huelva
- Naranjas del Condado, Gastronomía típica (10 platos)
- Choco frito: la biblia, Coquinas: guía del marisco

**Eventos (5 artículos)**
- Agenda semanal, Feria de las Colombinas
- Cruz de Mayo, Noche en Huelva

**Alojamiento (1 artículo)**
- Dónde dormir en Huelva capital

---

## 🖼️ Banco de Imágenes

### Imágenes Principales (Alta Resolución)
| Imagen | Tamaño | Uso |
|--------|--------|-----|
| huelva-puerto-grande.jpg | 14MB | Puerto industrial |
| huelva-plaza-las-monjas.jpg | 5.8MB | Plaza central |
| pinar-huelva.jpg | 9.3MB | Naturaleza costa |
| baluarte-huelva.jpg | 8.4MB | Fortaleza histórica |
| monasterio-rabida.jpg | 5.9MB | La Rábida |
| huelva-aerea.jpg | 3.4MB | Vistas aéreas |
| feria-huelva.jpg | 3.8MB | Feria Colombinas |
| cristobal-colon-huelva.jpg | 3.9MB | Monumento Colón |
| donana-huelva.jpg | 2.2MB | Parque Nacional |
| matalascanas-playa.jpg | 2.8MB | Playa Matalascañas |
| la-antilla-playa.jpg | 2.5MB | Playa La Antilla |
| virgen-rocio.jpg | 2.3MB | Virgen del Rocío |

### Imágenes de Soporte
- choco-frito-tapa.jpg, choco-frito-hero.jpg
- coquinas-huelva.jpg, corte-jamon-iberico.jpg
- cafe-vaso-huelva.jpg, aracena-pueblo.jpg
- huelva-muelle-tinto.jpg, el-portil.jpg
- ayamonte-huelva.jpg, el-rocio.jpg
- museo-huelva.jpg, iglesia-concepcion-huelva.jpg
- tren-minero-riotinto.jpg, fresas-huelva.jpg
- naranjas-huelva.png, casa-pinzon.jpg
- fuente-santa.png, estacion-tren-huelva.jpg
- puente-internacional.jpg, parque-moret.jpg
- costa-huelva.jpg, moguer-huelva.jpg
- quercus.jpg, cruz-mayo-huelva.png

---

## 🗞️ Noticias Diarias (/noticias)

**Flujo automatizado de noticias locales con contenido original.**

### Cómo funciona
- Scrapea 5 fuentes locales (Huelva Información, Europa Press, etc.)
- IA reescribe la noticia más relevante con copy propio (400-600 palabras)
- Publicación automática todos los días a las 7:30 AM

### Estructura del artículo generado
1. **Lead impactante** - Qué pasó, en Huelva, ahora
2. **Contexto** - Por qué importa para el lector local
3. **Detalles** - Quién, cuándo, dónde, con datos
4. **Implicaciones** - Qué puede pasar ahora

### Documentación completa
Ver: [`docs/NEWS_WORKFLOW.md`](docs/NEWS_WORKFLOW.md)

### Ejecución manual
```bash
# Solo generar noticia
node scripts/scrape-and-rewrite.mjs

# Flujo completo (commit + push)
bash scripts/news-daily-publish.sh
```

---

## 🔧 Scripts Disponibles

### Descarga de Imágenes
- `download-commons-hd.sh` - Descarga alta resolución
- `download-more-images.sh` - Búsqueda específica
- `download-more-v2.sh` a `v11.sh` - Búsquedas iterativas

### Validación
- `validate-content.mjs` - Valida artículos antes del build

---

## 📝 Guía de Estilo

### Tono de Voz
- **Directo:** Sin rodeos, información clara
- **Local:** ADN choquero cuando procede
- **Auténtico:** Sin tópicos turísticos vacíos

### Estructura de Artículo
1. Hook inicial con personalidad
2. Qué es / Historia breve
3. Qué ver / hacer (lista)
4. Cómo llegar / práctico
5. Blockquote final memorable

### Imágenes
- Todas las imágenes son de Wikimedia Commons (licencia libre)
- Mínimo 1000px de ancho preferible
- Nunca imágenes genéricas de stock

---

## 🚀 Próximos Pasos

### Contenido Pendiente
- [ ] Artículo Mercado del Carmen (cuando tengamos foto propia)
- [ ] Más pueblos de la Sierra (Jabugo, Cortegana)
- [ ] Playas específicas (Matalascañas detallado)
- [ ] Fiestas locales (Carnaval, Semana Santa)
- [ ] Rutas de senderismo

### Mejoras Técnicas
- [ ] Interlinking entre artículos
- [ ] Meta tags SEO optimizados
- [ ] Sitemap XML
- [ ] Schema.org para artículos

### Imágenes Necesarias
- Platos específicos de gastronomía
- Fauna de las marismas (flamencos)
- Romería del Rocío en acción
- Pueblos pequeños de la Sierra

---

## 📞 Notas

**Autor:** Juanlu (juanlure)  
**Repo:** github.com/juanlure/huelva-is  
**Deploy:** Vercel (auto desde main)
