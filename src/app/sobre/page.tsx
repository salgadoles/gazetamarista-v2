'use client';

import { Newspaper, Users, Rss, Mic2, Star } from 'lucide-react';
import Image from 'next/image';
import styles from './page.module.css';

export default function SobrePage() {
  return (
    <div className={styles.page}>
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.logos}>
            <div className={styles.logoItem}>
              <img src="/images/logo-conexao.png" alt="Projeto Conexão" className={styles.logoImg} />
            </div>
            <div className={styles.logoItem}>
              <img src="/images/logo-gazeta.png" alt="Gazeta Marista" className={styles.logoImg} />
            </div>
          </div>
          <h1 className={styles.title}>Voz, Informação e Comunidade</h1>
          <p className={styles.subtitle}>
            Conheça o projeto que transformou o Colégio Marista Irmão Acácio em um verdadeiro polo de comunicação estudantil sustentável e criativo.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="section container">
        <div className={styles.introGrid}>
          <div className={styles.introText}>
            <h2 className="section-title">O que é o Projeto Conexão?</h2>
            <p>
              O <strong>Projeto Conexão</strong> é uma iniciativa pedagógica e cultural do Colégio Marista Irmão Acácio que nasceu da vontade de integrar as diversas frentes de mídia produzidas pelos nossos alunos. 
            </p>
            <p>
              A <strong>Gazeta Marista</strong>, nossa tradicional revista impressa, uniu forças à <strong>Rádio Escolar</strong> e aos novos meios de mídia digital (Portal, Podcasts e Redes Sociais). O resultado é uma plataforma multimídia alimentada inteiramente pelo talento da nossa comunidade escolar.
            </p>
            <div className={styles.badges}>
              <span className="badge badge-featured">Rádio</span>
              <span className="badge badge-featured">Jornal</span>
              <span className="badge badge-featured">Portal</span>
              <span className="badge badge-featured">Podcast</span>
            </div>
          </div>
          <div className={styles.introVisual}>
            <div className={styles.visualCircle}>
              <Star size={48} color="var(--color-primary)" />
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className={styles.pillarsSection}>
        <div className="container">
          <h2 className="section-title" style={{ color: 'white' }}>Nossos Pilares</h2>
          <div className={`grid grid-3 ${styles.pillarsGrid}`}>
            
            <div className={styles.pillarCard}>
              <div className={styles.pillarIcon} style={{ color: 'var(--color-accent)' }}>
                <Newspaper size={32} />
              </div>
              <h3 className={styles.pillarTitle}>Gazeta Marista</h3>
              <p className={styles.pillarDesc}>
                O jornalismo impresso e digital. Reportagens aprofundadas, crônicas e a cobertura completa dos maiores eventos do colégio, como o Festival Cultural e os Jogos Escolares.
              </p>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarIcon} style={{ color: 'var(--color-success)' }}>
                <Mic2 size={32} />
              </div>
              <h3 className={styles.pillarTitle}>Rádio Conexão</h3>
              <p className={styles.pillarDesc}>
                O som dos recreios e bate-papos exclusivos. Nossos locutores comandam a programação musical e conduzem podcasts que discutem cultura, educação e design thinking.
              </p>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarIcon} style={{ color: 'var(--color-purple)' }}>
                <Users size={32} />
              </div>
              <h3 className={styles.pillarTitle}>Protagonismo Estudantil</h3>
              <p className={styles.pillarDesc}>
                Os "mini redatores" e "jovens locutores" estão à frente de toda a produção. Aqui, o aluno não apenas consome informação, mas é o autor, repórter e protagonista da notícia.
              </p>
            </div>

          </div>
        </div>
      </section>
      
    </div>
  );
}
