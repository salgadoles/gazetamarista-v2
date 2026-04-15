'use client';

import { useState, useMemo } from 'react';
import { mockArticles, mockTags } from '@/lib/mockData';
import ArticleCard from '@/components/articles/ArticleCard';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import styles from './page.module.css';

export default function MateriasPage() {
  const [query, setQuery] = useState('');
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const toggleTag = (slug: string) => {
    setActiveTags(prev =>
      prev.includes(slug) ? prev.filter(t => t !== slug) : [...prev, slug]
    );
  };

  const filtered = useMemo(() => {
    return mockArticles.filter(a => {
      const matchesQuery = !query || [a.title, a.excerpt, a.authorName]
        .some(field => field.toLowerCase().includes(query.toLowerCase()));
      const matchesTags = activeTags.length === 0 ||
        activeTags.every(tag => a.tags.some(t => t.toLowerCase().replace(/\s/g, '-') === tag));
      return matchesQuery && matchesTags;
    });
  }, [query, activeTags]);

  const clearFilters = () => {
    setQuery('');
    setActiveTags([]);
  };

  const hasFilters = query || activeTags.length > 0;

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.pageTitle}>Matérias</h1>
          <p className={styles.pageSubtitle}>
            Conteúdos produzidos pelos alunos do projeto Conexão
          </p>
        </div>
      </div>

      <div className="container section-sm">
        {/* Filters */}
        <div className={styles.filtersBar}>
          <div className={`search-wrapper ${styles.searchWrapper}`}>
            <Search size={18} className="search-icon" />
            <input
              type="search"
              placeholder="Buscar matérias, autores..."
              className="search-input"
              value={query}
              onChange={e => setQuery(e.target.value)}
              id="materias-search"
            />
          </div>
          {hasFilters && (
            <button className="btn btn-ghost btn-sm" onClick={clearFilters} id="materias-clear-filters">
              <X size={14} /> Limpar filtros
            </button>
          )}
        </div>

        {/* Tags */}
        <div className={styles.tagsRow}>
          <SlidersHorizontal size={16} className={styles.filterIcon} />
          {mockTags.map(tag => (
            <button
              key={tag.id}
              className={`tag ${activeTags.includes(tag.slug) ? 'active' : ''}`}
              onClick={() => toggleTag(tag.slug)}
              id={`filter-tag-${tag.slug}`}
            >
              {tag.name}
            </button>
          ))}
        </div>

        {/* Results info */}
        <div className={styles.resultsInfo}>
          <span>{filtered.length} {filtered.length === 1 ? 'matéria encontrada' : 'matérias encontradas'}</span>
          {activeTags.length > 0 && (
            <span className={styles.activeTagsDisplay}>
              Filtrando por: {activeTags.map(t => (
                <span key={t} className="tag tag-accent" style={{ marginLeft: 4 }}>
                  {t} <X size={10} style={{ cursor: 'pointer' }} onClick={() => toggleTag(t)} />
                </span>
              ))}
            </span>
          )}
        </div>

        {/* Articles Grid */}
        {filtered.length > 0 ? (
          <div className={`grid grid-3 ${styles.grid}`}>
            {filtered.map(article => (
              <ArticleCard key={article.id} article={article} variant="default" />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📰</div>
            <h3>Nenhuma matéria encontrada</h3>
            <p>Tente ajustar os filtros ou o termo de busca.</p>
            <button className="btn btn-primary" onClick={clearFilters}>
              Ver todas as matérias
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
