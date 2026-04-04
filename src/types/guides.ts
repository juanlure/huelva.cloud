export type GuideSectionId =
  | 'decision-rapida'
  | 'capital-o-costa'
  | 'segun-tu-viaje'
  | 'mi-recomendacion'
  | 'errores-tipicos'
  | 'tipos-alojamiento'
  | 'faq'
  | 'reservar';

export type GuideHeroImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type GuideQuickFact = {
  label: string;
  value: string;
};

export type GuideHero = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  quickFacts?: GuideQuickFact[];
  image?: GuideHeroImage;
};

export type GuideTOCItem = {
  id: GuideSectionId;
  label: string;
};

export type QuickDecisionItem = {
  title: string;
  description: string;
};

export type QuickDecisionBlockData = {
  sectionId: GuideSectionId;
  eyebrow?: string;
  title: string;
  intro?: string;
  items: QuickDecisionItem[];
};

export type ZoneComparisonCard = {
  name: string;
  bestFor: string;
  good: string[];
  tradeoffs: string[];
  mobility: string;
  verdict: string;
};

export type ZoneComparisonCardsData = {
  sectionId: GuideSectionId;
  eyebrow?: string;
  title: string;
  intro?: string;
  cards: ZoneComparisonCard[];
};

export type BestForOption = {
  label: string;
  audience: string;
  recommendation: string;
};

export type BestForSelectorData = {
  sectionId: GuideSectionId;
  eyebrow?: string;
  resultEyebrow?: string;
  title: string;
  intro?: string;
  options: BestForOption[];
};

export type RecommendationCalloutData = {
  sectionId: GuideSectionId;
  eyebrow?: string;
  title: string;
  body: string;
  highlight?: string;
};

export type CommonMistake = {
  title: string;
  description: string;
};

export type CommonMistakesBoxData = {
  sectionId: GuideSectionId;
  eyebrow?: string;
  title: string;
  intro?: string;
  mistakes: CommonMistake[];
};

export type AccommodationTypeCard = {
  title: string;
  bestFor: string;
  pros: string[];
  cons?: string[];
};

export type AccommodationTypeCardsData = {
  sectionId: GuideSectionId;
  title: string;
  intro?: string;
  cards: AccommodationTypeCard[];
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type FAQAccordionPremiumData = {
  sectionId: GuideSectionId;
  eyebrow?: string;
  title: string;
  intro?: string;
  items: FAQItem[];
};

export type CTAAction = {
  label: string;
  href: string;
};

export type ContextualCTA = {
  sectionId: GuideSectionId;
  eyebrow?: string;
  title: string;
  body: string;
  kicker?: string;
  primaryAction: CTAAction;
  secondaryAction?: CTAAction;
};

export type RelatedGuide = {
  title: string;
  description: string;
  href: string;
};

export type RelatedGuidesRailData = {
  eyebrow?: string;
  title: string;
  guides: RelatedGuide[];
};

export type AlojarseGuideData = {
  hero: GuideHero;
  toc: GuideTOCItem[];
  quickDecision: QuickDecisionBlockData;
  zoneComparison: ZoneComparisonCardsData;
  bestFor: BestForSelectorData;
  recommendation: RecommendationCalloutData;
  commonMistakes: CommonMistakesBoxData;
  accommodationTypes: AccommodationTypeCardsData;
  faq: FAQAccordionPremiumData;
  cta: ContextualCTA;
  relatedGuides: RelatedGuidesRailData;
};
