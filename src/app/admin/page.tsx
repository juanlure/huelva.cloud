'use client';

import { useState, useEffect, useCallback } from 'react';

type ArticleStatus = 'pending_review' | 'approved' | 'published' | 'rejected';

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image_url: string;
  author: string;
  is_ai: boolean;
  status: ArticleStatus;
  review_notes: string | null;
  published_at: string;
  created_at: string;
}

interface LogEntry {
  id: string;
  agent_name: string;
  action: string;
  created_at: string;
}

const STATUS_CONFIG: Record<ArticleStatus, { label: string; icon: string; color: string }> = {
  pending_review: { label: 'Pendientes', icon: '📋', color: '#f59e0b' },
  approved: { label: 'Aprobados', icon: '✅', color: '#10b981' },
  published: { label: 'Publicados', icon: '📰', color: '#3b82f6' },
  rejected: { label: 'Rechazados', icon: '❌', color: '#ef4444' }
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<ArticleStatus>('pending_review');
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [showLogs, setShowLogs] = useState(false);

  // Editing state
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editExcerpt, setEditExcerpt] = useState('');
  const [editContent, setEditContent] = useState('');
  const [reviewNotes, setReviewNotes] = useState('');

  const fetchArticles = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/review?status=${activeTab}`);
      if (res.ok) {
        const data = await res.json();
        setArticles(data);
        // Limpiar selección si el artículo seleccionado no está en la nueva lista
        if (selectedArticle && !data.find((a: Article) => a.slug === selectedArticle.slug)) {
          setSelectedArticle(null);
        }
      }
    } catch (e) {
      console.error('Error fetching articles:', e);
    }
  }, [activeTab, selectedArticle]);

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/admin/logs');
      if (res.ok) {
        const data = await res.json();
        setLogs(data);
      }
    } catch (e) {
      console.error('Error fetching logs:', e);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [activeTab, fetchArticles]);

  useEffect(() => {
    if (showLogs) {
      fetchLogs();
      const interval = setInterval(fetchLogs, 5000);
      return () => clearInterval(interval);
    }
  }, [showLogs]);

  const selectArticle = (article: Article) => {
    setSelectedArticle(article);
    setEditMode(false);
    setEditTitle(article.title);
    setEditExcerpt(article.excerpt || '');
    setEditContent(article.content || '');
    setReviewNotes('');
  };

  const handleAction = async (action: 'approve' | 'reject' | 'publish') => {
    if (!selectedArticle) return;

    const actionLabels = { approve: 'aprobar', reject: 'rechazar', publish: 'publicar' };
    if (!confirm(`¿Seguro que quieres ${actionLabels[action]} "${selectedArticle.title}"?`)) return;

    try {
      const res = await fetch('/api/admin/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: selectedArticle.slug,
          action,
          notes: reviewNotes || undefined
        })
      });

      if (res.ok) {
        alert(`Artículo ${action === 'approve' ? 'aprobado' : action === 'reject' ? 'rechazado' : 'publicado'} correctamente`);
        setSelectedArticle(null);
        fetchArticles();
      } else {
        const err = await res.json();
        alert('Error: ' + err.error);
      }
    } catch (e) {
      alert('Error de conexión');
    }
  };

  const handleSaveEdit = async () => {
    if (!selectedArticle) return;

    try {
      const res = await fetch('/api/admin/review', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: selectedArticle.slug,
          title: editTitle,
          excerpt: editExcerpt,
          content: editContent
        })
      });

      if (res.ok) {
        alert('Cambios guardados');
        setEditMode(false);
        // Actualizar artículo seleccionado localmente
        setSelectedArticle({
          ...selectedArticle,
          title: editTitle,
          excerpt: editExcerpt,
          content: editContent
        });
        fetchArticles();
      } else {
        const err = await res.json();
        alert('Error: ' + err.error);
      }
    } catch (e) {
      alert('Error de conexión');
    }
  };

  const handleDelete = async () => {
    if (!selectedArticle) return;
    if (!confirm(`¿Estás seguro de eliminar "${selectedArticle.title}"? Esta acción es irreversible.`)) return;

    try {
      const res = await fetch('/api/admin/articles', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: selectedArticle.slug })
      });

      if (res.ok) {
        alert('Artículo eliminado');
        setSelectedArticle(null);
        fetchArticles();
      } else {
        const err = await res.json();
        alert('Error: ' + err.error);
      }
    } catch (e) {
      alert('Error de conexión');
    }
  };

  const triggerDaemon = async () => {
    if (!confirm('¿Forzar a los agentes a generar nuevo contenido?')) return;

    setLoading(true);
    try {
      const res = await fetch('/api/cron/daemon', {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET || 'test_secret'}`
        }
      });
      const data = await res.json();
      alert(`Resultado: ${JSON.stringify(data)}`);
      fetchArticles();
    } catch (e) {
      alert('Error ejecutando daemon: ' + e);
    } finally {
      setLoading(false);
    }
  };

  const getCounts = () => {
    return {
      pending_review: articles.filter(a => a.status === 'pending_review').length,
      approved: articles.filter(a => a.status === 'approved').length,
      published: articles.filter(a => a.status === 'published').length,
      rejected: articles.filter(a => a.status === 'rejected').length
    };
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      background: '#f8fafc'
    }}>
      {/* Sidebar */}
      <aside style={{
        width: '240px',
        background: '#1e293b',
        color: 'white',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Panel de Redacción
        </h1>

        {/* Status Tabs */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {(Object.keys(STATUS_CONFIG) as ArticleStatus[]).map(status => (
            <button
              key={status}
              onClick={() => setActiveTab(status)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                background: activeTab === status ? STATUS_CONFIG[status].color : 'transparent',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.9rem',
                textAlign: 'left',
                transition: 'background 0.2s'
              }}
            >
              <span>{STATUS_CONFIG[status].icon}</span>
              <span>{STATUS_CONFIG[status].label}</span>
            </button>
          ))}
        </nav>

        <hr style={{ border: 'none', borderTop: '1px solid #334155', margin: '1rem 0' }} />

        {/* Actions */}
        <button
          onClick={triggerDaemon}
          disabled={loading}
          style={{
            padding: '0.75rem 1rem',
            background: loading ? '#64748b' : '#d45e35',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            cursor: loading ? 'wait' : 'pointer',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}
        >
          {loading ? 'Generando...' : '+ Generar Contenido'}
        </button>

        <button
          onClick={() => setShowLogs(!showLogs)}
          style={{
            padding: '0.75rem 1rem',
            background: showLogs ? '#475569' : 'transparent',
            border: '1px solid #475569',
            borderRadius: '8px',
            color: 'white',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          {showLogs ? 'Ocultar Logs' : 'Ver Logs'}
        </button>

        {/* Logs Panel */}
        {showLogs && (
          <div style={{
            flex: 1,
            overflowY: 'auto',
            fontSize: '0.75rem',
            background: '#0f172a',
            borderRadius: '8px',
            padding: '0.75rem'
          }}>
            {logs.slice(0, 20).map(log => (
              <div key={log.id} style={{ marginBottom: '0.5rem', borderBottom: '1px solid #1e293b', paddingBottom: '0.5rem' }}>
                <span style={{ color: '#64748b' }}>
                  {new Date(log.created_at).toLocaleTimeString()}
                </span>
                <br />
                <span style={{ color: '#d45e35' }}>[{log.agent_name}]</span> {log.action}
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* Article List */}
      <section style={{
        width: '320px',
        background: 'white',
        borderRight: '1px solid #e2e8f0',
        overflowY: 'auto'
      }}>
        <div style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: '600', color: '#1e293b' }}>
            {STATUS_CONFIG[activeTab].icon} {STATUS_CONFIG[activeTab].label}
            <span style={{
              marginLeft: '0.5rem',
              background: '#e2e8f0',
              padding: '2px 8px',
              borderRadius: '12px',
              fontSize: '0.85rem'
            }}>
              {articles.length}
            </span>
          </h2>
        </div>

        {articles.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
            No hay artículos en esta categoría
          </div>
        ) : (
          articles.map(article => (
            <div
              key={article.id}
              onClick={() => selectArticle(article)}
              style={{
                padding: '1rem',
                borderBottom: '1px solid #e2e8f0',
                cursor: 'pointer',
                background: selectedArticle?.slug === article.slug ? '#f1f5f9' : 'white',
                transition: 'background 0.2s'
              }}
            >
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {article.image_url && (
                  <img
                    src={article.image_url}
                    alt=""
                    style={{
                      width: '60px',
                      height: '60px',
                      objectFit: 'cover',
                      borderRadius: '6px'
                    }}
                  />
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    color: '#1e293b',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {article.title}
                  </h3>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                    <span style={{
                      fontSize: '0.75rem',
                      background: '#e2e8f0',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}>
                      {article.category}
                    </span>
                    {article.is_ai && (
                      <span style={{
                        fontSize: '0.75rem',
                        background: '#fef3c7',
                        color: '#92400e',
                        padding: '2px 6px',
                        borderRadius: '4px'
                      }}>
                        IA
                      </span>
                    )}
                  </div>
                  <p style={{
                    fontSize: '0.75rem',
                    color: '#64748b',
                    marginTop: '0.25rem'
                  }}>
                    {article.author} · {new Date(article.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </section>

      {/* Preview/Editor Panel */}
      <main style={{
        flex: 1,
        overflowY: 'auto',
        padding: '2rem',
        background: '#f8fafc'
      }}>
        {!selectedArticle ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: '#94a3b8'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
              <p>Selecciona un artículo para revisar</p>
            </div>
          </div>
        ) : (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '1.5rem'
            }}>
              <div>
                <span style={{
                  fontSize: '0.75rem',
                  background: STATUS_CONFIG[selectedArticle.status].color,
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px'
                }}>
                  {STATUS_CONFIG[selectedArticle.status].label}
                </span>
                {selectedArticle.is_ai && (
                  <span style={{
                    fontSize: '0.75rem',
                    background: '#fef3c7',
                    color: '#92400e',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    marginLeft: '0.5rem'
                  }}>
                    Generado con IA
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => setEditMode(!editMode)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: editMode ? '#3b82f6' : 'white',
                    color: editMode ? 'white' : '#1e293b',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                  }}
                >
                  {editMode ? 'Cancelar Edición' : 'Editar'}
                </button>
                <a
                  href={`/article/${selectedArticle.slug}`}
                  target="_blank"
                  style={{
                    padding: '0.5rem 1rem',
                    background: 'white',
                    color: '#1e293b',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontSize: '0.85rem'
                  }}
                >
                  Ver en Web
                </a>
              </div>
            </div>

            {/* Image */}
            {selectedArticle.image_url && (
              <img
                src={selectedArticle.image_url}
                alt=""
                style={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  marginBottom: '1.5rem'
                }}
              />
            )}

            {/* Title */}
            {editMode ? (
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                style={{
                  width: '100%',
                  fontSize: '1.75rem',
                  fontWeight: 'bold',
                  color: '#1e293b',
                  border: '2px solid #3b82f6',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  marginBottom: '1rem'
                }}
              />
            ) : (
              <h1 style={{
                fontSize: '1.75rem',
                fontWeight: 'bold',
                color: '#1e293b',
                marginBottom: '1rem'
              }}>
                {selectedArticle.title}
              </h1>
            )}

            {/* Meta */}
            <div style={{
              fontSize: '0.9rem',
              color: '#64748b',
              marginBottom: '1.5rem'
            }}>
              <span>{selectedArticle.author}</span>
              <span style={{ margin: '0 0.5rem' }}>·</span>
              <span>{selectedArticle.category}</span>
              <span style={{ margin: '0 0.5rem' }}>·</span>
              <span>{new Date(selectedArticle.created_at).toLocaleDateString()}</span>
            </div>

            {/* Excerpt */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginBottom: '0.5rem' }}>
                Extracto
              </label>
              {editMode ? (
                <textarea
                  value={editExcerpt}
                  onChange={(e) => setEditExcerpt(e.target.value)}
                  style={{
                    width: '100%',
                    height: '80px',
                    fontSize: '1rem',
                    color: '#475569',
                    border: '2px solid #3b82f6',
                    borderRadius: '8px',
                    padding: '0.75rem',
                    resize: 'vertical'
                  }}
                />
              ) : (
                <p style={{
                  fontSize: '1rem',
                  color: '#475569',
                  fontStyle: 'italic',
                  background: '#f1f5f9',
                  padding: '1rem',
                  borderRadius: '8px'
                }}>
                  {selectedArticle.excerpt}
                </p>
              )}
            </div>

            {/* Content */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginBottom: '0.5rem' }}>
                Contenido
              </label>
              {editMode ? (
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  style={{
                    width: '100%',
                    height: '400px',
                    fontSize: '0.9rem',
                    fontFamily: 'monospace',
                    border: '2px solid #3b82f6',
                    borderRadius: '8px',
                    padding: '1rem',
                    resize: 'vertical'
                  }}
                />
              ) : (
                <div
                  style={{
                    background: 'white',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    lineHeight: '1.7',
                    fontSize: '1rem'
                  }}
                  dangerouslySetInnerHTML={{ __html: selectedArticle.content || '' }}
                />
              )}
            </div>

            {/* Save Edit Button */}
            {editMode && (
              <button
                onClick={handleSaveEdit}
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  marginBottom: '2rem'
                }}
              >
                Guardar Cambios
              </button>
            )}

            {/* Review Notes */}
            {(selectedArticle.status === 'pending_review' || selectedArticle.status === 'approved') && !editMode && (
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.85rem', color: '#64748b', display: 'block', marginBottom: '0.5rem' }}>
                  Notas de revisión (opcional)
                </label>
                <textarea
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="Añade notas sobre la revisión..."
                  style={{
                    width: '100%',
                    height: '80px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '0.75rem',
                    fontSize: '0.9rem',
                    resize: 'vertical'
                  }}
                />
              </div>
            )}

            {/* Actions */}
            {!editMode && (
              <div style={{
                display: 'flex',
                gap: '1rem',
                padding: '1.5rem',
                background: 'white',
                borderRadius: '12px',
                border: '1px solid #e2e8f0'
              }}>
                {selectedArticle.status === 'pending_review' && (
                  <>
                    <button
                      onClick={() => handleAction('approve')}
                      style={{
                        flex: 1,
                        padding: '1rem',
                        background: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >
                      ✅ Aprobar
                    </button>
                    <button
                      onClick={() => handleAction('reject')}
                      style={{
                        flex: 1,
                        padding: '1rem',
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >
                      ❌ Rechazar
                    </button>
                  </>
                )}

                {selectedArticle.status === 'approved' && (
                  <button
                    onClick={() => handleAction('publish')}
                    style={{
                      flex: 1,
                      padding: '1rem',
                      background: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    📰 Publicar
                  </button>
                )}

                <button
                  onClick={handleDelete}
                  style={{
                    padding: '1rem',
                    background: 'white',
                    color: '#ef4444',
                    border: '1px solid #ef4444',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    cursor: 'pointer'
                  }}
                >
                  Eliminar
                </button>
              </div>
            )}

            {/* Previous Review Notes */}
            {selectedArticle.review_notes && (
              <div style={{
                marginTop: '1.5rem',
                padding: '1rem',
                background: '#fef3c7',
                borderRadius: '8px',
                fontSize: '0.9rem'
              }}>
                <strong>Notas anteriores:</strong>
                <p style={{ marginTop: '0.5rem' }}>{selectedArticle.review_notes}</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
