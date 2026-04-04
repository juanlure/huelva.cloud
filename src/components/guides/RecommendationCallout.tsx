import type { RecommendationCalloutData } from '@/types/guides';

export function RecommendationCallout({ data }: { data: RecommendationCalloutData }) {
  return (
    <section id={data.sectionId} className="premium-guide-section">
      <div className="premium-guide-container premium-guide-reading-width">
        <div className="premium-guide-callout premium-guide-callout--verdict premium-guide-stack-md">
          {data.eyebrow ? <p className="premium-guide-eyebrow">{data.eyebrow}</p> : null}
          <h2 className="premium-guide-h2">{data.title}</h2>
          <p className="premium-guide-body premium-guide-body--strong">{data.body}</p>
          {data.highlight ? <p className="premium-guide-highlight">{data.highlight}</p> : null}
        </div>
      </div>
    </section>
  );
}
