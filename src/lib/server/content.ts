import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { isoFromUnknown, numFromUnknown } from "@/lib/format";
import { slugify } from "@/lib/utils";
import { SEED_ARTICLES, SEED_EVENTS, SEED_PLACES } from "@/data/seed";
import { NEIGHBORHOOD_COORDS } from "@/data/barrios";
import {
  CATEGORIES,
  PLACE_KINDS,
  type Article,
  type Category,
  type CityEvent,
  type Place,
  type PlaceKind,
} from "@/lib/types";

type ArticleRow = {
  id: number;
  slug: string;
  title: string;
  dek: string;
  body: string;
  category: string;
  read_minutes: number;
  featured: boolean;
  source: string;
  author: string | null;
  neighborhood: string | null;
  published_at: unknown;
  votes: number;
};

type PlaceRow = {
  id: number;
  name: string;
  kind: string;
  lat: unknown;
  lng: unknown;
  blurb: string;
  neighborhood: string | null;
  hours: string | null;
  votes: number;
};

type EventRow = {
  id: number;
  title: string;
  dek: string;
  starts_on: unknown;
  ends_on: unknown;
  venue: string;
  neighborhood: string | null;
  lat: unknown;
  lng: unknown;
  source: string;
  votes: number;
};

function mapArticle(row: ArticleRow): Article {
  return {
    id: numFromUnknown(row.id),
    slug: row.slug,
    title: row.title,
    dek: row.dek,
    body: row.body,
    category: (CATEGORIES as readonly string[]).includes(row.category)
      ? (row.category as Category)
      : "community",
    readMinutes: numFromUnknown(row.read_minutes),
    featured: Boolean(row.featured),
    source:
      row.source === "community"
        ? "community"
        : row.source === "daemon"
          ? "daemon"
          : "editorial",
    author: row.author,
    neighborhood: row.neighborhood,
    publishedAt: isoFromUnknown(row.published_at),
    votes: numFromUnknown(row.votes),
  };
}

function mapPlace(row: PlaceRow): Place {
  const kind = (PLACE_KINDS as readonly string[]).includes(row.kind)
    ? (row.kind as PlaceKind)
    : "barrio";
  return {
    id: numFromUnknown(row.id),
    name: row.name,
    kind,
    lat: numFromUnknown(row.lat),
    lng: numFromUnknown(row.lng),
    blurb: row.blurb,
    neighborhood: row.neighborhood,
    hours: row.hours,
    votes: numFromUnknown(row.votes),
  };
}

function mapEvent(row: EventRow): CityEvent {
  return {
    id: numFromUnknown(row.id),
    title: row.title,
    dek: row.dek,
    startsOn: isoFromUnknown(row.starts_on).slice(0, 10),
    endsOn: row.ends_on ? isoFromUnknown(row.ends_on).slice(0, 10) : null,
    venue: row.venue,
    neighborhood: row.neighborhood,
    lat: row.lat == null ? null : numFromUnknown(row.lat),
    lng: row.lng == null ? null : numFromUnknown(row.lng),
    source: row.source === "community" ? "community" : "editorial",
    votes: numFromUnknown(row.votes),
  };
}

export async function ensureSeeded() {
  const sql = await getSql();
  const [{ n }] = await sql<{ n: number }>`select count(*)::int as n from articles`;
  if (numFromUnknown(n) > 0) return;

  for (const article of SEED_ARTICLES) {
    await sql`
      insert into articles (
        slug, title, dek, body, category, read_minutes, featured, source,
        neighborhood, published_at, votes
      ) values (
        ${article.slug}, ${article.title}, ${article.dek}, ${article.body},
        ${article.category}, ${article.readMinutes}, ${article.featured},
        ${article.source}, ${article.neighborhood}, ${article.publishedAt},
        ${article.votes}
      )
    `;
  }

  for (const place of SEED_PLACES) {
    await sql`
      insert into places (name, kind, lat, lng, blurb, neighborhood, hours, votes)
      values (
        ${place.name}, ${place.kind}, ${place.lat}, ${place.lng}, ${place.blurb},
        ${place.neighborhood}, ${place.hours}, ${place.votes}
      )
    `;
  }

  for (const event of SEED_EVENTS) {
    await sql`
      insert into events (
        title, dek, starts_on, ends_on, venue, neighborhood, lat, lng, source, votes
      ) values (
        ${event.title}, ${event.dek}, ${event.startsOn}, ${event.endsOn},
        ${event.venue}, ${event.neighborhood}, ${event.lat}, ${event.lng},
        ${event.source}, ${event.votes}
      )
    `;
  }
}

