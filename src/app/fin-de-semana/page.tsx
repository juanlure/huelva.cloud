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
import { finDeSemanaGuideData } from '@/data/guides/fin-de-semana';
import { buildBasicPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildBasicPageMetadata({
  title: 'Fin de semana en Huelva | Escapada de 48 horas',
  description: 'Plan de fin de semana en Huelva con ritmo, criterio y contexto local para aprovechar 48 horas sin caer en la ruta cutre.',
  path: '/fin-de-semana',
});

export default function FinDeSemanaPage() {
  const data = finDeSemanaGuideData;

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
