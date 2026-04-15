'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { mockArticles } from '@/lib/mockData';
import {
  PlusCircle, BookOpen, Clock, CheckCircle, TrendingUp,
  Edit3, Eye, Trash2, Star, User
} from 'lucide-react';
import styles from './page.module.css';

export default function RedatorPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push('/entrar');
  }, [user, loading, router]);

  const myArticles = mockArticles.filter((_, i) => i < 3); // mock: user's articles
  const stats = {
    published: myArticles.filter(a => a.status === 'published').length,
    pending: 1,
    total: myArticles.length + 1,
    views: myArticles.reduce((sum, a) => sum + (a.views || 0), 0),
  };

  if (loading || !user) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <div className="skeleton" style={{ width: 200, height: 24 }} />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className={styles.avatarLarge}>{user.name.charAt(0)}</div>
            <div>
              <p className={styles.headerGreet}>Olá, {user.name.split(' ')[0]}! 👋</p>
              <h1 className={styles.headerTitle}>Meu Painel de Redator</h1>
              {user.turma && <p className={styles.headerTurma}>{user.turma} · Colégio Marista</p>}
            </div>
          </div>
          <Link href="/redator/nova" className="btn btn-accent btn-lg" id="redator-new-article">
            <PlusCircle size={18} /> Nova Matéria
          </Link>
        </div>
      </div>

      <div className="container section-sm">

        {/* Stats */}
        <div className={styles.statsGrid}>
          {[
            { label: 'Publicadas', value: stats.published, icon: <CheckCircle size={22} />, color: 'var(--color-success)' },
            { label: 'Pendentes', value: stats.pending, icon: <Clock size={22} />, color: 'var(--color-pending)' },
            { label: 'Total Enviadas', value: stats.total, icon: <BookOpen size={22} />, color: 'var(--color-primary)' },
            { label: 'Visualizações', value: stats.views, icon: <Eye size={22} />, color: 'var(--color-gold)' },
          ].map((stat, i) => (
            <div key={i} className={styles.statCard}>
              <div className={styles.statIcon} style={{ background: `${stat.color}15`, color: stat.color }}>
                {stat.icon}
              </div>
              <div>
                <div className={styles.statValue}>{stat.value.toLocaleString('pt-BR')}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* My Articles */}
        <div className={styles.section}>
          <div className="section-header">
            <h2 className="section-title">Minhas Matérias</h2>
            <Link href="/redator/nova" className="btn btn-primary btn-sm" id="redator-new-article-2">
              <PlusCircle size={14} /> Nova
            </Link>
          </div>

          {/* Pending item (mock) */}
          <div className={`${styles.articleRow} ${styles.pendingRow}`}>
            <div className={styles.articleRowInfo}>
              <span className="badge badge-pending"><Clock size={11} /> Pendente</span>
              <h3 className={styles.articleRowTitle}>Os Impactos do Celular na Aprendizagem</h3>
              <p className={styles.articleRowMeta}>Enviado em 12/11/2025</p>
            </div>
            <div className={styles.articleRowActions}>
              <button className="btn btn-ghost btn-sm" title="Editar" id="redator-edit-pending">
                <Edit3 size={15} />
              </button>
            </div>
          </div>

          {myArticles.map(article => (
            <div key={article.id} className={styles.articleRow}>
              <div className={styles.articleRowInfo}>
                <span className="badge badge-published"><CheckCircle size={11} /> Publicado</span>
                <h3 className={styles.articleRowTitle}>{article.title}</h3>
                <div className={styles.articleRowMeta}>
                  <span>{new Date(article.date).toLocaleDateString('pt-BR')}</span>
                  <span><Eye size={12} /> {article.views} views</span>
                </div>
              </div>
              <div className={styles.articleRowActions}>
                <Link href={`/materias/${article.slug}`} className="btn btn-ghost btn-sm" title="Ver" id={`redator-view-${article.id}`}>
                  <Eye size={15} />
                </Link>
                <button className="btn btn-ghost btn-sm" title="Editar" id={`redator-edit-${article.id}`}>
                  <Edit3 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Ranking / Gamification */}
        <div className={styles.section}>
          <h2 className="section-title">🏆 Ranking de Redatores</h2>
          <div className={styles.rankingList}>
            {[
              { pos: 1, name: 'Ana Carolina Silva', articles: 8, views: 889, badge: '👑' },
              { pos: 2, name: 'Pedro Henrique Matos', articles: 5, views: 605, badge: '🥈' },
              { pos: 3, name: 'Beatriz Oliveira', articles: 4, views: 427, badge: '🥉' },
              { pos: 4, name: user.name, articles: stats.total, views: stats.views, badge: '' },
            ].map(r => (
              <div key={r.pos} className={`${styles.rankRow} ${r.name === user.name ? styles.rankRowMe : ''}`}>
                <div className={styles.rankPos}>{r.badge || `#${r.pos}`}</div>
                <div className={styles.rankAvatar}>{r.name.charAt(0)}</div>
                <div className={styles.rankInfo}>
                  <span className={styles.rankName}>{r.name}</span>
                  {r.name === user.name && <span className={styles.rankYou}>Você</span>}
                </div>
                <div className={styles.rankStats}>
                  <span><BookOpen size={13} /> {r.articles} matérias</span>
                  <span><Eye size={13} /> {r.views} views</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
