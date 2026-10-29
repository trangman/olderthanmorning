import { prettyUrl } from "@/lib/format";
import type { Episode, ReachGroup } from "@/lib/types";

function heading(group: ReachGroup): string {
  if (!group.disputed) return group.heading;
  if (group.heading.toLowerCase().includes("(disputed)")) return group.heading;
  return `${group.heading} (disputed)`;
}

function ReachList({ groups }: { groups: ReachGroup[] }) {
  return (
    <>
      {groups.map((group) => (
        <section className="ch" key={`${group.number ?? ""}-${group.heading}`}>
          <header className="eyebrow">
            <h3 className="num">{heading(group)}</h3>
          </header>
          <ul className="refs">
            {group.sources.map((source, index) => (
              <li key={`${source.label}-${source.url ?? index}`}>
                {source.url ? (
                  <a
                    className="cite-link"
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {source.label}
                  </a>
                ) : (
                  <span className="cite">{source.label}</span>
                )}
                {source.reach || source.thin ? (
                  <span className="reach">
                    {source.reach}
                    {source.reach && source.thin ? " · " : ""}
                    {source.thin ? "thinner source" : ""}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}

export function SourceList({ episode }: { episode: Episode }) {
  if (episode.sourceGroups?.length) {
    return <ReachList groups={episode.sourceGroups} />;
  }

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
