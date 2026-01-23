import { supabaseAdmin } from './supabase';

export async function logAgentAction(agent: string, action: string, details: any = {}) {
  try {
    console.log(`[${agent.toUpperCase()}] ${action}`, details);
    
    // Escribir en DB sin esperar (fire and forget para no bloquear ejecución)
    if (process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('placeholder')) {
      // Skip DB write in mock mode
      return;
    }

    supabaseAdmin.from('agent_logs').insert({
      agent_name: agent,
      action: action,
      details: details
    }).then((response: any) => {
      if (response.error) console.error("Error writing log to DB:", response.error);
    });

  } catch (e) {
    console.error("Logger failed:", e);
  }
}
