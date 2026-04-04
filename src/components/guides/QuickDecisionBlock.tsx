import type { QuickDecisionBlockData } from '@/types/guides';

export function QuickDecisionBlock({ data }: { data: QuickDecisionBlockData }) {
  return (
    <section id={data.sectionId} className="premium-guide-section">
      <div className="premium-guide-container premium-guide-reading-width premium-guide-stack-lg">
        <div className="premium-guide-stack-sm">
          {data.eyebrow ? <p className="premium-guide-eyebrow">{data.eyebrow}</p> : null}
          <h2 className="premium-guide-h2">{data.title}</h2>
          {data.intro ? <p className="premium-guide-lead">{data.intro}</p> : null}
        </div>

        <div className="premium-guide-grid premium-guide-grid--3">
          {data.items.map((item) => (
            <article key={item.title} className="premium-guide-card premium-guide-stack-sm">
              <h3 className="premium-guide-h3">{item.title}</h3>
              <p className="premium-guide-body">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
