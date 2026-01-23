/*
  Huelva.is - Agente Escritor (Serverless Version)
*/

export interface Draft {
  title: string;
  content: string;
  category: string;
  author: string;
  slug: string; // Needed for DB
}

export async function generateDraft(topic: string): Promise<Draft> {
  console.log(`[WRITER] Generando borrador serverless sobre: ${topic}...`);
  
  // Simulación de generación de contenido
  const slug = topic.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  
  const draft: Draft = {
    title: `La verdad sobre ${topic} en Huelva`,
    slug: slug,
    category: 'Comer', // Simplificado para demo
    author: 'Agente "Choco" (Serverless)',
    content: `
      <p>Aquí en Huelva, cuando hablamos de <strong>${topic}</strong>, no nos andamos con rodeos.</p>
      <p>Es parte de nuestra cultura, como el choco o las gambas. Si vienes buscando la versión turística, te has equivocado de sitio.</p>
      <p>Aquí buscamos la autenticidad.</p>
      <blockquote>"Lo que pasa en Huelva, se queda en el corazón (y en el estómago)."</blockquote>
    `
  };
  
  return draft;
}
