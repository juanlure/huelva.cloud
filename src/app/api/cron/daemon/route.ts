import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { analyzeDiversity } from '@/lib/agents/diversity';
import { generateDraft, refineDraft } from '@/lib/agents/writer';
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
      // 1. Investigación Visual Real (Desactivada la generación AI por petición de usuario)
      uploadedGallery = [];

      // 2. Investigación Web Real (Google Search Grounding)
      researchContext = await performWebResearch(topic);
    }

    // 1.7. Investigación de Datos en Tiempo Real (Clima/Calidad del Aire)
    let realTimeData = "";
    try {
      const dataSearch = await performWebResearch("Clima y calidad del aire hoy en Huelva capital");
      if (dataSearch) {
        realTimeData = `\nDATOS TIEMPO REAL HUELVA:\n${dataSearch}\n`;
        console.log("[DAEMON] Datos tiempo real obtenidos");
      }
    } catch (e) {
      console.warn("[DAEMON] Error buscando datos tiempo real", e);
    }

    // 2. Escritura (Rewrite si hay scrapedData, Generate si no)
    // Pasamos realTimeData junto con researchContext
    const fullContext = (researchContext || "") + realTimeData;
    const draft = await generateDraft(topic, scrapedData?.content, targetUrl, uploadedGallery, fullContext || undefined);
    await logAgentAction('Writer', 'Draft Generated', { title: draft.title, mode: scrapedData ? 'Rewrite' : 'Create (+Research)' });



    // ... (dentro de la función GET)

    // 3. Edición y Refinamiento Iterativo
    let currentDraft = draft;
    let review = await reviewDraft(currentDraft);

    if (!review.approved) {
      await logAgentAction('Editor', 'Refining', { reason: review.feedback });
      currentDraft = await refineDraft(currentDraft, review.feedback);
      review = await reviewDraft(currentDraft); // Una segunda oportunidad

      if (!review.approved) {
        await logAgentAction('Editor', 'Final Rejected (Best Effort Proceeding)', { reason: review.feedback });
      } else {
        await logAgentAction('Editor', 'Approved after refinement', { score: review.score });
      }
    } else {
      await logAgentAction('Editor', 'Approved', { score: review.score });
    }

    const finalDraft = currentDraft;



    // 3.5. SEO (Nuevo paso)
    const seoData = await optimizeSeo(finalDraft);
    await logAgentAction('SEO', 'Optimized', { slug: seoData.slug, metaTitle: seoData.metaTitle });



    // 3.6. Interactive Classifier (Nuevo paso)
    // 3.6. Interactive Classifier (Safe Wrap)
    let finalContent = finalDraft.content;
    try {
      const interactiveData = await classifyContent({ ...finalDraft, slug: seoData.slug });

      if (interactiveData.interactive) {
        const richData = await generateInteractiveData(finalDraft.title, interactiveData);

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
          await logAgentAction('Generator', 'Failed', { reason: "Returned null data" });
        }
      } else {
        await logAgentAction('Classifier', 'Static Content', { reason: interactiveData.rationale });
      }
    } catch (e) {
      console.error("[DAEMON] Interactive logic failed", e);
      await logAgentAction('System', 'Interactive Skip', { error: String(e) });
      // Continue with static content
    }

    // 4. Diseño (Safe Wrap - Generate or Scrape)
    let imageUrl = 'https://images.unsplash.com/photo-1626202158866-2396e3867623?q=80&w=800'; // Hard fallback
    try {
      // Pasamos seoData.slug para nombrar el archivo correctamente en Storage
      const designResult = await generateHeaderImage(finalDraft.title, finalDraft.excerpt, scrapedData?.image, seoData.slug);
      if (designResult) {
        imageUrl = designResult;
        await logAgentAction('Designer', 'Image Ready', { url: imageUrl });
      }
    } catch (e) {
      console.error("[DAEMON] Design logic failed", e);
      await logAgentAction('Designer', 'Fallback Used', { error: String(e) });
      // Continue with fallback image
    }

    // 5. Publicación (Insertar en Supabase usando Admin Client)
    // 5. Publicación (Insertar en Supabase usando Admin Client)
    let error = null;

    if (process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('placeholder')) {
      console.log("---- [MOCK DB INSERT] ----");
      console.log(`Slug: ${seoData.slug}`);
      console.log(`Title: ${finalDraft.title}`);
      console.log(`Image: ${imageUrl}`);
      console.log("--------------------------");
    } else {
      const res = await supabaseAdmin.from('articles').insert({
        slug: seoData.slug,
        title: finalDraft.title,
        content: finalContent, // Contenido con payload interactivo
        excerpt: seoData.metaDescription,
        category: finalDraft.category,
        image_url: imageUrl,
        author: finalDraft.author,
        is_ai: true
      });
      error = res.error;
    }

    if (error) {
      await logAgentAction('Daemon', 'Error Saving', { error: error.message });
      return NextResponse.json({ status: 'error', error: error.message }, { status: 500 });
    }

    await logAgentAction('Daemon', 'Published', { slug: finalDraft.slug, title: finalDraft.title });
    return NextResponse.json({ status: 'published', slug: draft.slug });

  } catch (err: any) {
    await logAgentAction('Daemon', 'Critical Failure', { error: err.message });
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
