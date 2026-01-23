'use client';

import { useState } from 'react';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    "Esperando conexión con logs..."
  ]);

  const triggerDaemon = async () => {
    if (!confirm('¿Seguro que quieres forzar a los agentes a trabajar?')) return;
    
    setLoading(true);
    try {
      const res = await fetch('/api/cron/daemon', {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET || 'test_secret'}` 
        }
      });
      const data = await res.json();
      alert(`Resultado: ${JSON.stringify(data)}`);
    } catch (e) {
      alert('Error ejecutando daemon: ' + e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>🎛️ Panel de Control - Huelva.is AI</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
        
        <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
          <h2>🤖 Control de Agentes</h2>
          <p>Estado del sistema: 🟢 Operativo</p>
          <button 
            style={{ 
              padding: '0.5rem 1rem', 
              background: loading ? '#ccc' : '#d45e35', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: loading ? 'wait' : 'pointer' 
            }}
            onClick={triggerDaemon}
            disabled={loading}
          >
            {loading ? 'Ejecutando...' : 'Forzar Ejecución (Daemon)'}
          </button>
        </div>

        <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
          <h2>📜 Últimos Logs</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
             {/* TODO: Connect to real Supabase logs */}
             <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
              <span style={{ color: '#666' }}>[DEMO]</span> Conecta Logs aquí
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
