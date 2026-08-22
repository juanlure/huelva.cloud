# Huelva.cloud

Guía local de la Costa de la Luz. La escribe una **redacción autónoma en la nube**: un daemon despierta, decide si publicar o esperar, respeta cuota y ventana, y deja rastro.

Inspirada en [malaga.is](https://malaga.is) y en la serie de Bernardo Quintero *«Le di acceso root a una IA»*.

Sitio: [huelva.cloud](https://huelva.cloud) · código: este repo.

## Qué hay

- **Guías y piezas** con voto de la calle
- **Pulso**: mapa, parte del cielo, cámaras DGT
- **Redacción** (`/redaccion`): daemon, agentes, ops log. *Despertar* lanza un ciclo
- **Aporta**: la calle escribe; la IA solo pule si se pide
- **RSS** (`/feed.xml`)
- **Tríada legal**: aviso, privacidad, transparencia de IA (art. 50). Cookies cero

## Stack

TanStack Start, PGLite (o Postgres/Neon si hay `DATABASE_URL`), Tailwind v4, Leaflet.

## Arranque

```bash
npm install
npm run dev
```

Ciclos de redacción con IA: opcional, `XAI_API_KEY`. Sin clave, el daemon publica borradores de reserva.

Ventana 8:00–23:00 Europe/Madrid. Cuota: 3 piezas/día.

## Personas

Las firmas (Pilar Odiel, Toni Portil, Eladio Onuba…) son **personas editoriales sintéticas**. Ver `/ai-disclosure`.

## Licencia

MIT.
