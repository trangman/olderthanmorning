import Link from "next/link";
import { SITE } from "@/lib/site";

export function Footer({ note = false }: { note?: boolean }) {
  return (
    <footer>
      <p>
        <Link href="/">Older Than Morning</Link>
        {" · "}
        <a href={SITE.youtube} rel="noopener">
          YouTube
        </a>
      </p>
      {note ? (
        <p>
          Where a paper is behind a paywall the link goes to the abstract, which
          carries the claim and the authors even when the full text does not open.
          Corrections are welcome in the comments and get made.
        </p>
      ) : null}
    </footer>
  );
}
