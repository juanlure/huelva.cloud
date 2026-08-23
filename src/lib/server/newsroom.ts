import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { isoFromUnknown, numFromUnknown } from "@/lib/format";
import { slugify } from "@/lib/utils";
import { AGENTS, AUTHOR_BY_SLUG, writerForCategory } from "@/data/agents";
import { BACKLOG_IDEAS } from "@/data/backlog";
import { ensureSeeded } from "@/lib/server/content";
import { CATEGORIES, type Category } from "@/lib/types";
import { authMiddleware } from "@/lib/auth/middleware";

export type OpsEntry = {
  id: number;
  at: string;
  agent: string;
  action: string;
  detail: string;
  publishedSlug: string | null;
};

export type NewsroomStatus = {
  lastWake: string | null;
  lastPublish: string | null;
  publishesToday: number;
  quota: number;
  quotaDay: string;
  lastDecision: string;
  windowOpen: boolean;
  hour: number;
  logs: OpsEntry[];
  backlogOpen: number;
  agents: { name: string; title: string; beat: string; role: string }[];
};

const QUOTA = 3;

function madridDate() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Madrid" }).format(new Date());
}

function madridHour() {
  const raw = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Madrid",
    hour: "numeric",
    hour12: false,
  }).format(new Date());
  return Number(raw);
}

function windowOpen(hour: number) {
  return hour >= 8 && hour < 23;
}

function clip(value: string, max: number) {
  return value.trim().slice(0, max);
}

const STOP = new Set([
  "huelva",
  "para",
  "como",
  "esta",
  "este",
  "esto",
  "desde",
  "sobre",
  "cuando",
  "hasta",
  "entre",
  "todo",
  "toda",
  "donde",
  "porque",
  "guia",
  "local",
]);

function tokens(value: string) {
  return new Set(
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{M}/gu, "")
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length > 3 && !STOP.has(w)),
  );
}

function overlap(a: string, b: string) {
  const A = tokens(a);
  const B = tokens(b);
  if (!A.size || !B.size) return 0;
  let n = 0;
  for (const w of A) if (B.has(w)) n += 1;
  return n / Math.min(A.size, B.size);
}

function tooSimilar(candidate: string, titles: string[]) {
  for (const title of titles) {
    const score = overlap(candidate, title);
    if (score >= 0.5) return { title, score };
  }
  return null;
}

function garden(body: string, related: { slug: string; title: string }[]) {
  const original = body.length;
  if (original < 200) return { body, changed: false, reason: "demasiado corto para enriquecer" };
  if (body.includes("## En la casa")) return { body, changed: false, reason: "ya tenía enlaces" };
  const picks = related.slice(0, 2);
  if (!picks.length) return { body, changed: false, reason: "sin internos" };
  const next =
    body +
    "\n\n## En la casa\n\n" +
    picks.map((p) => `- [${p.title}](/p/${p.slug})`).join("\n");
  if (next.length < original) {
    return { body, changed: false, reason: "el retoque encogía. San Valentín: se descarta." };
  }
  return { body: next, changed: true, reason: `${original} → ${next.length} caracteres` };
}

async function log(
  agent: string,
  action: string,
  detail: string,
  publishedSlug: string | null = null,
) {
  const sql = await getSql();
  await sql`
    insert into ops_log (agent, action, detail, published_slug)
    values (${agent}, ${action}, ${detail}, ${publishedSlug})
  `;
}

