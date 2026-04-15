'use client';

import { useRadio } from '@/context/RadioContext';
import { mockPrograms } from '@/lib/mockData';
import { Radio, Play, Pause, Mic2, Clock, Calendar, Headphones } from 'lucide-react';
import Link from 'next/link';
import styles from './page.module.css';

const mockPodcasts = [
  { id: 'p1', title: 'Entrevista com a Diretora', duration: '18:42', date: '2025-11-10', host: 'Ana Carolina', listens: 234 },
  { id: 'p2', title: 'Debate: Tecnologia e Educação', duration: '25:15', date: '2025-10-28', host: 'Pedro Henrique', listens: 187 },
  { id: 'p3', title: 'Especial Festival Cultural', duration: '32:08', date: '2025-10-15', host: 'Equipe Conexão', listens: 312 },
  { id: 'p4', title: 'Papo com o Grêmio Estudantil', duration: '21:33', date: '2025-09-30', host: 'Beatriz Oliveira', listens: 145 },
];

export default function RadioPage() {
  const { isPlaying, toggle, volume, setVolume } = useRadio();

  return (
    <div className={styles.page}>

      {/* Hero Player */}
      <section className={styles.heroSection}>
        <div className={styles.heroBg} />
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroLeft}>
            <div className={styles.liveChip}>
              {isPlaying && <span className="pulse-dot" />}
              {isPlaying ? 'AO VIVO' : 'RÁDIO CONEXÃO'}
            </div>
            <h1 className={styles.heroTitle}>Rádio Conexão</h1>
            <p className={styles.heroDesc}>
              A voz dos alunos do Colégio Marista Irmão Acácio.
              Música, notícias, entrevistas e muito mais — direto de Londrina para você.
            </p>

            {/* Main Player */}
            <div className={styles.mainPlayer}>
              <div className={styles.playerWaves}>
                {isPlaying && Array.from({ length: 20 }).map((_, i) => (
                  <span key={i} className={styles.waveBar} style={{ animationDelay: `${i * 60}ms` }} />
                ))}
                {!isPlaying && (
                  <div className={styles.playerPaused}>
                    <Radio size={32} />
                  </div>
                )}
              </div>
              <div className={styles.playerControls}>
                <button
                  className={`${styles.playBtn} ${isPlaying ? styles.playBtnActive : ''}`}
                  onClick={toggle}
                  id="radio-page-play"
                >
                  {isPlaying ? <Pause size={28} fill="white" /> : <Play size={28} fill="white" />}
                </button>
                <div className={styles.volumeControl}>
                  <span className={styles.volumeLabel}>Volume</span>
                  <input
                    type="range"
                    min={0} max={1} step={0.01}
                    value={volume}
                    onChange={e => setVolume(parseFloat(e.target.value))}
                    className={styles.volumeSlider}
                    id="radio-page-volume"
                  />
                  <span className={styles.volumeValue}>{Math.round(volume * 100)}%</span>
                </div>
              </div>
              <p className={styles.playerInfo}>
                {isPlaying
                  ? '🎵 Transmissão ao vivo · Colégio Marista Irmão Acácio'
                  : 'Clique em play para iniciar a transmissão ao vivo'}
              </p>
            </div>
          </div>

          {/* Current program */}
          <div className={styles.heroRight}>
            <div className={styles.nowPlaying}>
              <div className={styles.nowPlayingLabel}><Clock size={14} /> NA GRADE AGORA</div>
              <div className={styles.nowPlayingTitle}>Acordes da Manhã</div>
              <div className={styles.nowPlayingHost}>com Pedro Henrique</div>
              <div className={styles.nowPlayingTime}>07h00 – 08h00</div>
              <div className={styles.nowPlayingNext}>
                <span>A seguir:</span> Notícias em Foco · 08h00
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grade de Programação */}
      <section className="section" id="programacao">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Grade de Programação</h2>
            <span className="badge badge-live"><span className="pulse-dot" /> Ao Vivo</span>
          </div>
          <div className={styles.scheduleGrid}>
            {mockPrograms.map(program => (
              <div key={program.id} className={styles.scheduleCard}>
                <div className={styles.scheduleTime}>
                  <Clock size={15} />
                  {program.time}
                </div>
                <div className={styles.scheduleInfo}>
                  <h3 className={styles.scheduleTitle}>{program.title}</h3>
                  <div className={styles.scheduleMeta}>
                    <span><Mic2 size={13} /> {program.host}</span>
                    <span><Calendar size={13} /> {program.days}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Podcasts */}
      <section className="section" id="podcasts" style={{ background: 'var(--color-surface)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Episódios Gravados</h2>
            <span className={styles.podcastsLabel}><Headphones size={15} /> Ouça quando quiser</span>
          </div>
          <div className={styles.podcastsList}>
            {mockPodcasts.map(ep => (
              <div key={ep.id} className={styles.podcastCard}>
                <div className={styles.podcastIcon}>
                  <Mic2 size={20} />
                </div>
                <div className={styles.podcastInfo}>
                  <h3 className={styles.podcastTitle}>{ep.title}</h3>
                  <div className={styles.podcastMeta}>
                    <span><Mic2 size={12} /> {ep.host}</span>
                    <span><Clock size={12} /> {ep.duration}</span>
                    <span><Calendar size={12} /> {new Date(ep.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</span>
                    <span><Headphones size={12} /> {ep.listens} ouvintes</span>
                  </div>
                </div>
                <button
                  className={`btn btn-outline btn-sm ${styles.podcastPlayBtn}`}
                  id={`podcast-play-${ep.id}`}
                >
                  <Play size={14} /> Ouvir
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
