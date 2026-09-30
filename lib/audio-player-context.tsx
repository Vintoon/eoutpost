"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

export interface PlayableSermon {
  id: string;
  title: string;
  speaker: string;
  audio_url: string;
  thumbnail?: string;
}

interface AudioPlayerState {
  current: PlayableSermon | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  play: (sermon: PlayableSermon) => void;
  toggle: () => void;
  seek: (time: number) => void;
  close: () => void;
}

const AudioPlayerContext = createContext<AudioPlayerState | null>(null);

export function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [current, setCurrent] = useState<PlayableSermon | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;
    const onTime = () => setCurrentTime(audio.currentTime);
    const onLoaded = () => setDuration(audio.duration || 0);
    const onEnd = () => setIsPlaying(false);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnd);
      audio.pause();
    };
  }, []);

  const play = useCallback((sermon: PlayableSermon) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (current?.id !== sermon.id) {
      audio.src = sermon.audio_url;
      setCurrent(sermon);
    }
    audio.play();
    setIsPlaying(true);
  }, [current]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !current) return;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, [current]);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setCurrentTime(time);
  }, []);

  const close = useCallback(() => {
    const audio = audioRef.current;
    if (audio) audio.pause();
    setIsPlaying(false);
    setCurrent(null);
  }, []);

  return (
    <AudioPlayerContext.Provider value={{ current, isPlaying, currentTime, duration, play, toggle, seek, close }}>
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const ctx = useContext(AudioPlayerContext);
  if (!ctx) throw new Error("useAudioPlayer must be used within AudioPlayerProvider");
  return ctx;
}