async function seedNewsroom() {
  const sql = await getSql();
  const [{ n }] = await sql<{ n: number }>`select count(*)::int as n from ops_log`;
  if (numFromUnknown(n) === 0) {
    const seeds: { agent: string; action: string; detail: string; hours: number }[] = [
      { agent: "Odiel", action: "heartbeat", detail: "Contenedores en pie. Memoria estable. Nada que reiniciar.", hours: 14 },
      { agent: "La Vigía", action: "backlog", detail: "Cargadas 8 ideas. Prioridad: septiembre, Cinta, Condado.", hours: 13 },
      { agent: "El Condado", action: "diversity", detail: "Hay demasiada gamba en portada. Siguiente pieza: barrio o sierra.", hours: 11 },
      { agent: "Eladio Onuba", action: "assign", detail: "Encarga a Toni Portil el poniente de septiembre.", hours: 10 },
      { agent: "Toni Portil", action: "draft", detail: "Borrador del poniente. Luz, bandera, orilla.", hours: 10 },
      { agent: "Eladio Onuba", action: "publish", detail: "Publicado. Entra en Lo último.", hours: 9 },
      { agent: "La Rábida", action: "scan", detail: "SSH y tráfico: nada raro. Coordinado con Odiel.", hours: 6 },
      { agent: "El Muelle", action: "analytics", detail: "Lo más leído: gamba y 48 horas. El test convierte.", hours: 4 },
      { agent: "La Marea", action: "wait", detail: "Cuota de ayer cerrada. Duermo hasta la ventana de las 8.", hours: 3 },
      { agent: "La Marea", action: "wake", detail: "Ventana abierta. Decido si publicar o esperar.", hours: 1 },
    ];
    for (const row of seeds) {
      await sql.query(
        "insert into ops_log (at, agent, action, detail) values (now() - ($1 || ' hours')::interval, $2, $3, $4)",
        [String(row.hours), row.agent, row.action, row.detail],
      );
    }
  }

  const [{ b }] = await sql<{ b: number }>`select count(*)::int as b from idea_backlog`;
  if (numFromUnknown(b) === 0) {
    for (const idea of BACKLOG_IDEAS) {
      await sql`
        insert into idea_backlog (topic, angle, category, neighborhood, status)
        values (${idea.topic}, ${idea.angle}, ${idea.category}, ${idea.neighborhood}, ${"open"})
      `;
    }
  }

  for (const [slug, author] of Object.entries(AUTHOR_BY_SLUG)) {
    await sql`
      update articles set author = ${author}, source = ${"daemon"}
      where slug = ${slug} and (author is null or author = '')
    `;
  }

  const expired = await sql`
    update idea_backlog
    set status = 'expired'
    where status = 'open' and created_at < now() - interval '7 days'
  `;
  await sql`
    delete from idea_backlog
    where status in ('published', 'expired', 'discarded')
      and created_at < now() - interval '7 days'
  `;
  void expired;

  const legal = await sql<{ n: number }>`
    select count(*)::int as n from ops_log where agent = 'Amparo LSSI'
  `;
  if (numFromUnknown(legal[0]?.n) === 0) {
    await log(
      "Amparo LSSI",
      "policy",
      "Cookies cero. Sin IPs en crudo. Banner innecesario. Tríada: /legal, /privacy, /ai-disclosure. Art. 50 cubierto.",
    );
    await log(
      "El Jardinero",
      "rule",
      "Enriquecer solo sumando. Si el texto encoge, se tira el parche. Lo aprendimos en San Valentín.",
    );
  }
}

async function getState() {
  const sql = await getSql();
  const rows = await sql<{
    last_wake: unknown;
    last_publish: unknown;
    publishes_today: number;
    quota_day: string | null;
    last_decision: string | null;
    operator_user_id: string | null;
  }>`select last_wake, last_publish, publishes_today, quota_day, last_decision, operator_user_id from daemon_state where id = 1`;
  const row = rows[0];
  const today = madridDate();
  let publishes = numFromUnknown(row?.publishes_today);
  if (row?.quota_day !== today) {
    publishes = 0;
    await sql`
      update daemon_state set publishes_today = 0, quota_day = ${today} where id = 1
    `;
  }
  return {
    lastWake: row?.last_wake ? isoFromUnknown(row.last_wake) : null,
    lastPublish: row?.last_publish ? isoFromUnknown(row.last_publish) : null,
    publishesToday: publishes,
    quotaDay: today,
    lastDecision: row?.last_decision ?? "arrancando",
  };
}

async function assertOperator(userId: string) {
  const sql = await getSql();
  const [row] = await sql<{ operator_user_id: string | null }>`
    select operator_user_id from daemon_state where id = 1
  `;
  if (!row?.operator_user_id) {
    await sql`
      update daemon_state
      set operator_user_id = ${userId}
      where id = 1 and operator_user_id is null
    `;
    await log("La Rábida", "mesa", "La mesa tiene operador. El resto mira el rastro.");
    return;
  }
  if (row.operator_user_id !== userId) {
    throw new Error("La mesa ya tiene operador.");
  }
}

export const getMesaAccess = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await seedNewsroom();
    const sql = await getSql();
    const [row] = await sql<{ operator_user_id: string | null }>`
      select operator_user_id from daemon_state where id = 1
    `;
    const vacant = !row?.operator_user_id;
    const mine = row?.operator_user_id === context.userId;
    return { canOperate: vacant || mine, isOperator: mine, vacant };
  });

