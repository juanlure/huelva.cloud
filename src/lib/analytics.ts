export type CommercialSurface =
  | 'collab_banner'
  | 'header_advertising'
  | 'footer_email'
  | 'contact_hero_mail'
  | 'contact_card_mail'
  | 'contact_final_mail'
  | 'contact_copy_email'
  | 'home_top_collab'
  | 'home_contact_card'
  | 'home_bottom_contact';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackCommercialClick(surface: CommercialSurface, destination: string) {
  if (typeof window === 'undefined') return;

  window.gtag?.('event', 'select_promotion', {
    event_category: 'commercial_cta',
    event_label: surface,
    promotion_name: surface,
    destination,
  });

  window.gtag?.('event', 'generate_lead', {
    event_category: 'lead',
    event_label: surface,
    value: 1,
    currency: 'EUR',
    destination,
  });

  window.dataLayer?.push?.({
    event: 'commercial_cta_click',
    surface,
    destination,
  });
}
