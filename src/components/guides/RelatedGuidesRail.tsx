import Link from 'next/link';
import type { RelatedGuidesRailData } from '@/types/guides';

export function RelatedGuidesRail({ data }: { data: RelatedGuidesRailData }) {
  return (
    <section className="premium-guide-section">
      <div className="premium-guide-container premium-guide-stack-lg">
        <div className="premium-guide-reading-width premium-guide-stack-sm">
          <p className="premium-guide-eyebrow">Siguiente capa</p>
          <h2 className="premium-guide-h2">{data.title}</h2>
        </div>

        <div className="premium-guide-grid premium-guide-grid--3">
          {data.guides.map((guide) => (
            <Link key={guide.href} href={guide.href} className="premium-guide-card premium-guide-card--link premium-guide-stack-sm">
              <h3 className="premium-guide-h3">{guide.title}</h3>
              <p className="premium-guide-body">{guide.description}</p>
              <span className="premium-guide-link">Abrir guía →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
