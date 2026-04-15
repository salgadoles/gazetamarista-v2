'use client';

import Link from 'next/link';
import { mockArticles, mockTags, mockEvents } from '@/lib/mockData';
import ArticleCard from '@/components/articles/ArticleCard';
import { useRadio } from '@/context/RadioContext';
import {
  Radio, Newspaper, Calendar, ArrowRight, ChevronRight,
  Mic2, Zap, Users, TrendingUp
} from 'lucide-react';
import styles from './page.module.css';

export default function HomePage() {
  const { isPlaying, toggle, show } = useRadio();
  const featured = mockArticles.find(a => a.featured) || mockArticles[0];
  const latestArticles = mockArticles.filter(a => a.id !== featured.id).slice(0, 6);
  const sidebarArticles = mockArticles.filter(a => a.id !== featured.id).slice(0, 4);
  const popularTags = mockTags.slice(0, 8);

  const handleRadioClick = () => {
    show();
    if (!isPlaying) toggle();
  };

  return (
    <div className={styles.page}>

      {/* =================== HERO =================== */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroGrid}>
            {/* Main hero card */}
            <div className={styles.heroMain}>
              <ArticleCard article={featured} variant="hero" />
            </div>

            {/* Sidebar: latest + quick access */}
            <aside className={styles.heroSidebar}>
              {/* Live radio teaser */}
              <button
                className={styles.radioTeaser}
                onClick={handleRadioClick}
                id="home-radio-teaser"
              >
                <div className={styles.radioTeaserLeft}>
                  <div className={`${styles.radioTeaserIcon} ${isPlaying ? styles.radioTeaserActive : ''}`}>
                    <Radio size={22} />
                    {isPlaying && (
                      <div className={styles.teaserWaves}>
                        <span /><span /><span /><span />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className={styles.radioTeaserLabel}>
                      {isPlaying ? (
                        <><span className="pulse-dot" />AO VIVO</>
                      ) : (
                        'RÁDIO CONEXÃO'
                      )}
                    </div>
                    <div className={styles.radioTeaserProgram}>
                      {isPlaying ? 'Tocando agora' : 'Clique para ouvir'}
                    </div>
                  </div>
                </div>
                <ChevronRight size={18} className={styles.radioTeaserArrow} />
              </button>

              {/* More articles */}
              <div className={styles.sidebarTitle}>Últimas Notícias</div>
              <div className={styles.sidebarList}>
                {sidebarArticles.map(article => (
                  <ArticleCard key={article.id} article={article} variant="compact" />
                ))}
              </div>

              {/* View all */}
              <Link href="/materias" className={`btn btn-outline ${styles.viewAllBtn}`} id="home-view-all-articles">
                Ver todas as matérias <ArrowRight size={16} />
              </Link>
            </aside>
          </div>
        </div>
      </section>

      {/* =================== BREAKING TICKER =================== */}
      <div className={styles.ticker}>
        <div className={styles.tickerLabel}><Zap size={14} /> DESTAQUE</div>
        <div className={styles.tickerTrack}>
          <div className={styles.tickerContent}>
            {mockArticles.map(a => (
              <Link key={a.id} href={`/materias/${a.slug}`} className={styles.tickerItem}>
                {a.title}
              </Link>
            ))}
            {/* Duplicate for seamless loop */}
            {mockArticles.map(a => (
              <Link key={`dup-${a.id}`} href={`/materias/${a.slug}`} className={styles.tickerItem}>
                {a.title}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* =================== LATEST ARTICLES =================== */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Matérias Recentes</h2>
            <Link href="/materias" className="btn btn-ghost btn-sm" id="home-latest-viewall">
              Ver todas <ArrowRight size={14} />
            </Link>
          </div>
          <div className={`grid grid-3 stagger ${styles.articlesGrid}`}>
            {latestArticles.map(article => (
              <ArticleCard key={article.id} article={article} variant="default" className={styles.articleCard} />
            ))}
          </div>
        </div>
      </section>

      {/* =================== TAGS SECTION =================== */}
      <section className={styles.tagsSection}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Explorar por Tema</h2>
          </div>
          <div className={styles.tagCloud}>
            {mockTags.map(tag => (
              <Link
                key={tag.id}
                href={`/materias?tag=${tag.slug}`}
                className="tag"
                id={`home-tag-${tag.slug}`}
              >
                {tag.name}
                <span className={styles.tagCount}>{tag.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =================== RADIO + JORNAL + EVENTS =================== */}
      <section className="section">
        <div className="container">
          <div className={styles.tripleGrid}>

            {/* Radio Card */}
            <div className={`card ${styles.radioCard}`}>
              <div className={styles.radioCardBg} />
              <div className={styles.radioCardContent}>
                <div className={styles.radioCardIcon}>
                  <Mic2 size={28} />
                </div>
                <h3 className={styles.radioCardTitle}>Rádio Conexão</h3>
                <p className={styles.radioCardDesc}>
                  Sua escola no ar! Músicas, notícias e entretenimento ao vivo.
                </p>
                <button
                  className={`btn ${styles.radioCardBtn}`}
                  onClick={handleRadioClick}
                  id="home-radio-card-btn"
                >
                  {isPlaying ? <><Radio size={16} /> Ouvindo ao Vivo</> : <><Radio size={16} /> Ouvir Agora</>}
                </button>
                <Link href="/radio" className={styles.radioCardLink}>
                  Ver programação <ChevronRight size={14} />
                </Link>
              </div>
            </div>

            {/* Jornal Card */}
            <div className={`card ${styles.jornalCard}`}>
              <div className={styles.jornalCardTop}>
                <Newspaper size={24} />
                <span className="badge badge-featured">Edição 12</span>
              </div>
              <h3 className={styles.jornalCardTitle}>Jornal Conexão</h3>
              <p className={styles.jornalCardDate}>Novembro 2025</p>
              <p className={styles.jornalCardDesc}>
                A edição mais recente do jornal impresso agora disponível no formato digital.
              </p>
              <Link href="/jornal" className="btn btn-primary btn-sm" id="home-jornal-btn">
                <Newspaper size={15} /> Ler Agora
              </Link>
            </div>

            {/* Events Card */}
            <div className={`card ${styles.eventsCard}`}>
              <div className="section-header" style={{ marginBottom: 'var(--space-md)' }}>
                <h3 className={`section-title ${styles.eventsTitle}`}>
                  <Calendar size={18} /> Próximos Eventos
                </h3>
              </div>
              <div className={styles.eventsList}>
                {mockEvents.map(ev => (
                  <div key={ev.id} className={styles.eventItem}>
                    <div className={styles.eventDate}>
                      <span className={styles.eventDay}>
                        {new Date(ev.date).toLocaleDateString('pt-BR', { day: '2-digit' })}
                      </span>
                      <span className={styles.eventMonth}>
                        {new Date(ev.date).toLocaleDateString('pt-BR', { month: 'short' })}
                      </span>
                    </div>
                    <div className={styles.eventInfo}>
                      <div className={styles.eventTitle}>{ev.title}</div>
                      <div className={styles.eventLocation}>{ev.location}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================== CTA - BE A WRITER =================== */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaInner}>
            <div className={styles.ctaLeft}>
              <div className={styles.ctaIcon}><Users size={32} /></div>
              <div>
                <h2 className={styles.ctaTitle}>Seja um Mini Redator!</h2>
                <p className={styles.ctaDesc}>
                  Você tem uma história para contar? Cadastre-se, escreva sua matéria
                  e publique na Gazeta Conexão. Sua voz importa!
                </p>
              </div>
            </div>
            <div className={styles.ctaActions}>
              <Link href="/entrar" className="btn btn-accent btn-lg" id="home-cta-register">
                <Users size={18} /> Quero Participar
              </Link>
              <Link href="/materias" className="btn btn-outline btn-lg" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}>
                <TrendingUp size={18} /> Ver Matérias
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
