import type { Metadata } from 'next';
import { alojarseGuideData } from '@/data/guides/alojarse';
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
import { buildBasicPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildBasicPageMetadata({
  title: 'Dónde alojarse en Huelva | Zonas y opciones que sí encajan',
  description: 'Dónde alojarse en Huelva con criterio: centro, zonas más prácticas, tipos de alojamiento y errores típicos al reservar.',
  path: '/alojarse',
  keywords: ['dónde alojarse en Huelva', 'dónde dormir en Huelva', 'hoteles en Huelva', 'alojamiento Huelva capital'],
  image: '/images/guides/huelva-plaza-las-monjas.jpg',
  type: 'website',
});

export default function AlojarsePage() {
  const data = alojarseGuideData;

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
