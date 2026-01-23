import { supabaseAdmin } from './supabase';

export async function logAgentAction(agent: string, action: string, details: any = {}) {
  try {
    console.log(`[${agent.toUpperCase()}] ${action}`, details);
    
    // Escribir en DB sin esperar (fire and forget para no bloquear ejecución)
    supabaseAdmin.from('agent_logs').insert({
      agent_name: agent,
      action: action,
      details: details
    }).then(({ error }) => {
      if (error) console.error("Error writing log to DB:", error);
    });

  } catch (e) {
    console.error("Logger failed:", e);
  }
}
