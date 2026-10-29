import { prettyUrl } from "@/lib/format";
import type { Episode } from "@/lib/types";

export function SourceList({ episode }: { episode: Episode }) {
  return (
    <>
      {episode.sources.map((section) => (
        <section className="ch" key={section.title}>
          <header className="eyebrow">
            <h3 className="num">{section.title}</h3>
            {section.age ? <span className="age">{section.age}</span> : null}
          </header>
          {section.groups.map((group, index) => (
            <div key={`${section.title}-${index}`}>
              {group.label ? (
                <p className={group.tone && group.tone !== "plain" ? `lab ${group.tone}` : "lab"}>
                  {group.label}
                </p>
              ) : null}
              <ul className="refs">
                {group.sources.map((source) => (
                  <li key={source.cite}>
                    <span className="cite">{source.cite}</span>
                    {source.url ? (
                      <a href={source.url} rel="noopener">
                        {prettyUrl(source.url)}
                      </a>
                    ) : null}
                    {source.note ? (
                      <span
                        className={
                          source.noteKind && source.noteKind !== "plain"
                            ? `note ${source.noteKind}`
                            : "note"
                        }
                      >
                        {source.note}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ))}
    </>
  );
}