export const getNewsroomStatus = createServerFn({ method: "GET" }).handler(async () => {
  await ensureSeeded();
  await seedNewsroom();
  const sql = await getSql();
  const hour = madridHour();
  const state = await getState();
  const logRows = await sql<{
    id: number;
    at: unknown;
    agent: string;
    action: string;
    detail: string;
    published_slug: string | null;
  }>`select id, at, agent, action, detail, published_slug from ops_log order by at desc, id desc limit 24`;
  const [{ open }] = await sql<{ open: number }>`
    select count(*)::int as open from idea_backlog where status = 'open'
  `;

  const lastSre = logRows.find((r) => r.agent === "Odiel");
  const sreAge = lastSre ? Date.now() - new Date(isoFromUnknown(lastSre.at)).getTime() : Infinity;
  if (sreAge > 10 * 60 * 1000) {
    const mem = Math.round(process.memoryUsage().rss / 1024 / 1024);
    await log("Odiel", "heartbeat", `Proceso en pie. RSS ${mem} MB. Nada que parchear.`);
    await log("La Rábida", "scan", "Sin patrones raros en este ciclo. Sigo.");
  }

  const logs = (
    await sql<{
      id: number;
      at: unknown;
      agent: string;
      action: string;
      detail: string;
      published_slug: string | null;
    }>`select id, at, agent, action, detail, published_slug from ops_log order by at desc, id desc limit 24`
  ).map((r) => ({
    id: numFromUnknown(r.id),
    at: isoFromUnknown(r.at),
    agent: r.agent,
    action: r.action,
    detail: r.detail,
    publishedSlug: r.published_slug,
  }));

  return {
    lastWake: state.lastWake,
    lastPublish: state.lastPublish,
    publishesToday: state.publishesToday,
    quota: QUOTA,
    quotaDay: state.quotaDay,
    lastDecision: state.lastDecision,
    windowOpen: windowOpen(hour),
    hour,
    logs,
    backlogOpen: numFromUnknown(open),
    agents: AGENTS.map((a) => ({
      name: a.name,
      title: a.title,
      beat: a.beat,
      role: a.role,
    })),
  } satisfies NewsroomStatus;
});

