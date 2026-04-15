'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { mockArticles } from '@/lib/mockData';
import { 
  Users, CheckCircle, Clock, Tag, Settings, Edit3, Trash2, 
  ShieldAlert, BookOpen, AlertCircle
} from 'lucide-react';
import styles from './page.module.css';

// Mock summary data
const stats = {
  pendingArticles: mockArticles.filter(a => a.status === 'pending').length || 3, // mock
  publishedArticles: mockArticles.filter(a => a.status === 'published').length,
  totalUsers: 45,
  activeTags: 12
};

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/entrar');
      } else if (user.role !== 'admin') {
        router.push('/redator'); // Redirect non-admins
      }
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== 'admin') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <div className="skeleton" style={{ width: 200, height: 24 }} />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      
      {/* Sidebar Navigation */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarBrand}>Painel Admin</div>
        <nav className={styles.sidebarNav}>
          <Link href="/admin" className={`${styles.navLink} ${styles.navLinkActive}`}>
            <Settings size={18} /> Visão Geral
          </Link>
          <button className={styles.navLink} disabled title="Em construção">
            <BookOpen size={18} /> Matérias
          </button>
          <button className={styles.navLink} disabled title="Em construção">
            <Users size={18} /> Usuários
          </button>
          <button className={styles.navLink} disabled title="Em construção">
            <Tag size={18} /> Tags
          </button>
          <Link href="/" className={styles.navLink} style={{ marginTop: 'auto' }}>
            Voltar ao Site
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>Visão Geral</h1>
            <p className={styles.subtitle}>Gerencie o conteúdo e usuários da Gazeta Conexão.</p>
          </div>
          <div className={styles.userInfo}>
            <div className={styles.userAvatar}>{user.name.charAt(0)}</div>
            <span>{user.name}</span>
          </div>
        </header>

        <div className={styles.content}>
          
          {/* Action Required Banner */}
          {stats.pendingArticles > 0 && (
            <div className={styles.alertBanner}>
              <div className={styles.alertIcon}><AlertCircle size={20} /></div>
              <div>
                <strong>Atenção Administrativa</strong>
                <p>Existem {stats.pendingArticles} matérias aguardando revisão e aprovação.</p>
              </div>
              <button className="btn btn-primary btn-sm" style={{ marginLeft: 'auto' }}>Revisar Agora</button>
            </div>
          )}

          {/* Stats Grid */}
          <div className={styles.statsGrid}>
             <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ background: 'rgba(230,51,41,0.1)', color: 'var(--color-accent)' }}>
                <Clock size={24} />
              </div>
              <div className={styles.statInfo}>
                <div className={styles.statValue}>{stats.pendingArticles}</div>
                <div className={styles.statLabel}>Matérias Pendentes</div>
              </div>
            </div>
            
            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ background: 'rgba(22,163,74,0.1)', color: 'var(--color-success)' }}>
                <CheckCircle size={24} />
              </div>
              <div className={styles.statInfo}>
                <div className={styles.statValue}>{stats.publishedArticles}</div>
                <div className={styles.statLabel}>Matérias Publicadas</div>
              </div>
            </div>
            
            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ background: 'rgba(0,48,130,0.1)', color: 'var(--color-primary)' }}>
                <Users size={24} />
              </div>
              <div className={styles.statInfo}>
                <div className={styles.statValue}>{stats.totalUsers}</div>
                <div className={styles.statLabel}>Usuários Registrados</div>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ background: 'rgba(245,166,35,0.1)', color: 'var(--color-gold)' }}>
                <Tag size={24} />
              </div>
              <div className={styles.statInfo}>
                <div className={styles.statValue}>{stats.activeTags}</div>
                <div className={styles.statLabel}>Tags Ativas</div>
              </div>
            </div>
          </div>

          <div className={styles.grid2}>
            
            {/* Recent Pending Articles */}
            <div className={styles.panel}>
              <div className={styles.panelHeader}>
                <h3 className={styles.panelTitle}>Últimas Matérias (Mock)</h3>
                <button className="btn btn-ghost btn-sm">Ver todas</button>
              </div>
              <div className={styles.list}>
                {mockArticles.slice(0, 4).map(article => (
                  <div key={article.id} className={styles.listItem}>
                    <div className={styles.itemInfo}>
                      <div className={styles.itemTitle}>{article.title}</div>
                      <div className={styles.itemMeta}>
                        Por {article.authorName} · {new Date(article.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className={styles.itemActions}>
                      <span className={article.status === 'published' ? 'badge badge-published' : 'badge badge-pending'}>
                        {article.status === 'published' ? 'Publicado' : 'Pendente'}
                      </span>
                      <button className="btn btn-ghost btn-sm" title="Editar"><Edit3 size={15} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Info */}
            <div className={styles.panel}>
              <div className={styles.panelHeader}>
                <h3 className={styles.panelTitle}>Status do Sistema</h3>
              </div>
              <div className={styles.systemInfo}>
                <div className={styles.infoRow}>
                  <span>Versão da Plataforma</span>
                  <strong>v1.0.0</strong>
                </div>
                <div className={styles.infoRow}>
                  <span>Banco de Dados</span>
                  <span className={styles.statusOk}>Conectado</span>
                </div>
                <div className={styles.infoRow}>
                  <span>Storage (Imagens)</span>
                  <span className={styles.statusOk}>Conectado</span>
                </div>
                <div className={styles.infoRow}>
                  <span>Stream de Rádio</span>
                  <span className={styles.statusWarn}>Mock Mode</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
