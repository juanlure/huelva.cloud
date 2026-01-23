import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { analyzeDiversity } from '@/lib/agents/diversity';
import { generateDraft } from '@/lib/agents/writer';
import { reviewDraft } from '@/lib/agents/editor';

// Evitar cacheo en Vercel
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  // Seguridad: Verificar cabecera de autenticación de Vercel Cron
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    // Permitir ejecución local para pruebas si no hay secret definido, o rechazar en prod
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  try {
    console.log("[DAEMON] Iniciando ciclo de publicación automática...");

    // 1. Planificación
    const suggestion = await analyzeDiversity();
    const topic = suggestion ? suggestion.topic : 'Huelva Secreta';

    // 2. Escritura
    const draft = await generateDraft(topic);

    // 3. Edición
    const review = await reviewDraft(draft);

    if (!review.approved) {
      console.log("[DAEMON] Artículo rechazado por el editor.");
      return NextResponse.json({ status: 'skipped', reason: 'rejected_by_editor' });
    }

    // 4. Publicación (Insertar en Supabase usando Admin Client)
    const { error } = await supabaseAdmin.from('articles').insert({
      slug: draft.slug,
      title: draft.title,
      content: draft.content,
      excerpt: `Un artículo sobre ${topic} generado por IA.`,
      category: draft.category,
      image_url: 'https://images.unsplash.com/photo-1626202158866-2396e3867623?q=80&w=800', // Placeholder
      author: draft.author,
      is_ai: true
    });

    if (error) {
      // Si falla (ej. slug duplicado), loguear error
      console.error("[DAEMON] Error guardando en DB:", error);
      return NextResponse.json({ status: 'error', error: error.message }, { status: 500 });
    }

    console.log(`[DAEMON] ¡Artículo publicado! Slug: ${draft.slug}`);
    return NextResponse.json({ status: 'published', slug: draft.slug });

  } catch (err: any) {
    console.error("[DAEMON] Fallo crítico:", err);
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
