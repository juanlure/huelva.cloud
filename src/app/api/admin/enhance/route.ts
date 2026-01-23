import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { enhanceArticleVisuals } from '@/lib/agents/designer';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const { slug } = await request.json();

        if (!slug) {
            return NextResponse.json({ error: 'Slug required' }, { status: 400 });
        }

        // 1. Fetch article
        const { data: article, error } = await supabaseAdmin
            .from('articles')
            .select('content, title')
            .eq('slug', slug)
            .single();

        if (error || !article) {
            return NextResponse.json({ error: 'Article not found' }, { status: 404 });
        }

        // 2. Call Designer Agent
        console.log(`[ADMIN] Enhancing visuals for: ${article.title}`);
        const newVisuals = await enhanceArticleVisuals(article.content, slug);

        if (newVisuals.length === 0) {
            return NextResponse.json({ message: 'No new visuals generated', count: 0 });
        }

        // 3. Inject images into HTML
        let updatedContent = article.content;

        for (const visual of newVisuals) {
            // Create a figure element
            const figureHtml = `
        <figure>
          <img src="${visual.imageUrl}" alt="${visual.header} in Huelva" />
          <figcaption>Vista de ${visual.header} (Generada por AI)</figcaption>
        </figure>
      `;

            // Inject after the H2 header
            // We use a simple string replace. Robustness could be improved with DOM parser but regex is fine for MVP.
            // We explicitly look for the header tag to append the image after it (or before, let's say after).
            // Regex matches <h2>HEADER</h2> and replaces it with <h2>HEADER</h2> + figure
            const regex = new RegExp(`(<h2.*?>${visual.header}<\/h2>)`, 'i');
            updatedContent = updatedContent.replace(regex, `$1${figureHtml}`);
        }

        // 4. Update Supabase
        const { error: updateError } = await supabaseAdmin
            .from('articles')
            .update({ content: updatedContent })
            .eq('slug', slug);

        if (updateError) {
            throw updateError;
        }

        return NextResponse.json({
            message: 'Visuals enhanced successfully',
            count: newVisuals.length,
            visuals: newVisuals
        });

    } catch (error: any) {
        console.error('Enhance API Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Error' }, { status: 500 });
    }
}
