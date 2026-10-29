import fs from "fs";
import path from "path";

const root = path.resolve(import.meta.dirname, "..");
const dir = path.join(root, "content", "episodes");
const episodes = fs
  .readdirSync(dir)
  .filter((name) => name.endsWith(".json"))
  .map((name) => JSON.parse(fs.readFileSync(path.join(dir, name), "utf8")))
  .filter((episode) => episode.draft !== true)
  .map((episode) => ({
    ...episode,
    published: episode.published ?? episode.publishedAt,
    description: episode.description ?? episode.summary ?? [],
  }));
const site = "https://olderthanmorning.com";

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const items = [...episodes]
  .sort((a, b) => b.number - a.number)
  .map((episode) => {
    const url = `${site}/episodes/${episode.slug}/`;
    return `  <item>
    <title>${escapeXml(episode.title)}</title>
    <link>${url}</link>
    <guid>${url}</guid>
    <pubDate>${new Date(episode.published).toUTCString()}</pubDate>
    <description>${escapeXml(episode.description.join(" "))}</description>
  </item>`;
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>Older Than Morning</title>
  <link>${site}/</link>
  <description>The history of the Earth, told gently, so you can sleep through it.</description>
  <language>en</language>
${items}
</channel>
</rss>
`;

fs.mkdirSync(path.join(root, "public"), { recursive: true });
fs.writeFileSync(path.join(root, "public", "feed.xml"), xml);
