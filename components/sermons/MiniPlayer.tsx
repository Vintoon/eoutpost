"use client";

import Image from "next/image";
import { Pause, Play, X } from "lucide-react";
import { useAudioPlayer } from "@/lib/audio-player-context";

function fmt(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function MiniPlayer() {
  const { current, isPlaying, currentTime, duration, toggle, seek, close } = useAudioPlayer();

  if (!current) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-outpost-navy/10 bg-white/95 backdrop-blur-md shadow-glass-lg">
      <div className="section flex items-center gap-4 !py-3">
        {current.thumbnail && (
          <div className="relative hidden h-10 w-10 shrink-0 overflow-hidden rounded-lg sm:block">
            <Image src={current.thumbnail} alt={current.title} fill className="object-cover" />
          </div>
        )}
        <button
          onClick={toggle}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-outpost-gradient text-white"
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
        </button>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-outpost-navy">{current.title}</p>
          <p className="truncate text-xs text-outpost-navy/50">{current.speaker}</p>
        </div>

        <div className="hidden flex-1 items-center gap-2 sm:flex">
          <span className="w-10 shrink-0 text-right text-xs text-outpost-navy/50">{fmt(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={(e) => seek(Number(e.target.value))}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-outpost-navy/10 accent-outpost-blue"
          />
          <span className="w-10 shrink-0 text-xs text-outpost-navy/50">{fmt(duration)}</span>
        </div>

        <button
          onClick={close}
          aria-label="Close player"
          className="shrink-0 rounded-full p-2 text-outpost-navy/40 hover:bg-outpost-navy/5"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
