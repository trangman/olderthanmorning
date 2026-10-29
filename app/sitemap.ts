import type { MetadataRoute } from "next";
import { episodes } from "@/lib/episodes";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const latest = episodes[episodes.length - 1]?.published;
  return [
    {
      url: `${SITE.url}/`,
      lastModified: latest,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE.url}/sources/`,
      lastModified: latest,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...episodes.map((episode) => ({
      url: `${SITE.url}/episodes/${episode.slug}/`,
      lastModified: episode.published,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
