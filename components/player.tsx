"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function Frame({
  youtubeId,
  title,
  start,
}: {
  youtubeId: string;
  title: string;
  start: number;
}) {
  const src = `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0${
    start > 0 ? `&start=${start}` : ""
  }`;

  return (
    <div className="frame" id="watch">
      <iframe
        key={start}
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}

function PlayerInner({ youtubeId, title }: { youtubeId: string; title: string }) {
  const params = useSearchParams();
  const raw = Number(params.get("t") ?? "0");
  const start = Number.isFinite(raw) && raw > 0 ? Math.floor(raw) : 0;
  return <Frame youtubeId={youtubeId} title={title} start={start} />;
}

export function Player({ youtubeId, title }: { youtubeId: string; title: string }) {
  return (
    <Suspense fallback={<Frame youtubeId={youtubeId} title={title} start={0} />}>
      <PlayerInner youtubeId={youtubeId} title={title} />
    </Suspense>
  );
}
