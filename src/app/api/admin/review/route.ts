import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { logAgentAction } from '@/lib/logger';

export const dynamic = 'force-dynamic';

type ArticleStatus = 'pending_review' | 'approved' | 'published' | 'rejected';

/**
 * GET /api/admin/review?status=pending_review
 * Lista artículos filtrados por status
 */
export async function GET(req: NextRequest) {
  try {
    const status = req.nextUrl.searchParams.get('status') as ArticleStatus | null;

    let query = supabaseAdmin
      .from('articles')
      .select('id, slug, title, excerpt, content, category, image_url, author, is_ai, status, review_notes, published_at, created_at')
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data: articles, error } = await query;

    if (error) {
      throw error;
    }

    return NextResponse.json(articles || []);
  } catch (e: any) {
    console.error('[REVIEW API] GET error:', e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

/**
 * POST /api/admin/review
 * Cambiar status de un artículo (aprobar, rechazar, publicar)
 * Body: { slug: string, action: 'approve' | 'reject' | 'publish', notes?: string }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { slug, action, notes } = body;

    if (!slug || !action) {
      return NextResponse.json(
        { error: 'slug y action son requeridos' },
        { status: 400 }
      );
    }

    const validActions = ['approve', 'reject', 'publish'];
    if (!validActions.includes(action)) {
      return NextResponse.json(
        { error: `action debe ser: ${validActions.join(', ')}` },
        { status: 400 }
      );
    }

    // Mapear action a status
    const statusMap: Record<string, ArticleStatus> = {
      approve: 'approved',
      reject: 'rejected',
      publish: 'published'
    };

    const newStatus = statusMap[action];

    // Preparar datos de actualización
    const updateData: { status: ArticleStatus; review_notes?: string; published_at?: string } = {
      status: newStatus
    };

    if (notes) {
      updateData.review_notes = notes;
    }

    // Si se publica, actualizar published_at
    if (action === 'publish') {
      updateData.published_at = new Date().toISOString();
    }

    const { error } = await supabaseAdmin
      .from('articles')
      .update(updateData)
      .eq('slug', slug);

    if (error) {
      throw error;
    }

    await logAgentAction('Admin', `Article ${action}d`, { slug, newStatus, notes });

    return NextResponse.json({
      success: true,
      slug,
      status: newStatus
    });
  } catch (e: any) {
    console.error('[REVIEW API] POST error:', e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

/**
 * PATCH /api/admin/review
 * Editar contenido de un artículo
 * Body: { slug: string, title?: string, excerpt?: string, content?: string }
 */
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { slug, title, excerpt, content } = body;

    if (!slug) {
      return NextResponse.json(
        { error: 'slug es requerido' },
        { status: 400 }
      );
    }

    // Solo incluir campos que se proporcionan
    const updateData: Record<string, string> = {};
    if (title !== undefined) updateData.title = title;
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (content !== undefined) updateData.content = content;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'Al menos un campo a editar es requerido (title, excerpt, content)' },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from('articles')
      .update(updateData)
      .eq('slug', slug);

    if (error) {
      throw error;
    }

    await logAgentAction('Admin', 'Article edited', { slug, fields: Object.keys(updateData) });

    return NextResponse.json({
      success: true,
      slug,
      updated: Object.keys(updateData)
    });
  } catch (e: any) {
    console.error('[REVIEW API] PATCH error:', e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
