import type { ZoneComparisonCardsData } from '@/types/guides';

export function ZoneComparisonCards({ data }: { data: ZoneComparisonCardsData }) {
  return (
    <section id={data.sectionId} className="premium-guide-section premium-guide-section--contrast">
      <div className="premium-guide-container premium-guide-stack-lg">
        <div className="premium-guide-reading-width premium-guide-stack-sm">
          <p className="premium-guide-eyebrow">Comparativa útil</p>
          <h2 className="premium-guide-h2">{data.title}</h2>
          {data.intro ? <p className="premium-guide-lead">{data.intro}</p> : null}
        </div>

        <div className="premium-guide-grid premium-guide-grid--2">
          {data.cards.map((card) => (
            <article key={card.name} className="premium-guide-card premium-guide-stack-md premium-guide-card--comparison">
              <div className="premium-guide-stack-xs">
                <h3 className="premium-guide-h3">{card.name}</h3>
                <p className="premium-guide-kicker">Mejor para: {card.bestFor}</p>
              </div>

              <div className="premium-guide-stack-sm">
                <div>
                  <span className="premium-guide-list-title">Lo que ganas</span>
                  <ul className="premium-guide-list">
                    {card.good.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                <div>
                  <span className="premium-guide-list-title">El peaje real</span>
                  <ul className="premium-guide-list premium-guide-list--muted">
                    {card.tradeoffs.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </div>

              <div className="premium-guide-meta-block premium-guide-meta-block--verdict">
                <p><strong>Movilidad:</strong> {card.mobility}</p>
                <p><strong>Veredicto editorial:</strong> {card.verdict}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
