'use client';

import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(false);
  const [dbLogs, setDbLogs] = useState<any[]>([]);

  const [articles, setArticles] = useState<any[]>([]);

  // Fetch logs logic
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

  // Fetch articles logic
  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/admin/articles');
      if (res.ok) {
        const data = await res.json();
        setArticles(data);
      }
    } catch (e) {
      console.error("Articles fetch error", e);
    }
  };

  // Poll logs every 5s
  useEffect(() => {
    fetchLogs();
    fetchArticles();
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, []);

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
      fetchLogs(); // Refresh logs immediately
      fetchArticles(); // Refresh articles too if new one created
    } catch (e) {
      alert('Error ejecutando daemon: ' + e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm(`¿Estás seguro de que quieres eliminar el artículo "${slug}"? Esta acción es irreversible.`)) return;

    try {
      const res = await fetch('/api/admin/articles', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug })
      });

      if (res.ok) {
        alert('Artículo eliminado correctamente');
        fetchArticles();
      } else {
        const err = await res.json();
        alert('Error eliminando: ' + err.error);
      }
    } catch (e) {
      alert('Error de conexión');
    }
  };

  const handleEnhance = async (slug: string) => {
    if (!confirm(`¿Mejorar visualmente el artículo "${slug}"?\nEsto generará imágenes AI específicas para sus secciones.`)) return;

    // Small local loading indication
    alert("Iniciando mejora de diseño... Esto puede tardar unos 20-30 segundos.");

    try {
      const res = await fetch('/api/admin/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug })
      });

      const data = await res.json();

      if (res.ok) {
        if (data.count > 0) {
          const parts = [];
          if (data.visuals > 0) parts.push(`${data.visuals} imágenes`);
          if (data.interactive > 0) parts.push(`${data.interactive} componente interactivo`);

          alert(`✅ ¡Éxito! Se han añadido: ${parts.join(' y ')}.`);
        } else {
          alert('⚠️ El proceso terminó, pero no se generaron mejoras nuevas.');
        }
        fetchArticles(); // Refresh mainly to ensure list is alive
      } else {
        alert('❌ Error mejorando: ' + (data.error || 'Desconocido'));
      }
    } catch (e) {
      alert('❌ Error de conexión al intentar mejorar');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>🎛️ Panel de Control - Huelva.is AI</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', marginTop: '2rem' }}>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
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
                cursor: loading ? 'wait' : 'pointer',
                width: '100%'
              }}
              onClick={triggerDaemon}
              disabled={loading}
            >
              {loading ? 'Ejecutando...' : 'Forzar Ejecución (Daemon)'}
            </button>
          </div>

          <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', maxHeight: '400px', overflowY: 'auto' }}>
            <h2>📜 Últimos Logs</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {dbLogs.length === 0 && <li style={{ color: '#999' }}>Cargando logs o base de datos vacía...</li>}
              {dbLogs.map((log) => (
                <li key={log.id} style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee', fontSize: '0.85rem' }}>
                  <span style={{ color: '#999', display: 'block', fontSize: '0.75rem' }}>
                    {new Date(log.created_at).toLocaleTimeString()}
                  </span>
                  <strong style={{ color: '#d45e35' }}>[{log.agent_name}]</strong>
                  {' '} {log.action}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
          <h2>📰 Gestión de Contenido ({articles.length})</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
                  <th style={{ padding: '0.5rem' }}>Fecha</th>
                  <th style={{ padding: '0.5rem' }}>Título</th>
                  <th style={{ padding: '0.5rem' }}>Categoría</th>
                  <th style={{ padding: '0.5rem' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {articles.length === 0 && (
                  <tr>
                    <td colSpan={4} style={{ padding: '1rem', textAlign: 'center', color: '#999' }}>
                      No hay artículos publicados.
                    </td>
                  </tr>
                )}
                {articles.map((article) => (
                  <tr key={article.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '0.5rem', color: '#666' }}>
                      {new Date(article.published_at).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '0.5rem' }}>
                      <a href={`/article/${article.slug}`} target="_blank" style={{ color: '#333', textDecoration: 'none', fontWeight: 500 }}>
                        {article.title}
                      </a>
                    </td>
                    <td style={{ padding: '0.5rem' }}>
                      <span style={{ background: '#eee', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8rem' }}>
                        {article.category}
                      </span>
                    </td>
                    <td style={{ padding: '0.5rem' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => handleEnhance(article.slug)}
                          style={{
                            background: 'transparent',
                            border: '1px solid #10b981',
                            color: '#10b981',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.8rem'
                          }}
                        >
                          ✨ Mejorar
                        </button>
                        <button
                          onClick={() => handleDelete(article.slug)}
                          style={{
                            background: 'transparent',
                            border: '1px solid #ff4444',
                            color: '#ff4444',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.8rem'
                          }}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
