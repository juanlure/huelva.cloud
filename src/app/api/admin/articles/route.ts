import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { data: articles, error } = await supabaseAdmin
      .from('articles')
      .select('id, title, slug, category, status, is_ai, published_at, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json(articles);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { slug } = body;

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    console.log(`[ADMIN] Deleting article: ${slug}`);

    const { error } = await supabaseAdmin
      .from('articles')
      .delete()
      .eq('slug', slug);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error("Delete error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
