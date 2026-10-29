import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Not here",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <main>
        <header className="top">
          <p className="kicker">
            <Link href="/">Older Than Morning</Link>
          </p>
          <h1>There is nothing at this address.</h1>
          <p className="stand">
            Which is a small and recent absence, compared with most of what this
            site is about. The episode sources are listed <Link href="/sources/">here</Link>.
          </p>
        </header>
      </main>
      <Footer />
    </>
  );
}
