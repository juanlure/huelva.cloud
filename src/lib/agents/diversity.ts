/*
  Huelva.is - Agente Diversidad (Serverless Version)
*/
import { supabase } from '../supabase';

export interface TopicSuggestion {
  topic: string;
  priority: 'high' | 'medium';
}

export async function analyzeDiversity(): Promise<TopicSuggestion | null> {
  // Comprobar últimos artículos en DB
  const { data: articles } = await supabase
    .from('articles')
    .select('category')
    .order('published_at', { ascending: false })
    .limit(5);

  if (!articles || articles.length === 0) return { topic: 'Bienvenida a Huelva', priority: 'high' };

  const counts: Record<string, number> = {};
  articles.forEach((a: any) => counts[a.category] = (counts[a.category] || 0) + 1);

  // Si hay mucho 'Comer', sugerir otra cosa
  if ((counts['Comer'] || 0) > 2) {
    return { topic: 'Atardecer en Muelle del Tinto', priority: 'high' };
  }

  // Default random
  const defaults = ['Gambas de Huelva', 'Romería del Rocío', 'Sierra de Aracena'];
  return { 
    topic: defaults[Math.floor(Math.random() * defaults.length)], 
    priority: 'medium' 
  };
}
