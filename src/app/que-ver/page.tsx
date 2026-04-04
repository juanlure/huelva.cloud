import type { Metadata } from 'next';
import { AccommodationTypeCards } from '@/components/guides/AccommodationTypeCards';
import { BestForSelector } from '@/components/guides/BestForSelector';
import { BookingCTAContextual } from '@/components/guides/BookingCTAContextual';
import { CommonMistakesBox } from '@/components/guides/CommonMistakesBox';
import { FAQAccordionPremium } from '@/components/guides/FAQAccordionPremium';
import { GuideHeroPremium } from '@/components/guides/GuideHeroPremium';
import { QuickDecisionBlock } from '@/components/guides/QuickDecisionBlock';
import { RecommendationCallout } from '@/components/guides/RecommendationCallout';
import { RelatedGuidesRail } from '@/components/guides/RelatedGuidesRail';
import { StickyGuideTOC } from '@/components/guides/StickyGuideTOC';
import { ZoneComparisonCards } from '@/components/guides/ZoneComparisonCards';
import { queVerGuideData } from '@/data/guides/que-ver';
import { buildBasicPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildBasicPageMetadata({
  title: 'Qué ver en Huelva | Guía local con criterio',
  description: 'Qué ver en Huelva capital y provincia sin perder tiempo en relleno turístico. Selección útil, contexto local y plan claro.',
  path: '/que-ver',
});

export default function QueVerPage() {
  const data = queVerGuideData;

  return (
    <main className="premium-guide-shell">
      <GuideHeroPremium data={data.hero} />
      <StickyGuideTOC items={data.toc} />
      <QuickDecisionBlock data={data.quickDecision} />
      <ZoneComparisonCards data={data.zoneComparison} />
      <BestForSelector data={data.bestFor} />
      <RecommendationCallout data={data.recommendation} />
      <CommonMistakesBox data={data.commonMistakes} />
      <AccommodationTypeCards data={data.accommodationTypes} />
      <FAQAccordionPremium data={data.faq} />
      <BookingCTAContextual data={data.cta} />
      <RelatedGuidesRail data={data.relatedGuides} />
    </main>
  );
}