export const listArticles = createServerFn({ method: "GET" }).handler(async () => {
  await ensureSeeded();
  const sql = await getSql();
  const rows = await sql<ArticleRow>`
    select * from articles order by published_at desc
  `;
  return rows.map(mapArticle);
});

export const getArticleBySlug = createServerFn({ method: "GET" })
  .validator((input: { slug: string }) => input)
  .handler(async ({ data }) => {
    await ensureSeeded();
    const sql = await getSql();
    const rows = await sql<ArticleRow>`
      select * from articles where slug = ${data.slug} limit 1
    `;
    return rows[0] ? mapArticle(rows[0]) : null;
  });

export const listPlaces = createServerFn({ method: "GET" }).handler(async () => {
  await ensureSeeded();
  const sql = await getSql();
  const rows = await sql<PlaceRow>`select * from places order by votes desc, name asc`;
  return rows.map(mapPlace);
});

export const listEvents = createServerFn({ method: "GET" }).handler(async () => {
  await ensureSeeded();
  const sql = await getSql();
  const rows = await sql<EventRow>`select * from events order by starts_on asc`;
  return rows.map(mapEvent);
});

export const voteArticle = createServerFn({ method: "POST" })
  .validator((input: { id: number }) => input)
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`update articles set votes = votes + 1 where id = ${data.id}`;
    return { ok: true as const };
  });

export const votePlace = createServerFn({ method: "POST" })
  .validator((input: { id: number }) => input)
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`update places set votes = votes + 1 where id = ${data.id}`;
    return { ok: true as const };
  });

export const voteEvent = createServerFn({ method: "POST" })
  .validator((input: { id: number }) => input)
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`update events set votes = votes + 1 where id = ${data.id}`;
    return { ok: true as const };
  });

const MAX_TITLE = 140;
const MAX_DEK = 280;
const MAX_BODY = 8000;

function clip(value: string, max: number) {
  return value.trim().slice(0, max);
}

export const publishArticle = createServerFn({ method: "POST" })
  .validator((input: { title: string; dek: string; body: string; category: string; neighborhood: string }) => input)
  .handler(async ({ data }) => {
    await ensureSeeded();
    const title = clip(data.title, MAX_TITLE);
    const dek = clip(data.dek, MAX_DEK);
    const body = clip(data.body, MAX_BODY);
    if (title.length < 8 || body.length < 40) {
      return { ok: false as const, error: "El texto es demasiado corto." };
    }
    const category = (CATEGORIES as readonly string[]).includes(data.category)
      ? data.category
      : "community";
    const neighborhood = data.neighborhood.trim() ? clip(data.neighborhood, 40) : null;
    const base = slugify(title) || "aporte";
    const slug = `${base}-${Date.now().toString(36)}`;
    const readMinutes = Math.max(3, Math.min(12, Math.round(body.split(/\s+/).length / 160)));
    const sql = await getSql();
    await sql`
      insert into articles (
        slug, title, dek, body, category, read_minutes, featured, source,
        neighborhood, votes
      ) values (
        ${slug}, ${title}, ${dek}, ${body}, ${category}, ${readMinutes},
        false, ${"community"}, ${neighborhood}, 1
      )
    `;
    return { ok: true as const, slug };
  });

