export interface LocalArticle {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  publishedAt: string;
  author: string;
  isAi: boolean;
}

/**
 * Fuente única editorial. Categorías válidas (mapeadas en constants.ts):
 *   'Noticias'       → /noticias
 *   'Eventos'        → /eventos
 *   'Gastronomía'    → /comer
 *   'Guías Locales'  → /guias
 *   'Alojamiento'    → /alojarse
 */
export const LOCAL_ARTICLES: LocalArticle[] = [

  // ── NOTICIAS ─────────────────────────────────────────────────────────────
  {
    slug: 'semana-santa-huelva-2026-novedades-itinerarios',
    title: 'Semana Santa 2026 en Huelva: itinerarios confirmados y novedades cofrades',
    excerpt: 'La Junta de Hermandades ha cerrado los horarios para el próximo ciclo procesional. Repasamos los cambios de itinerario, las novedades de las cofradías y lo que hay que saber antes de colocarse en la calle.',
    category: 'Noticias',
    image: '/images/guides/semana-santa-huelva.jpg',
    publishedAt: '2026-02-22T21:30:00Z',
    author: 'Manuel V. Cinta',
    isAi: true,
    content: `
      <p>La Semana Santa de Huelva tiene su propio carácter: procesiones que se alargan por el centro histórico, cofradías con siglos de historia y un ambiente que mezcla devoción con identidad onubense sin complejos. Este año hay cambios que conviene conocer antes de planificar la semana.</p>

      <h2>Cambios de itinerario confirmados</h2>
      <p>Varias hermandades han modificado el recorrido habitual por obras en el entorno de la Catedral. Las cofradías que salen del centro histórico afectadas deberán alargar el trayecto por la calle Concepción. La Junta de Hermandades ha confirmado los nuevos planos pero recomienda consultar los boletines oficiales de cada hermandad antes del Domingo de Ramos.</p>
      <p>El punto de acceso principal para los palcos sigue siendo la carrera oficial en Gran Vía, aunque el Ayuntamiento ha añadido pantallas en la Plaza de las Monjas para facilitar la visión a quienes no logren sitio en primera línea.</p>

      <h2>Novedades por hermandad</h2>
      <ul>
        <li><strong>La Borriquita</strong>: incorpora nuevo paso de palio tras la restauración aprobada el pasado octubre.</li>
        <li><strong>El Nazareno</strong>: cambia el horario de salida media hora antes por previsión de afluencia.</li>
        <li><strong>La Macarena</strong>: estrena bordados en el manto de la Virgen, trabajo de tres años de un taller sevillano contratado por la hermandad.</li>
      </ul>

      <h2>Acceso y transporte</h2>
      <p>El plan de tráfico municipal prevé cortar el centro desde las 16:00 los días de procesión. El parking del Puerto estará habilitado como zona de aparcamiento alternativo con lanzadera gratuita hasta la carrera oficial.</p>
      <p>Para quienes vengan de la provincia: los autobuses interurbanos de Damas amplían frecuencia desde Huelva capital hacia Palos, Moguer y Lepe en los días de mayor afluencia.</p>

      <h2>Lo que hay que saber si es tu primera vez</h2>
      <p>Llegada con 45 minutos de antelación mínima si quieres sitio de pie decente en la carrera oficial. Los palcos se agotan semanas antes. Ropa abrigada para las noches del Lunes y Martes Santo, donde las temperaturas bajan. Y paciencia: los tiempos son orientativos, no horarios de tren.</p>
    `
  },
  {
    slug: 'puerto-huelva-expansion-nuevas-terminales-2026',
    title: 'El Puerto de Huelva activa el plan de expansión que cambiará la logística de la provincia',
    excerpt: 'La Autoridad Portuaria ha confirmado la licitación de las obras para la nueva terminal de contenedores. El proyecto tiene inversión comprometida y podría generar más de 400 empleos directos en la zona.',
    category: 'Noticias',
    image: '/images/guides/muelle-tinto-sunset.jpg',
    publishedAt: '2026-02-22T20:45:00Z',
    author: 'Manuel V. Cinta',
    isAi: true,
    content: `
      <p>El Puerto de Huelva lleva años siendo el pulmón económico de la provincia, aunque con una infraestructura que empieza a quedar pequeña para los volúmenes actuales. El plan de expansión que se acaba de licitar cambia eso con una inversión que no tiene precedente en la historia del Puerto.</p>

      <h2>Qué está en juego</h2>
      <p>La nueva terminal de contenedores proyectada en la zona norte del muelle ampliaría la capacidad operativa en un 35% respecto a la actual. La cifra de inversión comprometida supera los 180 millones de euros, con financiación mixta entre fondos europeos y capital privado de los operadores concesionarios.</p>
      <p>El proceso de licitación está abierto hasta finales de marzo. La Autoridad Portuaria estima que las obras podrían empezar en el tercer trimestre del año si no hay recursos contra el concurso.</p>

      <h2>Impacto en empleo</h2>
      <p>El Puerto estima 420 empleos directos nuevos en la fase de operación, sumando los puestos en la propia terminal, los servicios logísticos auxiliares y el mantenimiento de infraestructura. Si se añaden los indirectos en transporte y almacenaje, el impacto potencial en la provincia supera el millar de puestos.</p>
      <p>Los sindicatos han pedido que los convenios laborales de la nueva concesión incluyan cláusulas de preferencia para trabajadores de la provincia.</p>

      <h2>Qué cambia para los onubenses</h2>
      <p>A corto plazo: nada visible. Las obras afectarán al tráfico de vehículos pesados por la rotonda del Puerto, especialmente en el acceso por la Avenida Francisco Montenegro. El Ayuntamiento ha pedido un plan de tráfico detallado antes del inicio de las obras.</p>
      <p>A medio plazo, si el proyecto sale adelante en plazos, Huelva podría convertirse en alternativa logística seria para empresas que actualmente usan los puertos de Sevilla o Algeciras para movimiento de mercancía procedente de Extremadura y el Alentejo portugués.</p>
    `
  },

  // ── EVENTOS ──────────────────────────────────────────────────────────────
  {
    slug: 'agenda-huelva-esta-semana-feb-2026',
    title: 'Agenda Huelva: los planes de la semana que merece la pena apuntar',
    excerpt: 'Cultura, música, mercados y actividades en Huelva capital y provincia para los próximos días. Selección curada sin relleno.',
    category: 'Eventos',
    image: '/images/guides/monumento-colon-monjas.jpg',
    publishedAt: '2026-02-22T20:00:00Z',
    author: 'Lucía Colombina',
    isAi: true,
    content: `
      <p>La semana en Huelva tiene más movimiento del que parece si sabes dónde mirar. Esta selección no incluye todo lo que hay: incluye lo que merece la pena según criterio propio.</p>

      <h2>Cultura y exposiciones</h2>
      <p><strong>Museo de Huelva</strong> — La exposición permanente de Tartesos sigue siendo la mejor manera de entender de dónde venimos. Sin colas, sin agobios. Gratis los domingos.</p>
      <p><strong>Casa Colón</strong> — Programación de conciertos de cámara este fin de semana. Consultar cartelera actualizada en el portal de cultura del Ayuntamiento.</p>

      <h2>Mercados y artesanía</h2>
      <p>El mercado de productores locales en la Plaza de las Monjas celebra su edición mensual este sábado de 10:00 a 14:00. Producto de temporada, embutido ibérico de la Sierra y alguna sorpresa de viticultura onubense que merece atención.</p>

      <h2>En la provincia</h2>
      <ul>
        <li><strong>Palos de la Frontera</strong> — Jornadas del Descubrimiento: actividades didácticas en el Monasterio de La Rábida este fin de semana. Especialmente interesante para ir con familia.</li>
        <li><strong>Isla Cristina</strong> — Subasta de pescado en la lonja: el sábado por la mañana admite visitantes con registro previo en la Cofradía de Pescadores.</li>
        <li><strong>Aracena</strong> — Ruta micológica guiada por el Parque Natural. Plazas muy limitadas, apuntarse antes del jueves.</li>
      </ul>

      <h2>Para el fin de semana largo</h2>
      <p>Si tienes el lunes libre, la combinación Aracena + Cortegana + Almonaster la Real es uno de los circuitos más completos de la Sierra. Distancias cortas, pueblos con carácter y restauración que no defrauda.</p>
    `
  },
  {
    slug: 'fiesta-tinajas-trigueros-2026',
    title: 'Fiesta de las Tinajas en Trigueros: qué esperar y cómo organizarte bien',
    excerpt: 'Una de las citas más auténticas del calendario local onubense. Te explicamos qué es, cómo llegar y cómo aprovecharla sin perder la tarde en aparcamiento.',
    category: 'Eventos',
    image: '/images/guides/calle-huelva-centro.jpg',
    publishedAt: '2026-02-21T18:00:00Z',
    author: 'Lucía Colombina',
    isAi: true,
    content: `
      <p>Trigueros no está en la ruta turística habitual, y eso es exactamente lo que hace que esta fiesta valga la pena. Si esperas turismo organizado con photocalls y merchandising, mejor quédate en casa. Si buscas tradición local sin barniz de marketing, aquí hay mucho que ver.</p>

      <h2>Qué son las Tinajas y por qué importan</h2>
      <p>La tinaja es el recipiente de barro cocido que durante siglos usaron los agricultores de la zona para conservar aceite, vino y cereales. Trigueros fue uno de los centros alfareros más activos de la provincia y la fiesta celebra ese patrimonio industrial artesanal que casi desapareció a mitad del siglo XX.</p>
      <p>Hoy quedan pocos talleres activos, pero la fiesta mantiene viva la memoria del oficio con demostraciones en vivo, mercado de artesanía y actividades que van más allá del folclore decorativo.</p>

      <h2>Logística práctica</h2>
      <ul>
        <li><strong>Acceso</strong>: Trigueros está a 18 km de Huelva capital por la A-472. En coche, 20 minutos sin tráfico.</li>
        <li><strong>Aparcamiento</strong>: el casco se corta al tráfico durante la fiesta. Mejor aparcar en el polígono industrial de la entrada del pueblo (señalizado) y entrar a pie. Son 10 minutos andando.</li>
        <li><strong>Horarios</strong>: el grueso de actividad concentra de 11:00 a 14:00 y de 18:00 a 21:00. La mañana tiene más ambiente artesanal; la tarde más música y tapeo.</li>
      </ul>

      <h2>Qué comer en Trigueros</h2>
      <p>Los bares del entorno de la Plaza Mayor se llenan rápido. Si puedes reservar, mejor. La especialidad local es el gazpacho caliente (sí, existe y es diferente al andaluz frío) y los pestiños caseros que suelen aparecer en los puestos de dulces típicos.</p>

      <h2>Para ir con familia</h2>
      <p>Hay talleres de alfarería para niños durante la mañana. Plazas limitadas: preguntar en el Ayuntamiento de Trigueros o en la web de turismo municipal.</p>
    `
  },

  // ── GASTRONOMÍA (→ /comer) ────────────────────────────────────────────────
  {
    slug: 'ruta-gamba-blanca-huelva-capital',
    title: 'Ruta de gamba blanca en Huelva capital: cómo elegir bien y dónde no equivocarse',
    excerpt: 'La gamba blanca de Huelva es producto de referencia nacional. Pero no en todos los sitios la tratan igual. Guía práctica para disfrutarla como merece.',
    category: 'Gastronomía',
    image: '/images/guides/gambas-blancas-huelva.jpg',
    publishedAt: '2026-02-22T19:30:00Z',
    author: 'Rocío Limón',
    isAi: true,
    content: `
      <p>La gamba blanca de Huelva (Parapenaeus longirostris) se pesca en el Golfo de Cádiz a profundidades de entre 400 y 700 metros. Es fina, delicada y tiene una textura que no se parece a ninguna otra gamba del mercado. También se estropea con facilidad si no se cocina bien. Por eso importa saber elegir dónde comerla.</p>

      <h2>Cómo reconocer producto bueno</h2>
      <p>La gamba blanca fresca tiene cuerpo firme, cabeza bien pegada al cuerpo y un color entre rosado y blanco nacarado. Si la cabeza está negra o se separa con demasiada facilidad, no está en su mejor momento. El olor tiene que ser a mar limpio, no a pescadería de fin de semana.</p>
      <p>En un restaurante honesto, el camarero te dirá de dónde viene y si es de hoy o de ayer. Si no lo sabe, eso ya te dice algo.</p>

      <h2>Las formas de cocinarla</h2>
      <p><strong>A la plancha</strong>: la forma más directa. Sal gruesa, plancha muy caliente, vuelta y vuelta. Dos minutos como máximo. El error clásico es pasarla.</p>
      <p><strong>Cocida</strong>: agua con mucha sal, un minuto y medio, y al agua fría para cortar la cocción. Sencillo y perfecto si el producto es bueno.</p>
      <p><strong>Al ajillo</strong>: con aceite de oliva virgen extra, ajo y guindilla. Esta preparación admite gambas de segunda línea, pero con gamba blanca buena es un crimen mezclar demasiados sabores.</p>

      <h2>Zonas y sitios de referencia en Huelva capital</h2>
      <p>El barrio del Punto Umbría y la zona del Puerto tienen los precios más ajustados y el género más fresco. Los restaurantes del centro histórico suelen ser más caro y el producto no siempre lo justifica. No hay que ir lejos para comer bien.</p>

      <h2>Qué evitar</h2>
      <ul>
        <li>Sitios que venden "gamba de Huelva" sin especificar variedad ni procedencia exacta.</li>
        <li>Menús turísticos donde aparece como reclamo pero el resto de la carta es genérica.</li>
        <li>Pedir cantidad sin criterio: mejor media ración de buena que una entera de discutible.</li>
      </ul>

      <blockquote>La gamba blanca no necesita más que sal, fuego y respeto. Todo lo demás es distracción.</blockquote>
    `
  },
  {
    slug: 'choco-frito-huelva-donde-comer-bien',
    title: 'Choco frito en Huelva: qué es, por qué importa y dónde comerlo bien',
    excerpt: 'El choco frito es el plato más choquero que existe. No es sepia, no es calamar. Es choco. Y hay diferencia. Te explicamos cuál y dónde encontrarlo en su mejor versión.',
    category: 'Gastronomía',
    image: '/images/guides/choco-frito-hero.jpg',
    publishedAt: '2026-02-20T12:00:00Z',
    author: 'Rocío Limón',
    isAi: true,
    content: `
      <p>Si hay un plato que define la identidad gastronómica de Huelva capital, es el choco frito. No la tortillita de camarones, no el jamón ibérico (que es de la Sierra, no de la capital), no la coquina. El choco. Y hay una trampa léxica que confunde a mucha gente de fuera: choco no es sepia.</p>

      <h2>Choco vs sepia: la diferencia que importa</h2>
      <p>El choco (Sepia officinalis) y la sepia son el mismo animal biológicamente, pero en Huelva el término "choco" se reserva para los ejemplares grandes, de temporada, pescados en las aguas del Golfo de Cádiz. La textura es más firme, el sabor más yodado y la cocción admite menos errores.</p>
      <p>Pedir sepia en un bar de Huelva y que te pongan choco es una señal de que estás en sitio serio. Pedir choco y que te pongan calamar es señal de que no.</p>

      <h2>La técnica del buen choco frito</h2>
      <p>Harina de garbanzo o mezcla de trigo y garbanzo, fritura en aceite de oliva virgen extra a temperatura alta y tiempo corto. El resultado tiene que ser: exterior crujiente, interior jugoso, sin exceso de rebozado. Un choco que sabe más a harina que a choco está mal hecho.</p>
      <p>El punto de sal es crítico. Tiene que estar salado antes de freirlo, no después. Y se come caliente, recién sacado. No hay choco frío que valga.</p>

      <h2>Temporada y precio</h2>
      <p>La mejor temporada es otoño-invierno. En verano la calidad baja y el precio sube. Si ves choco frito a precio de saldo en julio, pregunta de dónde viene antes de pedirlo.</p>
      <p>Un precio razonable en Huelva capital: entre 8 y 14 euros la ración según el sitio y el tamaño. Por encima de 16 euros empiezas a pagar la decoración del local más que el producto.</p>

      <h2>Para llevarse una referencia clara</h2>
      <p>Los mejores chocos están en bares sin manteles de tela, con barra de madera y camareros que no te entregan una carta plastificada de cuatro páginas. Cuando ves freidora a la vista, suele ser buena señal.</p>

      <blockquote>En Huelva, el choco frito no es un aperitivo. Es una declaración de principios.</blockquote>
    `
  },

  // ── GUÍAS LOCALES (→ /guias) ──────────────────────────────────────────────
  {
    slug: 'el-rocio-guia-completa-como-ir',
    title: 'El Rocío: guía completa para ir por primera vez sin improvisar',
    excerpt: 'Cuándo ir, cómo llegar, qué ver, cómo comportarse y qué esperar según el momento del año. Todo lo que necesitas saber antes de salir.',
    category: 'Guías Locales',
    image: '/images/guides/iglesia-rocio-huelva.jpg',
    publishedAt: '2026-02-19T10:00:00Z',
    author: 'Antonio Torre',
    isAi: true,
    content: `
      <p>El Rocío no es un destino turístico al uso. Es un lugar de devoción popular con siglos de historia, una aldea que tiene 1.900 habitantes censados pero recibe dos millones de personas durante la romería de Pentecostés. Entender eso antes de ir marca la diferencia entre disfrutar o no.</p>

      <h2>Cuándo ir según lo que buscas</h2>
      <p><strong>Para la experiencia cultural profunda</strong>: la romería de Pentecostés (mayo-junio según el año litúrgico). Caravanas de carromatos, hermandades de toda Andalucía, devoción y fiesta entrelazados durante días. Logística complicada, afluencia masiva. Hay que planificarlo con meses de antelación.</p>
      <p><strong>Para visita tranquila y contemplativa</strong>: cualquier fin de semana de octubre a marzo. La aldea tiene un silencio especial fuera de temporada alta que permite entender mejor el lugar.</p>
      <p><strong>Para fotografía y naturaleza</strong>: el entorno del Parque Nacional de Doñana rodea la aldea. Las marismas en invierno tienen una luz y una vida salvaje que justifican el viaje por sí solas.</p>

      <h2>Cómo llegar y dónde aparcar</h2>
      <p>Desde Huelva capital: 58 km por la A-483 pasando por Almonte. En coche, 50 minutos. No hay tren. El autobús de Damas tiene servicio regular pero con frecuencia reducida.</p>
      <p>El aparcamiento dentro de la aldea es limitado. En temporada alta es directamente imposible. Lo más práctico: aparcar en los arcenes de la carretera de acceso y entrar caminando. Son entre 10 y 20 minutos según dónde te quedes.</p>

      <h2>La aldea: qué ver y dónde ir</h2>
      <p>La Ermita del Rocío es el corazón. Edificio de arquitectura popular andaluza que alberga a la Virgen del Rocío, patrona y referencia espiritual de toda la hermandad. Se puede visitar casi cualquier día del año.</p>
      <p>La playa de caballos junto a las marismas es uno de los rincones más fotográficos de Huelva. Amaneceres y atardeceres con el Parque Nacional como telón de fondo.</p>
      <p>Las calles de arena (la aldea no tiene asfalto) y las casas blancas con rejas de forja dan una atmósfera que no se encuentra en ningún otro sitio de Andalucía.</p>

      <h2>Normas de respeto básicas</h2>
      <ul>
        <li>La Ermita es lugar de culto activo. No entres a hacer turismo cuando hay una celebración litúrgica en curso.</li>
        <li>La imagen de la Virgen no se fotografía desde el interior sin permiso explícito.</li>
        <li>Evita el ruido en la zona de la Ermita en cualquier momento del día.</li>
        <li>El entorno del Parque Nacional tiene zonas de acceso restringido. Respeta los límites señalizados.</li>
      </ul>
    `
  },
  {
    slug: 'ayamonte-guia-un-dia-completo',
    title: 'Ayamonte en un día: ruta completa por el centro, la mesa y el Guadiana',
    excerpt: 'Plan detallado para sacarle el máximo a Ayamonte en una jornada: qué ver, dónde comer, cómo terminar el día bien.',
    category: 'Guías Locales',
    image: '/images/guides/calle-huelva-centro.jpg',
    publishedAt: '2026-02-18T09:00:00Z',
    author: 'Lucía Colombina',
    isAi: true,
    content: `
      <p>Ayamonte es el extremo occidental de Andalucía, al borde del Guadiana que hace frontera con Portugal. Tiene la escala perfecta para hacer en un día: suficientemente pequeño para recorrerlo a pie, suficientemente rico para no aburrirse.</p>

      <h2>La mañana: el casco histórico</h2>
      <p>Empieza por la Plaza de la Laguna, el centro neurálgico con los portales y las terrazas. Desde ahí, sube hacia el Castillo de Ayamonte (lo que queda de él) para tener la primera vista sobre el río y la costa portuguesa de Villarreal de Santo António.</p>
      <p>La Iglesia de las Angustias y la Iglesia de Salvador son los dos edificios religiosos que merecen la visita. El primero por su arquitectura mudéjar tardía; el segundo por la colección de retablos del interior.</p>
      <p>El mercado municipal abre mañanas de lunes a sábado. Si coincides con día de mercado, es el mejor sitio para ver el producto local de temporada y entender qué se come en la zona.</p>

      <h2>El mediodía: dónde comer</h2>
      <p>Ayamonte tiene buena mesa, especialmente en producto del mar. La zona del puerto pesquero, a cinco minutos del centro, concentra los bares con género más fresco. Pide lo que marque pizarra: es lo que llegó esa mañana.</p>
      <p>Especialidad local a buscar: la caldeirada (guiso de pescado al estilo del Algarve, con influencia portuguesa directa). No la encuentras en todos los sitios, pero en los que la tienen suele estar bien.</p>

      <h2>La tarde: el paseo del Guadiana</h2>
      <p>El paseo fluvial de Ayamonte es una de las mejores terrazas naturales de Huelva. Vista directa al estuario, barcos pesqueros, la silueta de Portugal al fondo. La luz de la tarde en esta zona es especialmente buena para fotografía.</p>
      <p>Si tienes tiempo, el ferry que cruza a Villarreal de Santo António sale cada hora y el trayecto dura cinco minutos. Portugal en media tarde: precio del ferry alrededor de 1,50 euros por persona.</p>

      <h2>Datos prácticos</h2>
      <ul>
        <li><strong>Distancia desde Huelva capital</strong>: 58 km por la A-49. Unos 45 minutos.</li>
        <li><strong>Aparcamiento</strong>: zona azul en el centro, gratuito en el paseo del Guadiana fuera de temporada alta.</li>
        <li><strong>Mejor época</strong>: primavera y otoño. El verano es caluroso y lleno de turismo de playa que cambia el ambiente del centro.</li>
      </ul>
    `
  },
  {
    slug: 'aracena-escapada-fin-semana-guia-completa',
    title: 'Aracena de fin de semana: cueva, Sierra y mesa ibérica sin improvisación',
    excerpt: 'Escapada a la Sierra de Huelva con base en Aracena: qué ver, cuándo reservar, dónde comer y cómo organizar dos días aprovechados.',
    category: 'Guías Locales',
    image: '/images/guides/jamon-iberico-bellota.jpg',
    publishedAt: '2026-02-17T10:00:00Z',
    author: 'Antonio Torre',
    isAi: true,
    content: `
      <p>Aracena es la capital de la Sierra de Huelva y el punto de partida natural para explorar el Parque Natural Sierra de Aracena y Picos de Aroche. A 90 km de Huelva capital por la A-66, es un plan de fin de semana que funciona perfectamente sin coche de lujo ni presupuesto desproporcionado.</p>

      <h2>Día 1: la Gruta y el casco histórico</h2>
      <p><strong>La Gruta de las Maravillas</strong> es el atractivo principal y el único cuello de botella real de la visita. Las entradas se agotan con anticipación en temporada alta (Semana Santa, agosto, puentes). Recomendación: reservar online con al menos una semana de margen cualquier fin de semana de primavera u otoño.</p>
      <p>La visita guiada dura unos 50 minutos. El recorrido atraviesa formaciones de estalactitas y estalagmitas en una red de cavidades de más de 1.200 metros. La temperatura interior es constante en torno a 16-18 grados: lleva una capa aunque fuera haga calor.</p>
      <p>Después de la Gruta, el casco histórico de Aracena se recorre en dos horas cómodas. El Castillo y la Prioral de Nuestra Señora del Mayor Dolor (la iglesia sobre la fortaleza árabe) tienen las mejores vistas del pueblo y de la Sierra.</p>

      <h2>Día 1 noche: mesa ibérica</h2>
      <p>Aracena es zona de producción de ibérico de bellota. No hace falta buscar mucho: casi cualquier bar del centro tiene buen embutido. Lo que sí conviene evitar son los restaurantes de carta laminada con fotos de los platos: suelen ser para turistas sin criterio.</p>
      <p>Pide un surtido de ibéricos locales, un queso de la zona si lo tienen, y si el menú del día trae algún guiso de caza (perdiz, jabalí) en temporada, es una buena oportunidad para probarlo.</p>

      <h2>Día 2: Sierra adentro</h2>
      <p>Si tienes el domingo libre, el Parque Natural ofrece rutas de diferente dificultad. La más popular y accesible es la ruta al pueblo de Linares de la Sierra (5 km, desnivel suave, calle empedrada de río que es de las más fotogénicas de Andalucía).</p>
      <p>Otros pueblos que merecen parada: Almonaster la Real (mezquita mozárabe en lo alto del cerro, única en Andalucía en ese estado de conservación) y Cortegana (castillo medieval con visita libre la mayor parte del año).</p>

      <h2>Datos prácticos</h2>
      <ul>
        <li><strong>Alojamiento</strong>: hay casas rurales y hoteles rurales de buena relación calidad-precio en Aracena y en pueblos de la Sierra. Reservar con antelación en temporada alta.</li>
        <li><strong>Transporte</strong>: coche imprescindible si quieres moverte entre pueblos. Sin coche, Aracena sola es viable en autobús desde Huelva pero sin margen para explorar la Sierra.</li>
        <li><strong>Teléfono útil</strong>: la Oficina de Turismo de Aracena tiene guías actualizados de rutas y horarios de la Gruta.</li>
      </ul>
    `
  },

  // ── ALOJAMIENTO (→ /alojarse) ─────────────────────────────────────────────
  {
    slug: 'donde-dormir-huelva-capital-guia-honesta',
    title: 'Dónde dormir en Huelva capital: guía honesta por zonas y presupuesto',
    excerpt: 'No hay muchas guías de alojamiento en Huelva que digan la verdad. Esta intenta ser una de ellas: qué zonas funcionan, cuáles evitar y qué esperar según lo que pagues.',
    category: 'Alojamiento',
    image: '/images/guides/huelva-plaza-las-monjas.jpg',
    publishedAt: '2026-02-22T19:00:00Z',
    author: 'Antonio Torre',
    isAi: true,
    content: `
      <p>Huelva capital no tiene el parque hotelero de Sevilla ni la oferta de apartamentos turísticos de Cádiz. Pero tiene opciones decentes para quedarse si sabes qué buscar y qué precio es razonable.</p>

      <h2>Zonas recomendadas</h2>
      <p><strong>Centro histórico y Gran Vía</strong>: la opción más práctica si vas a moverte a pie. Acceso a bares, restaurantes y los principales puntos de interés sin necesidad de coche. Los hoteles de esta zona tienen precios medios pero la mayoría justifican la tarifa.</p>
      <p><strong>Zona del Puerto y paseo costero</strong>: más tranquilo, mejor para descansar, pero necesitas transporte para llegar al centro. Los apartamentos turísticos aquí suelen tener mejor relación calidad-precio que los hoteles del centro.</p>
      <p><strong>Alrededores de la Plaza de las Monjas</strong>: el corazón de la ciudad. Cómodo para todo, con ruido en fin de semana. Si eres sensible al ruido nocturno, pide habitación interior.</p>

      <h2>Qué esperar por precio</h2>
      <ul>
        <li><strong>Menos de 60€/noche</strong>: hostales y pensiones de calidad variable. Los hay limpios y funcionales. Reserva con foto verificada.</li>
        <li><strong>60-100€/noche</strong>: rango más consistente en Huelva. Hoteles de 3 estrellas con buena ubicación y desayuno incluido en algunos casos.</li>
        <li><strong>Más de 100€/noche</strong>: el techo de la oferta local. No esperes cinco estrellas, pero el servicio y las instalaciones suelen estar bien.</li>
      </ul>

      <h2>Apartamentos turísticos: qué tener en cuenta</h2>
      <p>La oferta en Huelva ha crecido en los últimos años. Los apartamentos cerca del paseo costero son especialmente populares para estancias de dos o más noches. Revisa siempre las fotos verificadas y los comentarios recientes: la diferencia entre una buena y una mala elección en este segmento es grande.</p>

      <h2>Temporada y precios</h2>
      <p>Julio y agosto son temporada alta: precios un 30-50% superiores a la media. Semana Santa también dispara la demanda. El resto del año Huelva capital tiene precios muy razonables y disponibilidad alta.</p>
      <p>Consejo: si vas en verano y tu objetivo es la playa, considera alojarte directamente en Punta Umbría o El Rompido en lugar de la capital. Más caro, pero más cómodo si el mar es el plan principal.</p>
    `
  },
  {
    slug: 'casas-rurales-sierra-aracena-seleccion',
    title: 'Casas rurales en la Sierra de Aracena: selección con criterio propio',
    excerpt: 'No todas las casas rurales de la Sierra son iguales. Algunas justifican el precio; otras son caras por la foto de portada. Guía para elegir bien.',
    category: 'Alojamiento',
    image: '/images/guides/marismas-odiel.jpg',
    publishedAt: '2026-02-15T10:00:00Z',
    author: 'Carmen Doñana',
    isAi: true,
    content: `
      <p>La Sierra de Aracena tiene una oferta de turismo rural que ha crecido mucho en los últimos diez años. Eso significa más opciones, pero también más variedad de calidad. Hay casas rurales que te dejan con ganas de volver y otras que justifican el precio solo con las fotos de la ficha.</p>

      <h2>Qué mirar antes de reservar</h2>
      <p><strong>Fecha de las reseñas</strong>: una casa rural con reseñas de hace tres años puede haber cambiado de gestión. Prioriza opiniones de los últimos 12 meses.</p>
      <p><strong>Fotos verificadas vs. fotos de marketing</strong>: en plataformas como Booking o Airbnb, las fotos de huéspedes suelen ser más fiables que las del propietario. Compara ambas.</p>
      <p><strong>Política de mascotas y fumadores</strong>: si cualquiera de las dos es importante para ti, compruébalo antes de reservar. Muchas casas rurales tienen políticas restrictivas.</p>

      <h2>Zonas dentro de la Sierra</h2>
      <p><strong>Aracena y alrededores inmediatos</strong>: mayor oferta, más servicios cerca, precio algo más alto. Ideal si quieres base cómoda sin sacrificar nada.</p>
      <p><strong>Linares de la Sierra y Alajar</strong>: pueblos más pequeños y recogidos. Casas rurales con más carácter y precios generalmente más ajustados. La desventaja es el acceso: carreteras de montaña estrechas que en invierno pueden complicarse.</p>
      <p><strong>Cortegana y Aroche</strong>: extremo occidental del Parque Natural. Menos visitado, más silencio, buenas opciones para grupos que buscan aislamiento real.</p>

      <h2>Temporada y reserva anticipada</h2>
      <p>Semana Santa, el puente de la Constitución (diciembre) y los fines de semana de octubre-noviembre en temporada de setas son los picos de demanda. En esas fechas, la reserva con menos de dos semanas de antelación es una apuesta arriesgada.</p>
      <p>Fuera de esas fechas, especialmente enero-febrero y julio, la disponibilidad es alta y los precios pueden negociarse directamente con el propietario si reservas fuera de plataforma.</p>

      <h2>Qué incluir en el presupuesto</h2>
      <p>El precio de la casa rural rara vez incluye todo. Leña para la chimenea, acceso a la piscina en temporada, ropa de cama extra: pregunta antes de confirmar. También calcula el gasto en combustible si vas a moverte entre pueblos durante la estancia.</p>
    `
  }

];
