import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Chapters } from "@/components/chapters";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { Player } from "@/components/player";
import { SourceList } from "@/components/source-list";
import { getEpisode, neighbors, sourceCount, episodes } from "@/lib/episodes";
import {
  episodeWord,
  formatDate,
  formatDuration,
  isoDuration,
  metaDescription,
  sourceLabel,
  youtubePoster,
  youtubeWatch,
} from "@/lib/format";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return episodes.map((episode) => ({ slug: episode.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const episode = getEpisode(slug);
  if (!episode) return {};

  const description = metaDescription(episode.description);
  const path = `/episodes/${episode.slug}/`;
  const image = youtubePoster(episode.youtubeId);

  return {
    title: episode.title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "video.other",
      title: episode.title,
      description,
      url: path,
      images: [{ url: image, alt: episode.title }],
      videos: [{ url: youtubeWatch(episode.youtubeId) }],
    },
    twitter: {
      card: "summary_large_image",
      title: episode.title,
      description,
      images: [image],
    },
  };
}

export default async function EpisodePage({ params }: Props) {
  const { slug } = await params;
  const episode = getEpisode(slug);
  if (!episode) notFound();

  const { earlier, later } = neighbors(episode);
  const description = episode.description.join(" ");
  const pageUrl = `${SITE.url}/episodes/${episode.slug}/`;
  const rest = episode.description.slice(1);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "VideoObject",
              name: episode.title,
              description,
              thumbnailUrl: youtubePoster(episode.youtubeId),
              uploadDate: episode.published,
              duration: isoDuration(episode.durationSeconds),
              embedUrl: `https://www.youtube-nocookie.com/embed/${episode.youtubeId}`,
              contentUrl: youtubeWatch(episode.youtubeId),
              url: pageUrl,
              hasPart: episode.chapters.map((chapter, index) => ({
                "@type": "Clip",
                name: chapter.title,
                startOffset: chapter.seconds,
                endOffset:
                  episode.chapters[index + 1]?.seconds ?? episode.durationSeconds,
                url: `${pageUrl}?t=${chapter.seconds}`,
              })),
              publisher: {
                "@type": "Organization",
                name: SITE.name,
                url: SITE.url,
              },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: SITE.name,
                  item: SITE.url,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: episode.title,
                  item: pageUrl,
                },
              ],
            },
          ],
        }}
      />
      <main>
        <header className="top">
          <p className="kicker">
            <Link href="/">Older Than Morning</Link>
            {` · Episode ${episodeWord(episode.number)}`}
          </p>
          <h1>{episode.title}</h1>
          <p className="stand">{episode.description[0]}</p>
          <p className="tally">
            {episode.era}
            {" · "}
            {formatDuration(episode.durationSeconds)}
            {" · "}
            <a href="#sources">{sourceLabel(sourceCount(episode))}</a>
            {" · "}
            <time dateTime={episode.published.slice(0, 10)}>
              {formatDate(episode.published)}
            </time>
          </p>
        </header>

        <Player youtubeId={episode.youtubeId} title={episode.title} />
        <p className="tally watch-link">
          <a href={youtubeWatch(episode.youtubeId)} rel="noopener">
            Watch on YouTube
          </a>
        </p>

        {rest.length ? (
          <div className="prose">
            {rest.map((paragraph) => (
              <p
                key={paragraph}
                className={paragraph === "Best with the lights off." ? "lights" : undefined}
              >
                {paragraph}
              </p>
            ))}
          </div>
        ) : null}

        <h2>Chapters</h2>
        <Chapters episode={episode} />

        <h2 id="sources">Sources</h2>
        <p className="stand">{episode.accuracy}</p>
        {episode.leftOut ? (
          <div className="caveat">
            <p className="lab">Deliberately left out</p>
            <p>{episode.leftOut}</p>
          </div>
        ) : null}
        <SourceList episode={episode} />
        {episode.sourceNote ? <p className="note source-note">{episode.sourceNote}</p> : null}

        <nav className="pager" aria-label="More episodes">
          {earlier ? (
            <Link href={`/episodes/${earlier.slug}/`}>
              <span className="meta">Earlier</span>
              <span className="name">{earlier.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {later ? (
            <Link className="later" href={`/episodes/${later.slug}/`}>
              <span className="meta">Later</span>
              <span className="name">{later.title}</span>
            </Link>
          ) : null}
        </nav>
      </main>
      <Footer note />
    </>
  );
}
