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

  // Fetch logs on mount and every 5 seconds
  import { useEffect } from 'react';

  // State for logs (typed)
  const [dbLogs, setDbLogs] = useState<any[]>([]);

  const fetchLogs = async () => {
     try {
       const res = await fetch('/api/admin/logs');
       if (res.ok) {
         const data = await res.json();
         setDbLogs(data);
       }
     } catch (e) {
       console.error("Log fetch error", e);
     }
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  // ... (inside JSX)
        <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', maxHeight: '400px', overflowY: 'auto' }}>
          <h2>📜 Últimos Logs</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {dbLogs.length === 0 && <li style={{color: '#999'}}>Cargando logs o base de datos vacía...</li>}
            {dbLogs.map((log) => (
              <li key={log.id} style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee', fontSize: '0.9rem' }}>
                <span style={{ color: '#999', marginRight: '8px' }}>
                  {new Date(log.created_at).toLocaleTimeString()}
                </span>
                <strong style={{ color: '#d45e35' }}>[{log.agent_name}]</strong> 
                {' '} {log.action}
                {log.details && <pre style={{fontSize: '0.7rem', color:'#666', margin:0}}>{JSON.stringify(log.details).slice(0, 100)}</pre>}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
