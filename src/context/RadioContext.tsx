'use client';

import { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';

interface RadioContextType {
  isPlaying: boolean;
  volume: number;
  isVisible: boolean;
  currentProgram: string;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  setVolume: (v: number) => void;
  show: () => void;
  hide: () => void;
}

const RadioContext = createContext<RadioContextType | null>(null);

const STREAM_URL = 'https://ic1.sndcdn.com/stream-0-0-0-0.mp3'; // fallback stream

export function RadioProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.7);
  const [isVisible, setIsVisible] = useState(true);
  const [currentProgram, setCurrentProgram] = useState('Rádio Conexão ao Vivo');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(STREAM_URL);
    audioRef.current.volume = volume;
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        // silently handle autoplay restrictions
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  };

  const pause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const toggle = () => (isPlaying ? pause() : play());

  const setVolume = (v: number) => {
    setVolumeState(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  return (
    <RadioContext.Provider value={{
      isPlaying, volume, isVisible, currentProgram,
      play, pause, toggle, setVolume,
      show: () => setIsVisible(true),
      hide: () => setIsVisible(false),
    }}>
      {children}
    </RadioContext.Provider>
  );
}

export function useRadio() {
  const ctx = useContext(RadioContext);
  if (!ctx) throw new Error('useRadio must be used within RadioProvider');
  return ctx;
}
