'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { mockTags } from '@/lib/mockData';
import { ArrowLeft, PlusCircle, X, Image, Send, Eye } from 'lucide-react';
import styles from './page.module.css';

export default function NovaMateria() {
  const { user } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    tags: [] as string[],
    tagInput: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = (field: string, value: any) => setForm(p => ({ ...p, [field]: value }));

  const addTag = (tag: string) => {
    const t = tag.trim().toLowerCase();
    if (t && !form.tags.includes(t) && form.tags.length < 5) {
      update('tags', [...form.tags, t]);
      update('tagInput', '');
    }
  };

  const removeTag = (tag: string) => update('tags', form.tags.filter(t => t !== tag));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.content) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200)); // simulate save
    setSuccess(true);
    setLoading(false);
    setTimeout(() => router.push('/redator'), 2000);
  };

  if (!user) {
    return (
      <div className={styles.authWall}>
        <h2>Você precisa estar logado para escrever uma matéria.</h2>
        <Link href="/entrar" className="btn btn-primary">Entrar</Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className={styles.successState}>
        <div className={styles.successIcon}>✅</div>
        <h2>Matéria enviada para revisão!</h2>
        <p>Nossa equipe vai revisar e publicar em breve. Você será notificado.</p>
        <Link href="/redator" className="btn btn-primary">Voltar ao painel</Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.editorHeader}>
        <div className="container">
          <Link href="/redator" className={styles.backLink}>
            <ArrowLeft size={16} /> Meu Painel
          </Link>
          <h1 className={styles.editorTitle}>Nova Matéria</h1>
          <div className={styles.headerActions}>
            <button className="btn btn-ghost btn-sm" id="editor-preview" disabled>
              <Eye size={15} /> Preview
            </button>
            <button
              className="btn btn-accent"
              onClick={handleSubmit}
              disabled={loading || !form.title || !form.content}
              id="editor-submit"
            >
              {loading ? <span className={styles.spinner} /> : <><Send size={16} /> Enviar para Revisão</>}
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <form className={styles.editorLayout} onSubmit={handleSubmit}>

          {/* Main Editor */}
          <div className={styles.editorMain}>
            {/* Title */}
            <div className={styles.titleField}>
              <input
                type="text"
                className={styles.titleInput}
                placeholder="Título da matéria..."
                value={form.title}
                onChange={e => update('title', e.target.value)}
                id="editor-title"
                maxLength={120}
                required
              />
              <div className={styles.titleCount}>{form.title.length}/120</div>
            </div>

            {/* Excerpt */}
            <div className="form-group" style={{ marginBottom: 'var(--space-lg)' }}>
              <label className="form-label" htmlFor="editor-excerpt">Resumo (subtítulo)</label>
              <textarea
                id="editor-excerpt"
                className="form-input"
                placeholder="Um resumo convincente da sua matéria (aparece nos cards)..."
                value={form.excerpt}
                onChange={e => update('excerpt', e.target.value)}
                rows={2}
                maxLength={280}
              />
            </div>

            {/* Image upload (mock) */}
            <div className={styles.imageUpload} id="editor-image-upload">
              <div className={styles.imageUploadIcon}><Image size={28} /></div>
              <div className={styles.imageUploadText}>
                <strong>Clique para adicionar imagem de capa</strong>
                <small>JPG, PNG — máx. 5MB</small>
              </div>
            </div>

            {/* Content */}
            <div className="form-group">
              <label className="form-label" htmlFor="editor-content">Conteúdo da matéria</label>
              <textarea
                id="editor-content"
                className={`form-input ${styles.contentTextarea}`}
                placeholder="Escreva aqui o conteúdo completo da sua matéria. Conte a história com detalhes, inclua citações e contexto..."
                value={form.content}
                onChange={e => update('content', e.target.value)}
                required
              />
            </div>
          </div>

          {/* Sidebar */}
          <aside className={styles.editorSidebar}>

            {/* Author info */}
            <div className={styles.sideCard}>
              <div className={styles.sideCardTitle}>Autor</div>
              <div className={styles.authorDisplay}>
                <div className={styles.authorAvatar}>{user.name.charAt(0)}</div>
                <div>
                  <div className={styles.authorName}>{user.name}</div>
                  {user.turma && <div className={styles.authorTurma}>{user.turma}</div>}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className={styles.sideCard}>
              <div className={styles.sideCardTitle}>Tags (máx. 5)</div>
              {/* Selected tags */}
              <div className={styles.selectedTags}>
                {form.tags.map(tag => (
                  <span key={tag} className={`tag active ${styles.selectedTag}`}>
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)}>
                      <X size={11} />
                    </button>
                  </span>
                ))}
              </div>
              {/* Input */}
              {form.tags.length < 5 && (
                <div className={styles.tagInputRow}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Adicionar tag..."
                    value={form.tagInput}
                    onChange={e => update('tagInput', e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(form.tagInput); } }}
                    id="editor-tag-input"
                  />
                  <button type="button" className="btn btn-primary btn-sm" onClick={() => addTag(form.tagInput)}>
                    <PlusCircle size={14} />
                  </button>
                </div>
              )}
              {/* Suggestions */}
              <div className={styles.tagSuggestions}>
                <div className={styles.suggestLabel}>Sugestões:</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {mockTags.filter(t => !form.tags.includes(t.name)).slice(0, 6).map(t => (
                    <button
                      key={t.id}
                      type="button"
                      className="tag"
                      onClick={() => addTag(t.name)}
                      id={`editor-tag-suggest-${t.slug}`}
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={`btn btn-primary ${styles.sideSubmit}`}
              disabled={loading || !form.title || !form.content}
              id="editor-submit-sidebar"
            >
              {loading ? <span className={styles.spinner} /> : <><Send size={16} /> Enviar para Revisão</>}
            </button>
            <p className={styles.submitNote}>
              Sua matéria ficará pendente até ser aprovada por um administrador.
            </p>
          </aside>
        </form>
      </div>
    </div>
  );
}
