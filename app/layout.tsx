import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, Newsreader } from "next/font/google";
import { SITE } from "@/lib/site";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-newsreader",
});

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-plex",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F2ECDE" },
    { media: "(prefers-color-scheme: dark)", color: "#0A1831" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.name,
    template: `%s - ${SITE.name}`,
  },
  description: SITE.stand,
  applicationName: SITE.name,
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_US",
    title: SITE.name,
    description: SITE.tagline,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${plex.variable}`}>
      <body>
        <div className="wrap">{children}</div>
      </body>
    </html>
  );
}
