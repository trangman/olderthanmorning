"use client";

import { playEpisode } from "@/components/player";

export function ChapterLink({
  slug,
  seconds,
  time,
  title,
}: {
  slug: string;
  seconds: number;
  time: string;
  title: string;
}) {
  return (
    <a
      className="enhanced"
      href={`/episodes/${slug}/?t=${seconds}#watch`}
      onClick={(event) => {
        if (
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          event.button !== 0
        ) {
          return;
        }
        event.preventDefault();
        playEpisode(slug, seconds);
      }}
    >
      <span className="time">{time}</span>
      <span>{title}</span>
    </a>
  );
}
