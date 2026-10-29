export type NoteKind = "plain" | "for" | "against";

export type Source = {
  cite: string;
  url?: string;
  note?: string;
  noteKind?: NoteKind;
};

export type SourceGroup = {
  label?: string;
  tone?: NoteKind;
  sources: Source[];
};

export type SourceSection = {
  title: string;
  age?: string;
  groups: SourceGroup[];
};

export type ReachSource = {
  label: string;
  url?: string | null;
  reach?: string;
  thin?: boolean;
};

export type ReachGroup = {
  chapter?: string;
  number?: number;
  heading: string;
  disputed?: boolean;
  sources: ReachSource[];
};

export type Chapter = {
  time: string;
  seconds: number;
  title: string;
};

export type Episode = {
  number: number;
  slug: string;
  title: string;
  youtubeId: string | null;
  published: string;
  durationSeconds: number | null;
  era: string;
  description: string[];
  chapters: Chapter[];
  draft: boolean;
  accuracy?: string;
  leftOut?: string;
  sourceNote?: string;
  sources: SourceSection[];
  sourceGroups?: ReachGroup[];
  legacy?: string;
};
