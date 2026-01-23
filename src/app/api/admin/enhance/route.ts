import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { enhanceArticleVisuals } from '@/lib/agents/designer';
import { classifyContent } from '@/lib/agents/classifier';
import { generateInteractiveData } from '@/lib/agents/generator';

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
            .select('*')
            .eq('slug', slug)
            .single();

        if (error || !article) {
            return NextResponse.json({ error: 'Article not found' }, { status: 404 });
        }

        let updatedContent = article.content;
        let visualCount = 0;
        let interactiveCount = 0;

        // 2. Call Designer Agent (Visuals)
        console.log(`[ADMIN] Enhancing visuals for: ${article.title}`);
        const newVisuals = await enhanceArticleVisuals(article.content, slug);
        visualCount = newVisuals.length;

        for (const visual of newVisuals) {
            const figureHtml = `
        <figure>
          <img src="${visual.imageUrl}" alt="${visual.header} in Huelva" />
          <figcaption>Vista de ${visual.header} (Generada por AI)</figcaption>
        </figure>
      `;
            const regex = new RegExp(`(<h2.*?>${visual.header}<\/h2>)`, 'i');
            updatedContent = updatedContent.replace(regex, `$1${figureHtml}`);
        }

        // 3. Call Interactive Agent (Components)
        if (!updatedContent.includes('id="interactive-root"')) {
            console.log(`[ADMIN] Checking interactivity for: ${article.title}`);

            const draft = {
                title: article.title,
                content: article.content,
                excerpt: article.excerpt || '',
                slug: article.slug,
                category: article.category,
                author: article.author || 'AI',
                images: [],
                seo: { title: article.title, metaDesc: article.excerpt || '' }
            };

            const classification = await classifyContent(draft);

            if (classification.interactive) {
                const richData = await generateInteractiveData(draft.title, classification);

                if (richData) {
                    console.log(`[ADMIN] Generated interactive component: ${classification.component_type}`);
                    const scriptBlock = `
                    <div id="interactive-root" data-component="${classification.component_type}" style="display:none;"></div>
                    <script type="application/json" id="interactive-data">
                        ${JSON.stringify(richData)}
                    </script>
                `;
                    updatedContent = scriptBlock + updatedContent;
                    interactiveCount = 1;
                }
            }
        }

        if (visualCount === 0 && interactiveCount === 0) {
            return NextResponse.json({ message: 'No enhancements needed or generated', count: 0 });
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
            message: 'Enhanced successfully',
            visuals: visualCount,
            interactive: interactiveCount,
            count: visualCount + interactiveCount
        });

    } catch (error: any) {
        console.error('Enhance API Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Error' }, { status: 500 });
    }
}
