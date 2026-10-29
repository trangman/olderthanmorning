import raw from "@/data/episodes.json";
import type { Episode } from "@/lib/types";

export const episodes = raw as Episode[];

export function byNewest(): Episode[] {
  return [...episodes].sort((a, b) => b.number - a.number);
}

export function getEpisode(slug: string): Episode | undefined {
  return episodes.find((episode) => episode.slug === slug);
}

export function neighbors(episode: Episode): {
  earlier: Episode | null;
  later: Episode | null;
} {
  return {
    earlier: episodes.find((item) => item.number === episode.number - 1) ?? null,
    later: episodes.find((item) => item.number === episode.number + 1) ?? null,
  };
}

export function sourceCount(episode: Episode): number {
  return episode.sources.reduce(
    (sum, section) =>
      sum + section.groups.reduce((inner, group) => inner + group.sources.length, 0),
    0,
  );
}
