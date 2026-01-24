import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { analyzeDiversity } from '@/lib/agents/diversity';
import { generateDraft } from '@/lib/agents/writer';
import { reviewDraft } from '@/lib/agents/editor';
import { generateHeaderImage, generateEditorialGallery } from '@/lib/agents/designer';
import { logAgentAction } from '@/lib/logger';
import { optimizeSeo } from '@/lib/agents/seo';
import { classifyContent } from '@/lib/agents/classifier';
import { scrapeArticle } from '@/lib/agents/scraper';
import { uploadBatch } from '@/lib/storage';
import { performWebResearch } from '@/lib/agents/researcher';
import { generateInteractiveData } from '@/lib/agents/generator';

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

    if (!suggestion) {
      await logAgentAction('Diversity', 'Skipped', { reason: 'No fresh or evergreen topics found' });
      return NextResponse.json({ status: 'skipped', reason: 'no_topics' });
    }

    const topic = suggestion.topic;
    const targetUrl = suggestion.url;

    await logAgentAction('Diversity', 'Selected Topic', { topic, url: targetUrl });





    // 1.5. Scraping (si hay URL)
    let scrapedData = null;
    let uploadedGallery: string[] = []; // Fotos subidas a nuestro storage
    let researchContext: string | null = null; // Datos de investigación web

    if (targetUrl) {
      // MODO CURADOR (Existe noticia real)
      scrapedData = await scrapeArticle(targetUrl);
      if (scrapedData) {
        await logAgentAction('Scraper', 'Content Extracted', { source: scrapedData.source, gallerySize: scrapedData.gallery?.length || 0 });

        if (scrapedData.gallery && scrapedData.gallery.length > 0) {
          const tempSlug = topic.substring(0, 20).toLowerCase().replace(/[^a-z0-9]/g, '-');
          uploadedGallery = await uploadBatch(scrapedData.gallery, `gallery-${tempSlug}`);
          await logAgentAction('Storage', 'Batch Upload', { count: uploadedGallery.length });
        }
      } else {
        await logAgentAction('Scraper', 'Failed/Skipped', { url: targetUrl });
      }
    } else {
      // MODO CREADOR (Guía desde cero)
      // 1. Investigación Visual Real (Imagen 3 / Nano Banana)
      uploadedGallery = await generateEditorialGallery(topic, 3);
      if (uploadedGallery.length > 0) {
        await logAgentAction('Designer', 'AI Gallery Generated', { count: uploadedGallery.length });
      }

      // 2. Investigación Web Real (Google Search Grounding)
      researchContext = await performWebResearch(topic);
    }

    // 2. Escritura (Rewrite si hay scrapedData, Generate si no)
    // Pasamos uploadedGallery y researchContext al escritor
    const draft = await generateDraft(topic, scrapedData?.content, targetUrl, uploadedGallery, researchContext || undefined);
    await logAgentAction('Writer', 'Draft Generated', { title: draft.title, mode: scrapedData ? 'Rewrite' : 'Create (+Research)' });



    // ... (dentro de la función GET)

    // 3. Edición
    const review = await reviewDraft(draft);

    if (!review.approved) {
      await logAgentAction('Editor', 'Rejected', { reason: review.feedback });
      return NextResponse.json({ status: 'skipped', reason: 'rejected_by_editor' });
    }

    await logAgentAction('Editor', 'Approved', { score: review.score });



    // 3.5. SEO (Nuevo paso)
    const seoData = await optimizeSeo(draft);
    await logAgentAction('SEO', 'Optimized', { slug: seoData.slug, metaTitle: seoData.metaTitle });



    // 3.6. Interactive Classifier (Nuevo paso)
    let finalContent = draft.content;
    const interactiveData = await classifyContent({ ...draft, slug: seoData.slug });

    if (interactiveData.interactive) {
      // Generar datos reales para el componente
      const richData = await generateInteractiveData(draft.title, interactiveData);

      if (richData) {
        await logAgentAction('Generator', 'Data Created', {
          type: interactiveData.component_type,
          title: richData.title
        });

        // Inyectar datos en el contenido
        const scriptBlock = `
           <div id="interactive-root" data-component="${interactiveData.component_type}" style="display:none;"></div>
           <script type="application/json" id="interactive-data">
             ${JSON.stringify(richData)}
           </script>
         `;
        finalContent += scriptBlock;
      } else {
        await logAgentAction('Generator', 'Failed', { reason: "Returned null" });
        // Fallback a static context log if generation failed
      }
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
    // 5. Publicación (Insertar en Supabase usando Admin Client)
    let error = null;

    if (process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('placeholder')) {
      console.log("---- [MOCK DB INSERT] ----");
      console.log(`Slug: ${seoData.slug}`);
      console.log(`Title: ${draft.title}`);
      console.log(`Image: ${imageUrl}`);
      console.log("--------------------------");
    } else {
      const res = await supabaseAdmin.from('articles').insert({
        slug: seoData.slug,
        title: draft.title,
        content: finalContent, // Contenido con payload interactivo
        excerpt: seoData.metaDescription,
        category: draft.category,
        image_url: imageUrl,
        author: draft.author,
        is_ai: true
      });
      error = res.error;
    }

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