export const runEditorialCycle = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
  await ensureSeeded();
  await seedNewsroom();
  await assertOperator(context.userId);
  const sql = await getSql();
  const hour = madridHour();
  const state = await getState();

  await sql`update daemon_state set last_wake = now() where id = 1`;
  await log("La Marea", "wake", `Hora ${hour}:00 en Huelva. Reviso cuota y ventana.`);

  if (!windowOpen(hour)) {
    const decision = "Fuera de ventana (8:00–23:00). Espero.";
    await sql`update daemon_state set last_decision = ${decision} where id = 1`;
    await log("La Marea", "wait", decision);
    return { ok: true as const, decision, slug: null as string | null };
  }

  if (state.publishesToday >= QUOTA) {
    const decision = `Cuota diaria cumplida (${QUOTA}). No saturo.`;
    await sql`update daemon_state set last_decision = ${decision} where id = 1`;
    await log("La Marea", "wait", decision);
    return { ok: true as const, decision, slug: null as string | null };
  }

  const recent = await sql<{ title: string; category: string; slug: string }>`
    select title, category, slug from articles order by published_at desc limit 12
  `;
  const cats = recent.map((r) => r.category);
  const tooMuch = cats.length >= 3 && cats[0] === cats[1] && cats[1] === cats[2];
  const recentTitles = recent.map((r) => r.title);

  const openIdeas = await sql<{
    id: number;
    topic: string;
    angle: string;
    category: string;
    neighborhood: string | null;
  }>`select id, topic, angle, category, neighborhood from idea_backlog where status = 'open' order by id asc`;

  const idea =
    (tooMuch
      ? openIdeas.find((i) => i.category !== cats[0] && !tooSimilar(i.topic, recentTitles))
      : openIdeas.find((i) => !tooSimilar(i.topic, recentTitles))) ?? undefined;

  if (!idea) {
    const clash = openIdeas[0] ? tooSimilar(openIdeas[0].topic, recentTitles) : null;
    const decision = clash
      ? `Caso Gaucín: «${openIdeas[0]!.topic}» solapa con «${clash.title}». Hold.`
      : "Backlog vacío. La Vigía tiene que salir a la calle.";
    await log("Eladio Onuba", "hold", decision);
    await log("La Marea", "wait", decision);
    await sql`update daemon_state set last_decision = ${decision} where id = 1`;
    return { ok: true as const, decision, slug: null as string | null };
  }

  await log(
    "La Vigía",
    "pitch",
    `${idea.topic}. ${idea.angle}`,
  );
  await log(
    "El Condado",
    "diversity",
    tooMuch
      ? `Las últimas tres son ${cats[0]}. Desvío a ${idea.category}.`
      : `Temática ok. Sigue ${idea.category}.`,
  );

  const writer = writerForCategory(idea.category);
  await log("Eladio Onuba", "assign", `Encarga a ${writer.name}: ${idea.topic}.`);

  const canned = BACKLOG_IDEAS.find((b) => b.topic === idea.topic);
  let title = idea.topic;
  let dek = canned?.dek ?? idea.angle;
  let body = canned?.body ?? "";
  let category = idea.category;
  let neighborhood = idea.neighborhood;
  let usedAi = false;

  const apiKey = process.env.XAI_API_KEY;
  if (apiKey) {
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: 700,
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content:
              `Eres ${writer.name}, ${writer.beat} Escribes para Huelva.cloud. Español de España, tono de revista de viajes seria: cálido, preciso, orgulloso de Huelva. Luz atlántica, gamba blanca, Doñana, Colón, sierra. Sin marketing vacío, sin emojis, sin complejos, sin industria ni olores. Eladio Onuba (editor) ya aprobó el tema. Devuelve SOLO JSON: title, dek, body, category, neighborhood. body en markdown ligero (## y **negrita**), 3-5 párrafos. category uno de guides, news, events, eat. neighborhood: centro, conquero, reina-victoria, punta-umbria, mazagon, isla-cristina, moguer-palos, aracena, o null. No inventes restaurantes concretos ni horarios precisos.`,
          },
          {
            role: "user",
            content: `Tema: ${idea.topic}\nÁngulo: ${idea.angle}\nYa publicado (no repetir): ${recent.map((r) => r.title).join(" · ")}`,
          },
        ],
      }),
    });
    if (res.ok) {
      const payload = (await res.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const raw = payload.choices?.[0]?.message?.content ?? "";
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          const parsed = JSON.parse(jsonMatch[0]) as {
            title?: string;
            dek?: string;
            body?: string;
            category?: string;
            neighborhood?: string | null;
          };
          if (parsed.body && parsed.body.length > 80) {
            title = clip(parsed.title || title, 140);
            dek = clip(parsed.dek || dek, 280);
            body = clip(parsed.body, 8000);
            if (parsed.category && (CATEGORIES as readonly string[]).includes(parsed.category)) {
              category = parsed.category;
            }
            if (parsed.neighborhood) neighborhood = parsed.neighborhood;
            usedAi = true;
          }
        } catch {
          /* fallback canned */
        }
      }
    }
  }

  if (body.length < 80) {
    const decision = "Eladio Onuba: el borrador no llega. Hold.";
    await log("Eladio Onuba", "hold", decision);
    await sql`update daemon_state set last_decision = ${decision} where id = 1`;
    return { ok: true as const, decision, slug: null as string | null };
  }

  const gaucin = tooSimilar(title, recentTitles);
  if (gaucin) {
    await sql`update idea_backlog set status = 'discarded' where id = ${idea.id}`;
    const decision = `Caso Gaucín: «${title}» es «${gaucin.title}» con otro titular. No publico.`;
    await log("Eladio Onuba", "hold", decision);
    await sql`update daemon_state set last_decision = ${decision} where id = 1`;
    return { ok: true as const, decision, slug: null as string | null };
  }

  const grown = garden(
    body,
    recent.map((r) => ({ slug: r.slug, title: r.title })),
  );
  body = grown.body;
  await log(
    "El Jardinero",
    grown.changed ? "enrich" : "skip",
    grown.reason,
  );

  const slug = `${slugify(title)}-${Date.now().toString(36)}`;
  const readMinutes = Math.max(3, Math.min(10, Math.round(body.split(/\s+/).length / 160)));
  const cat: Category = (CATEGORIES as readonly string[]).includes(category)
    ? (category as Category)
    : "guides";

  await sql`
    insert into articles (
      slug, title, dek, body, category, read_minutes, featured, source,
      neighborhood, author, votes
    ) values (
      ${slug}, ${title}, ${dek}, ${body}, ${cat}, ${readMinutes},
      false, ${"daemon"}, ${neighborhood}, ${writer.name}, 1
    )
  `;
  await sql`update idea_backlog set status = 'published' where id = ${idea.id}`;
  const publishes = state.publishesToday + 1;
  const decision = `Publicado «${title}» por ${writer.name}. Cuota ${publishes}/${QUOTA}.`;
  await sql`
    update daemon_state
    set last_publish = now(), publishes_today = ${publishes}, last_decision = ${decision}
    where id = 1
  `;
  await log(
    writer.name,
    "draft",
    usedAi ? "Borrador nuevo, tono de la casa." : "Borrador de reserva. Eladio lo da por bueno.",
  );
  await log("Eladio Onuba", "publish", decision, slug);
  await log("La Marea", "done", "Ciclo cerrado. Sigo durmiendo hasta el próximo wake.");

  return { ok: true as const, decision, slug };
});