export const publishPlace = createServerFn({ method: "POST" })
  .validator(
    (input: {
      name: string;
      kind: string;
      blurb: string;
      neighborhood: string;
      hours: string;
    }) => input,
  )
  .handler(async ({ data }) => {
    await ensureSeeded();
    const name = clip(data.name, 80);
    const blurb = clip(data.blurb, 400);
    if (name.length < 3 || blurb.length < 20) {
      return { ok: false as const, error: "Falta nombre o una nota mínima." };
    }
    const kind = (PLACE_KINDS as readonly string[]).includes(data.kind)
      ? data.kind
      : "barrio";
    const neighborhood = data.neighborhood.trim() ? clip(data.neighborhood, 40) : "centro";
    const coords = NEIGHBORHOOD_COORDS[neighborhood] ?? NEIGHBORHOOD_COORDS.centro!;
    const jitter = () => (Math.random() - 0.5) * 0.012;
    const sql = await getSql();
    await sql`
      insert into places (name, kind, lat, lng, blurb, neighborhood, hours, votes)
      values (
        ${name}, ${kind}, ${coords.lat + jitter()}, ${coords.lng + jitter()},
        ${blurb}, ${neighborhood}, ${clip(data.hours, 80) || null}, 1
      )
    `;
    return { ok: true as const };
  });

export const publishEvent = createServerFn({ method: "POST" })
  .validator(
    (input: {
      title: string;
      dek: string;
      startsOn: string;
      venue: string;
      neighborhood: string;
    }) => input,
  )
  .handler(async ({ data }) => {
    await ensureSeeded();
    const title = clip(data.title, MAX_TITLE);
    const dek = clip(data.dek, MAX_DEK);
    const venue = clip(data.venue, 80);
    if (title.length < 6 || !/^\d{4}-\d{2}-\d{2}$/.test(data.startsOn)) {
      return { ok: false as const, error: "Título y fecha son obligatorios." };
    }
    const neighborhood = data.neighborhood.trim() ? clip(data.neighborhood, 40) : "centro";
    const coords = NEIGHBORHOOD_COORDS[neighborhood] ?? NEIGHBORHOOD_COORDS.centro!;
    const sql = await getSql();
    await sql`
      insert into events (title, dek, starts_on, venue, neighborhood, lat, lng, source, votes)
      values (
        ${title}, ${dek}, ${data.startsOn}, ${venue}, ${neighborhood},
        ${coords.lat}, ${coords.lng}, ${"community"}, 1
      )
    `;
    return { ok: true as const };
  });

export const draftWithAi = createServerFn({ method: "POST" })
  .validator((input: { title: string; notes: string }) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "La redacción automática no está disponible ahora." };
    }
    const title = clip(data.title, MAX_TITLE);
    const notes = clip(data.notes, 1500);
    if (notes.length < 20) {
      return { ok: false as const, error: "Cuenta un poco más: un sitio, un plato, un horario." };
    }

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: 700,
        temperature: 0.6,
        messages: [
          {
            role: "system",
            content:
              "Eres el editor de Huelva.cloud, una guía local honesta de Huelva (Andalucía, Costa de la Luz). Escribes en español de España, tono seco y útil, sin marketing, sin emojis, sin 'gran desconocida'. Devuelves SOLO un JSON con keys title, dek, body, category, neighborhood. body en markdown ligero (##, párrafos, **negrita**). category uno de: guides, news, events, eat, community. neighborhood uno de: centro, conquero, reina-victoria, isla-chica, pescaderia, punta-umbria, mazagon, matalascanas, isla-cristina, ayamonte, moguer-palos, aracena, o null. No inventes horarios ni nombres de restaurantes si el usuario no los da.",
          },
          {
            role: "user",
            content: `Título propuesto: ${title || "(sin título)"}\nNotas del vecino:\n${notes}`,
          },
        ],
      }),
    });

    if (!res.ok) {
      return { ok: false as const, error: "No se ha podido redactar ahora. Publica el texto tal cual." };
    }

    const payload = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const raw = payload.choices?.[0]?.message?.content ?? "";
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return { ok: false as const, error: "La IA no devolvió un borrador usable." };
    }
    try {
      const parsed = JSON.parse(jsonMatch[0]) as {
        title?: string;
        dek?: string;
        body?: string;
        category?: string;
        neighborhood?: string | null;
      };
      return {
        ok: true as const,
        draft: {
          title: clip(parsed.title || title, MAX_TITLE),
          dek: clip(parsed.dek || "", MAX_DEK),
          body: clip(parsed.body || notes, MAX_BODY),
          category: parsed.category || "community",
          neighborhood: parsed.neighborhood || "",
        },
      };
    } catch {
      return { ok: false as const, error: "No se ha podido leer el borrador." };
    }
  });
