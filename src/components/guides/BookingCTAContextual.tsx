import Link from 'next/link';
import type { ContextualCTA } from '@/types/guides';

export function BookingCTAContextual({ data }: { data: ContextualCTA }) {
  return (
    <section id={data.sectionId} className="premium-guide-section premium-guide-section--tight">
      <div className="premium-guide-container premium-guide-reading-width">
        <div className="premium-guide-cta premium-guide-stack-md">
          <p className="premium-guide-eyebrow">Siguiente paso</p>
          <h2 className="premium-guide-h2">{data.title}</h2>
          <p className="premium-guide-body premium-guide-body--strong">{data.body}</p>
          <p className="premium-guide-kicker">Decide la base, filtra rápido y no regales las mejores opciones por seguir comparando sin fin.</p>

          <div className="premium-guide-cta__actions">
            <Link href={data.primaryAction.href} className="btn btn-primary btn-lg">
              {data.primaryAction.label}
            </Link>
            {data.secondaryAction ? (
              <Link href={data.secondaryAction.href} className="btn btn-outline btn-lg">
                {data.secondaryAction.label}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
