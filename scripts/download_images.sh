#!/bin/bash

mkdir -p public/images/guides

echo "Downloading images..."
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
REF="https://commons.wikimedia.org/"
BASE="https://commons.wikimedia.org/wiki/Special:FilePath"

download() {
    curl -A "$UA" -e "$REF" -L -o "public/images/guides/$1" "$2"
}

# Survival Guide
download "huelva-plaza-las-monjas.jpg" "$BASE/Huelva_-_Plaza_de_las_monjas.jpg"
download "huelva-estacion-sevilla.jpg" "$BASE/Huelva_-_Estaci%C3%B3n_de_Sevilla_01.jpg"
download "gambas-blancas-huelva.jpg" "$BASE/Gambas_blancas_de_Huelva.jpg"
download "choquitos-fritos.jpg" "$BASE/Choquitos_fritos.jpg"
download "muelle-tinto-huelva.jpg" "$BASE/Muelle_del_Tinto,_Huelva,_Espa%C3%B1a,_2015-12-09,_DD_26.JPG"
download "barrio-reina-victoria.jpg" "$BASE/Barrio_Reina_Victoria_Huelva.jpg"

# Choco Translator
download "choco-frito-tapa.jpg" "$BASE/Choco_frito.jpg"
download "coquinas-huelva.jpg" "$BASE/Coquinas.jpg"

# Coffee Translator
download "huelva-estacion-sevilla-hero.jpg" "$BASE/Huelva_-_Estaci%C3%B3n_de_Sevilla_01.jpg"
download "cafe-vaso-huelva.jpg" "$BASE/A_small_cup_of_coffee.JPG"

# Jamon Translator
download "corte-jamon-iberico.jpg" "$BASE/Corte_de_jam%C3%B3n_ib%C3%A9rico.jpg"
download "jamon-iberico-bellota.jpg" "$BASE/Jam%C3%B3n_ib%C3%A9rico_de_bellota_100%25_%282015241812814%29.jpg"
download "jamones-secadero.jpg" "$BASE/Jamones_en_secadero.jpg"

# Neighborhoods Guide
download "ayuntamiento-huelva.jpg" "$BASE/Ayuntamiento_de_Huelva.jpg"
download "barrio-reina-victoria-hero.jpg" "$BASE/Barrio_Obrero_Reina_Victoria_Huelva.jpg"
download "muelle-tinto-riotinto.jpg" "$BASE/Muelle_de_mineral_de_la_compa%C3%B1%C3%ADa_Riotinto%2C_Huelva%2C_Espa%C3%B1a%2C_2015-12-08%2C_DD_26.JPG"
download "iglesia-rocio-huelva.jpg" "$BASE/Iglesia_del_Roc%C3%ADo_%28Huelva%29_02.jpg"
download "santuario-cinta-huelva.jpg" "$BASE/Santuario_de_La_Cinta_%28Huelva%29.jpg"

# Weekend Itinerary
download "monumento-colon-monjas.jpg" "$BASE/Monumento_Cristobal_Col%C3%B3n_Plaza_Monjas_Huelva.jpg"
download "muelle-tinto-sunset.jpg" "$BASE/Muelle-del-Tinto.jpg"
download "marismas-odiel.jpg" "$BASE/Marismas_del_Odiel.jpg"
download "jamon-jabugo-fino.png" "$BASE/Jam%C3%B3n_de_Jabugo_y_Fino_Quinta.png"
download "playa-punta-umbria.jpg" "$BASE/Playa_de_Punta_Umbria_%28Huelva%29.jpg"

# Pages
download "calle-huelva-centro.jpg" "$BASE/Calle_Concepci%C3%B3n_%28Huelva%29.jpg"
download "choco-frito-hero.jpg" "$BASE/Choco_frito.jpg"

echo "Download complete."
ls -l public/images/guides
