import { ChapterLink } from "@/components/chapter-link";
import { youtubeWatch } from "@/lib/format";
import type { Episode } from "@/lib/types";

export function Chapters({ episode }: { episode: Episode }) {
  return (
    <>
      <noscript>
        <style>{".chapters a.enhanced{display:none}"}</style>
      </noscript>
      <ul className="chapters">
        {episode.chapters.map((chapter) => (
          <li key={`${chapter.seconds}-${chapter.title}`}>
            <ChapterLink
              slug={episode.slug}
              seconds={chapter.seconds}
              time={chapter.time}
              title={chapter.title}
            />
            {episode.youtubeId ? (
              <noscript>
                <a
                  href={`${youtubeWatch(episode.youtubeId)}&t=${chapter.seconds}s`}
                  rel="noopener"
                >
                  <span className="time">{chapter.time}</span>
                  <span>{chapter.title}</span>
                </a>
              </noscript>
            ) : null}
          </li>
        ))}
      </ul>
    </>
  );
}
