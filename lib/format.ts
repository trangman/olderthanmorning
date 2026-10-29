const WORDS = [
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
  "Twenty",
];

export function episodeWord(number: number): string {
  return WORDS[number - 1] ?? String(number);
}

export function formatDuration(seconds: number): string {
  const total = Math.round(seconds / 60);
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  if (hours && minutes) return `${hours} hr ${minutes} min`;
  if (hours) return `${hours} hr`;
  return `${minutes} min`;
}

export function formatDate(iso: string): string {
  const day = iso.slice(0, 10);
  return new Date(`${day}T12:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function isoDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const rest = seconds % 60;
  return `PT${hours ? `${hours}H` : ""}${minutes}M${rest ? `${rest}S` : ""}`;
}

export function sourceLabel(count: number): string {
  return `${count} ${count === 1 ? "source" : "sources"}`;
}

export function prettyUrl(url: string): string {
  try {
    const parsed = new URL(url);
    const host = parsed.host.replace(/^www\./, "");
    const path = `${parsed.pathname}${parsed.search}`.replace(/\/$/, "");
    return `${host}${path}`;
  } catch {
    return url;
  }
}

export function metaDescription(supplied: string | undefined, paragraphs: string[]): string {
  if (supplied) return supplied;
  const text = paragraphs[0] ?? "";
  if (text.length < 150) return text;
  const head = text.slice(0, 149);
  const space = head.lastIndexOf(" ");
  return space > 0 ? head.slice(0, space) : head;
}

export function youtubeWatch(id: string): string {
  return `https://www.youtube.com/watch?v=${id}`;
}

export function youtubePoster(id: string): string {
  return `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
}
