import fs from "node:fs";
import path from "node:path";
import type { Chapter, Episode, ReachGroup, SourceSection } from "@/lib/types";

type RawChapter = {
  title: string;
  time?: string;
  seconds?: number;
  start?: string;
  startSeconds?: number;
};

type RawEpisode = {
  number: number;
  slug: string;
  title: string;
  youtubeId?: string | null;
  published?: string;
  publishedAt?: string;
  durationSeconds?: number | null;
  era: string;
  description?: string[];
  summary?: string[];
  chapters?: RawChapter[];
  draft?: boolean;
  accuracy?: string;
  leftOut?: string;
  sourceNote?: string;
  sources?: SourceSection[];
  sourceGroups?: ReachGroup[];
  legacy?: string;
};

function normalizeChapter(chapter: RawChapter): Chapter {
  return {
    time: chapter.time ?? chapter.start ?? "",
    seconds: chapter.seconds ?? chapter.startSeconds ?? 0,
    title: chapter.title,
  };
}

function normalize(raw: RawEpisode): Episode {
  return {
    number: raw.number,
    slug: raw.slug,
    title: raw.title,
    youtubeId: raw.youtubeId ?? null,
    published: raw.published ?? raw.publishedAt ?? "",
    durationSeconds: raw.durationSeconds ?? null,
    era: raw.era,
    description: raw.description ?? raw.summary ?? [],
    chapters: (raw.chapters ?? []).map(normalizeChapter),
    draft: raw.draft === true,
    accuracy: raw.accuracy,
    leftOut: raw.leftOut,
    sourceNote: raw.sourceNote,
    sources: raw.sources ?? [],
    sourceGroups: raw.sourceGroups,
    legacy: raw.legacy,
  };
}

function loadEpisodes(): Episode[] {
  const dir = path.join(process.cwd(), "content", "episodes");
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".json"))
    .map((name) => {
      const raw = JSON.parse(fs.readFileSync(path.join(dir, name), "utf8")) as RawEpisode;
      return normalize(raw);
    })
    .sort((a, b) => a.number - b.number);
}

const allEpisodes = loadEpisodes();

export const episodes = allEpisodes.filter((episode) => !episode.draft);

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
  if (episode.sourceGroups?.length) {
    return episode.sourceGroups.reduce((sum, group) => sum + group.sources.length, 0);
  }
  return episode.sources.reduce(
    (sum, section) =>
      sum + section.groups.reduce((inner, group) => inner + group.sources.length, 0),
    0,
  );
}
