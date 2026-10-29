import type { Metadata } from "next";
import Link from "next/link";
import { EpisodeList } from "@/components/episode-list";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sources",
  description:
    "Every episode cites what it uses. Where the science is contested, the script says so rather than picking the tidier answer, and both sides are listed.",
  alternates: { canonical: "/sources/" },
  openGraph: {
    title: "Sources - Older Than Morning",
    description:
      "Every episode cites what it uses. Where the science is contested, both sides are listed.",
    url: "/sources/",
  },
};

export default function SourcesPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Sources - Older Than Morning",
          url: `${SITE.url}/sources/`,
          isPartOf: SITE.url,
        }}
      />
      <main>
        <header className="top flush">
          <p className="kicker">
            <Link href="/">Older Than Morning</Link>
          </p>
          <h1>Sources</h1>
          <p className="stand">
            Every episode cites what it uses. Where the science is contested, the
            script says so rather than picking the tidier answer, and both sides
            are listed.
          </p>
        </header>
        <EpisodeList hrefFor={(episode) => `/episodes/${episode.slug}/#sources`} />
      </main>
      <Footer />
    </>
  );
}
