"use client";

import Image from "next/image";
import { Clock, Calendar, Youtube, Play, Pause, Headphones } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { Sermon } from "@/data/sermons";
import { useAudioPlayer } from "@/lib/audio-player-context";

export default function SermonCard({ sermon, delay }: { sermon: Sermon; delay?: number }) {
  const isAudio = sermon.sermon_type === "audio" && Boolean(sermon.audio_url);
  const { current, isPlaying, play, toggle } = useAudioPlayer();
  const isThisPlaying = isAudio && current?.id === sermon.id && isPlaying;

  function handlePlayClick() {
    if (!isAudio || !sermon.audio_url) return;
    if (current?.id === sermon.id) {
      toggle();
    } else {
      play({ id: sermon.id, title: sermon.title, speaker: sermon.speaker, audio_url: sermon.audio_url, thumbnail: sermon.thumbnail });
    }
  }

  return (
    <GlassCard delay={delay} className="flex flex-col overflow-hidden !p-0">
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={sermon.thumbnail}
          alt={sermon.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        <button
          onClick={isAudio ? handlePlayClick : undefined}
          className="absolute inset-0 flex items-center justify-center bg-outpost-navy/20 opacity-0 transition-opacity hover:opacity-100"
          aria-label={isAudio ? (isThisPlaying ? "Pause sermon" : "Play sermon") : undefined}
        >
          {isAudio ? (
            isThisPlaying ? (
              <Pause size={44} className="text-white drop-shadow-lg" />
            ) : (
              <Play size={44} className="text-white drop-shadow-lg" />
            )
          ) : (
            <Youtube size={44} className="text-white drop-shadow-lg" />
          )}
        </button>
        <Badge className="absolute left-3 top-3 bg-white/85 text-outpost-navy">
          {sermon.category}
        </Badge>
        <Badge className="absolute right-3 top-3 flex items-center gap-1 bg-white/85 text-outpost-navy">
          {isAudio ? <Headphones size={12} /> : <Youtube size={12} />}
          {isAudio ? "Audio" : "Video"}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 font-display text-lg font-semibold text-outpost-navy">
          {sermon.title}
        </h3>
        <p className="mb-4 text-sm text-outpost-navy/60">{sermon.speaker}</p>
        <div className="mb-5 flex items-center gap-4 text-xs text-outpost-navy/50">
          <span className="flex items-center gap-1">
            <Clock size={14} /> {sermon.duration}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {new Date(sermon.date).toLocaleDateString("en-KE", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
        {isAudio ? (
          <Button onClick={handlePlayClick} variant="secondary" size="sm" className="mt-auto">
            {isThisPlaying ? <Pause size={16} /> : <Play size={16} />}
            {isThisPlaying ? "Pause" : "Play Sermon"}
          </Button>
        ) : (
          <Button
            href={`https://youtube.com/watch?v=${sermon.youtube_id}`}
            variant="secondary"
            size="sm"
            className="mt-auto"
          >
            <Youtube size={16} /> Watch on YouTube
          </Button>
        )}
      </div>
    </GlassCard>
  );
}
