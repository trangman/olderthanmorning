import Link from "next/link";
import { EpisodeList } from "@/components/episode-list";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { byNewest } from "@/lib/episodes";
import { SITE } from "@/lib/site";

export default function HomePage() {
  const listed = byNewest();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              name: SITE.name,
              url: SITE.url,
              description: SITE.tagline,
              publisher: {
                "@type": "Organization",
                name: SITE.name,
                url: SITE.url,
                sameAs: [SITE.youtube],
              },
            },
            {
              "@type": "ItemList",
              itemListElement: listed.map((episode, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: episode.title,
                url: `${SITE.url}/episodes/${episode.slug}/`,
              })),
            },
          ],
        }}
      />
      <main>
        <header className="top flush">
          <p className="kicker">Older Than Morning</p>
          <h1>{SITE.tagline}</h1>
          <p className="stand">{SITE.stand}</p>
          <p className="tally">
            <a href={SITE.youtube} rel="noopener">
              Watch on YouTube
            </a>
            {" · "}
            <Link href="/sources/">Sources</Link>
          </p>
        </header>
        <EpisodeList />
      </main>
      <Footer />
    </>
  );
}
