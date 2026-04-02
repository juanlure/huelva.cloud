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
import { playasGuideData } from '@/data/guides/playas';

export default function PlayasPage() {
  const data = playasGuideData;

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
