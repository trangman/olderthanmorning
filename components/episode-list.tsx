import Link from "next/link";
import { byNewest, sourceCount } from "@/lib/episodes";
import { episodeWord, sourceLabel } from "@/lib/format";
import type { Episode } from "@/lib/types";

export function EpisodeList({
  hrefFor = (episode) => `/episodes/${episode.slug}/`,
}: {
  hrefFor?: (episode: Episode) => string;
}) {
  return (
    <ul className="eps">
      {byNewest().map((episode) => (
        <li key={episode.slug}>
          <p className="meta">
            Episode {episodeWord(episode.number)} · {episode.era} ·{" "}
            {sourceLabel(sourceCount(episode))}
          </p>
          <Link href={hrefFor(episode)}>{episode.title}</Link>
        </li>
      ))}
    </ul>
  );
}
