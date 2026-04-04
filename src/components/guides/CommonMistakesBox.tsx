import type { CommonMistakesBoxData } from '@/types/guides';

export function CommonMistakesBox({ data }: { data: CommonMistakesBoxData }) {
  return (
    <section id={data.sectionId} className="premium-guide-section premium-guide-section--tight">
      <div className="premium-guide-container premium-guide-reading-width premium-guide-stack-lg">
        <div className="premium-guide-stack-sm">
          {data.eyebrow ? <p className="premium-guide-eyebrow">{data.eyebrow}</p> : null}
          <h2 className="premium-guide-h2">{data.title}</h2>
          {data.intro ? <p className="premium-guide-lead">{data.intro}</p> : null}
        </div>

        <div className="premium-guide-stack-md">
          {data.mistakes.map((mistake) => (
            <article key={mistake.title} className="premium-guide-card premium-guide-card--warning premium-guide-stack-xs">
              <h3 className="premium-guide-h3">{mistake.title}</h3>
              <p className="premium-guide-body">{mistake.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
