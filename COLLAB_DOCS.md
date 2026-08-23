# Colaboraciones locales: documentación técnica

## Modelo de datos

Las mesas de colaboración se almacenan en la tabla `collab_spots`:

```sql
create table collab_spots (
  id serial primary key,
  name text not null,
  blurb text not null,
  photo_url text,
  link_url text,
  link_type text not null default 'web',
  active_until date not null,
  created_at timestamptz not null default now()
);
```

### Campos

- `name`: Nombre del local (requerido)
- `blurb`: Texto corto de descripción (requerido, ~80 palabras)
- `photo_url`: URL de la foto (opcional)
- `link_url`: Enlace web o WhatsApp (opcional)
- `link_type`: `'web'` o `'whatsapp'`
- `active_until`: Fecha hasta la cual la mesa está activa (requerido)

## Cómo se muestra

La mesa activa aparece en:
- `/g/carta` (La carta de la lonja)
- Opcionalmente en `/g/marea` (48 horas) si se integra más adelante

Solo se renderiza UNA mesa activa a la vez. Si no hay mesa activa (fecha pasada), el bloque no se muestra.

## Gestión de mesas

### Mesa de demo

El seed incluye una mesa de demo (`Casa Cinta`, INVENTADA, no es un local real) con `active_until: '2099-12-31'` para verificar el diseño.

**Para desactivarla:**

```sql
UPDATE collab_spots SET active_until = '2020-01-01' WHERE name = 'Casa Cinta';
```

**Para reactivarla:**

```sql
UPDATE collab_spots SET active_until = '2099-12-31' WHERE name = 'Casa Cinta';
```

### Crear una nueva mesa

Desde la consola SQL (Neon) o mediante un script:

```sql
INSERT INTO collab_spots (name, blurb, photo_url, link_url, link_type, active_until)
VALUES (
  'Nombre del Local',
  'Descripción corta y directa: qué servís, qué destaca, dónde estáis.',
  '/media/foto.jpg',  -- opcional
  'https://ejemplo.com',  -- o número WhatsApp: 'https://wa.me/34600000000'
  'web',  -- o 'whatsapp'
  '2026-09-15'  -- fecha de expiración
);
```

### Desactivar mesa manualmente

```sql
UPDATE collab_spots SET active_until = CURRENT_DATE - INTERVAL '1 day' WHERE id = 123;
```

## Lógica del servidor

La función `getActiveCollabSpot()` devuelve la mesa más reciente cuya fecha `active_until` es mayor o igual a `current_date`:

```ts
const rows = await sql<CollabSpotRow>`
  select * from collab_spots
  where active_until >= current_date
  order by created_at desc
  limit 1
`;
```

Si no hay mesas activas, devuelve `null` y el componente no renderiza nada.

## Página /colabora

La página `/colabora` explica:
- Qué es: una mesa (14 días) o bodega (21 días)
- Precios: 80 € + IVA (mesa), 150 € + IVA (bodega)
- CTA: email a `colabora@huelva.cloud`
- Voz: local, seca, Huelva. Sin tono de agencia.

No hay formulario en línea, solo mailto. El pago se gestiona fuera del sitio.

## Sin dependencias de ads

- Sin píxeles de tracking
- Sin redes programáticas
- Sin banners rotatorios
- Etiqueta visible: «Colabora», NUNCA «Anuncio» o «Patrocinado»
