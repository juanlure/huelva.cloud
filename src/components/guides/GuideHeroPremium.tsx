import type { GuideHero } from '@/types/guides';

export function GuideHeroPremium({ data }: { data: GuideHero }) {
  return (
    <section className="premium-guide-section premium-guide-hero">
      <div className="premium-guide-container premium-guide-hero__grid">
        <div className="premium-guide-panel premium-guide-panel--hero premium-guide-stack-lg">
          {data.eyebrow ? <p className="premium-guide-eyebrow">{data.eyebrow}</p> : null}
          <div className="premium-guide-stack-md">
            <h1 className="premium-guide-h1">{data.title}</h1>
            <p className="premium-guide-lead">{data.subtitle}</p>
          </div>

          {data.quickFacts?.length ? (
            <div className="premium-guide-facts">
              {data.quickFacts.map((fact) => (
                <div key={fact.label} className="premium-guide-fact">
                  <span className="premium-guide-label">{fact.label}</span>
                  <strong className="premium-guide-fact__value">{fact.value}</strong>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="premium-guide-hero__visual premium-guide-panel premium-guide-panel--hero-aside premium-guide-stack-md" aria-hidden="true">
          <div className="premium-guide-hero__image premium-guide-hero__image--placeholder">
            {data.image ? (
              <img src={data.image.src} alt={data.image.alt} />
            ) : (
              <div className="premium-guide-hero__placeholder-copy">
                <span>{data.eyebrow ?? 'Guía local'}</span>
                <strong>{data.title}</strong>
                <p>{data.subtitle}</p>
              </div>
            )}
          </div>
          {data.image?.caption ? <p className="premium-guide-caption">{data.image.caption}</p> : null}
        </div>
      </div>
    </section>
  );
}
