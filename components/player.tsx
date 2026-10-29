"use client";

import { useEffect, useState } from "react";
import { youtubeWatch } from "@/lib/format";

const PLAY_EVENT = "otm-play";

function readStart(): number {
  const raw = Number(new URLSearchParams(window.location.search).get("t") ?? "0");
  return Number.isFinite(raw) && raw > 0 ? Math.floor(raw) : 0;
}

export function playEpisode(slug: string, start: number) {
  const safe = Number.isFinite(start) && start > 0 ? Math.floor(start) : 0;
  window.history.pushState(null, "", `/episodes/${slug}/?t=${safe}#watch`);
  window.dispatchEvent(new CustomEvent<number>(PLAY_EVENT, { detail: safe }));
}

export function Player({ youtubeId, title }: { youtubeId: string; title: string }) {
  const [active, setActive] = useState<number | null>(null);
  const [fallbackStart, setFallbackStart] = useState(0);

  useEffect(() => {
    setFallbackStart(readStart());

    function onPlay(event: Event) {
      const detail = (event as CustomEvent<number>).detail;
      const start = Number.isFinite(detail) && detail > 0 ? Math.floor(detail) : 0;
      setFallbackStart(start);
      setActive(start);
      document.getElementById("watch")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    window.addEventListener(PLAY_EVENT, onPlay);
    return () => window.removeEventListener(PLAY_EVENT, onPlay);
  }, []);

  const watchHref =
    fallbackStart > 0 ? `${youtubeWatch(youtubeId)}&t=${fallbackStart}s` : youtubeWatch(youtubeId);

  return (
    <div className="frame" id="watch">
      {active === null ? (
        <a
          className="poster"
          href={watchHref}
          aria-label={`Play ${title}`}
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
            setActive(readStart());
          }}
          onKeyDown={(event) => {
            if (event.key !== " ") return;
            event.preventDefault();
            setActive(readStart());
          }}
        >
          <span className="play" aria-hidden="true" />
        </a>
      ) : (
        <iframe
          key={active}
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&autoplay=1&start=${active}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      )}
    </div>
  );
}
