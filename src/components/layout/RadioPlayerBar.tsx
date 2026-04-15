'use client';

import { useRadio } from '@/context/RadioContext';
import { Play, Pause, Volume2, VolumeX, X, Radio, Mic2 } from 'lucide-react';
import styles from './RadioPlayerBar.module.css';

export default function RadioPlayerBar() {
  const { isPlaying, volume, isVisible, currentProgram, toggle, setVolume, hide } = useRadio();

  if (!isVisible) return null;

  return (
    <div className={styles.bar} id="radio-player-bar">
      {/* Animated background */}
      {isPlaying && <div className={styles.barBg} />}

      <div className={`container ${styles.inner}`}>
        {/* Left: Station Info */}
        <div className={styles.stationInfo}>
          <div className={`${styles.radioIcon} ${isPlaying ? styles.radioIconActive : ''}`}>
            <Radio size={18} />
          </div>
          <div className={styles.textGroup}>
            <div className={styles.liveTag}>
              {isPlaying && <span className={styles.liveDot} />}
              {isPlaying ? 'AO VIVO' : 'RÁDIO CONEXÃO'}
            </div>
            <div className={styles.programName}>{currentProgram}</div>
          </div>
        </div>

        {/* Center: Wave Animation */}
        {isPlaying && (
          <div className={styles.waves}>
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className={styles.waveBar} style={{ animationDelay: `${i * 80}ms` }} />
            ))}
          </div>
        )}

        {/* Marista Badge (center-right, desktop) */}
        <div className={styles.badge}>
          <Mic2 size={12} />
          <span>Col. Marista Irmão Acácio</span>
        </div>

        {/* Controls */}
        <div className={styles.controls}>
          {/* Volume */}
          <div className={styles.volumeGroup}>
            <button
              className={styles.volIcon}
              onClick={() => setVolume(volume === 0 ? 0.7 : 0)}
              id="radio-mute-toggle"
              title={volume === 0 ? 'Ligar som' : 'Silenciar'}
            >
              {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={e => setVolume(parseFloat(e.target.value))}
              className={styles.volumeSlider}
              id="radio-volume"
              title="Volume"
            />
          </div>

          {/* Play/Pause */}
          <button
            className={`${styles.playBtn} ${isPlaying ? styles.playing : ''}`}
            onClick={toggle}
            id="radio-play-pause"
            title={isPlaying ? 'Pausar' : 'Reproduzir'}
          >
            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
          </button>

          {/* Close */}
          <button
            className={styles.closeBtn}
            onClick={hide}
            id="radio-close"
            title="Fechar player"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
