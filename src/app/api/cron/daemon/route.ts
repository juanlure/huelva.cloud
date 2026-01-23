import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { analyzeDiversity } from '@/lib/agents/diversity';
import { generateDraft } from '@/lib/agents/writer';
import { reviewDraft } from '@/lib/agents/editor';
import { generateHeaderImage } from '@/lib/agents/designer';
import { logAgentAction } from '@/lib/logger';
import { optimizeSeo } from '@/lib/agents/seo';

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
    await logAgentAction('Daemon', 'Start Cycle');

    // 1. Planificación
    const suggestion = await analyzeDiversity();
    const topic = suggestion ? suggestion.topic : 'Huelva Secreta';
    await logAgentAction('Diversity', 'Selected Topic', { topic });

    // 2. Escritura
    const draft = await generateDraft(topic);
    await logAgentAction('Writer', 'Draft Generated', { title: draft.title });



// ... (dentro de la función GET)

    // 3. Edición
    const review = await reviewDraft(draft);

    if (!review.approved) {
      await logAgentAction('Editor', 'Rejected', { reason: review.feedback });
      return NextResponse.json({ status: 'skipped', reason: 'rejected_by_editor' });
    }
    
    await logAgentAction('Editor', 'Approved', { score: review.score });

// ... imports
import { classifyContent } from '@/lib/agents/classifier';

// ... inside GET

    // 3.5. SEO (Nuevo paso)
    const seoData = await optimizeSeo(draft);
    await logAgentAction('SEO', 'Optimized', { slug: seoData.slug, metaTitle: seoData.metaTitle });

    // 3.6. Interactive Classifier (Nuevo paso)
    let finalContent = draft.content;
    const interactiveData = await classifyContent({ ...draft, slug: seoData.slug });
    
    if (interactiveData.interactive) {
       await logAgentAction('Classifier', 'Interactive Content', { 
         type: interactiveData.component_type, 
         name: interactiveData.component_name 
       });
       
       // Inyectar datos en el contenido
       const scriptBlock = `
         <div id="interactive-root" data-component="${interactiveData.component_type}" style="display:none;"></div>
         <script type="application/json" id="interactive-data">
           ${JSON.stringify(interactiveData)}
         </script>
       `;
       finalContent += scriptBlock;
    } else {
       await logAgentAction('Classifier', 'Static Content', { reason: interactiveData.rationale });
    }

    // 4. Diseño (Generate or Scrape & Upload)
    let imageUrl = 'https://images.unsplash.com/photo-1626202158866-2396e3867623?q=80&w=800';
    try {
      // Pasamos seoData.slug para nombrar el archivo correctamente en Storage
      imageUrl = await generateHeaderImage(draft.title, draft.excerpt, scrapedData?.image, seoData.slug);
      await logAgentAction('Designer', 'Image Ready', { url: imageUrl });
    } catch (e) {
      await logAgentAction('Designer', 'Error', { error: String(e) });
    }

    // 5. Publicación (Insertar en Supabase usando Admin Client)
    const { error } = await supabaseAdmin.from('articles').insert({
      slug: seoData.slug,
      title: draft.title,
      content: finalContent, // Contenido con payload interactivo
      excerpt: seoData.metaDescription,
      category: draft.category,
      image_url: imageUrl,
      author: draft.author,
      is_ai: true
    });

    if (error) {
      await logAgentAction('Daemon', 'Error Saving', { error: error.message });
      return NextResponse.json({ status: 'error', error: error.message }, { status: 500 });
    }

    await logAgentAction('Daemon', 'Published', { slug: draft.slug, title: draft.title });
    return NextResponse.json({ status: 'published', slug: draft.slug });

  } catch (err: any) {
    await logAgentAction('Daemon', 'Critical Failure', { error: err.message });
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
