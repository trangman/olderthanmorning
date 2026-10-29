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

export type Chapter = {
  time: string;
  seconds: number;
  title: string;
};

export type Episode = {
  number: number;
  slug: string;
  title: string;
  youtubeId: string;
  published: string;
  durationSeconds: number;
  era: string;
  description: string[];
  chapters: Chapter[];
  accuracy: string;
  leftOut?: string;
  sourceNote?: string;
  sources: SourceSection[];
  legacy?: string;
};
