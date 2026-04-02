import type { AccommodationTypeCardsData } from '@/types/guides';

export function AccommodationTypeCards({ data }: { data: AccommodationTypeCardsData }) {
  return (
    <section id={data.sectionId} className="premium-guide-section">
      <div className="premium-guide-container premium-guide-stack-lg">
        <div className="premium-guide-reading-width premium-guide-stack-sm">
          <p className="premium-guide-eyebrow">Formato ideal</p>
          <h2 className="premium-guide-h2">{data.title}</h2>
          {data.intro ? <p className="premium-guide-lead">{data.intro}</p> : null}
        </div>

        <div className="premium-guide-grid premium-guide-grid--3">
          {data.cards.map((card) => (
            <article key={card.title} className="premium-guide-card premium-guide-stack-md">
              <div className="premium-guide-stack-xs">
                <h3 className="premium-guide-h3">{card.title}</h3>
                <p className="premium-guide-kicker">Ideal para: {card.bestFor}</p>
              </div>

              <div>
                <span className="premium-guide-list-title">Ventajas</span>
                <ul className="premium-guide-list">
                  {card.pros.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>

              {card.cons?.length ? (
                <div>
                  <span className="premium-guide-list-title">Inconvenientes</span>
                  <ul className="premium-guide-list premium-guide-list--muted">
                    {card.cons.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
