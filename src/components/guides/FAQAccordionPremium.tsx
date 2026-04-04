'use client';

import { useState } from 'react';
import type { FAQAccordionPremiumData } from '@/types/guides';

export function FAQAccordionPremium({ data }: { data: FAQAccordionPremiumData }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id={data.sectionId} className="premium-guide-section premium-guide-section--contrast">
      <div className="premium-guide-container premium-guide-reading-width premium-guide-stack-lg">
        <div className="premium-guide-stack-sm">
          {data.eyebrow ? <p className="premium-guide-eyebrow">{data.eyebrow}</p> : null}
          <h2 className="premium-guide-h2">{data.title}</h2>
          {data.intro ? <p className="premium-guide-lead">{data.intro}</p> : null}
        </div>

        <div className="premium-guide-faq">
          {data.items.map((item, index) => {
            const isOpen = index === openIndex;
            return (
              <article key={item.question} className="premium-guide-faq__item">
                <button
                  type="button"
                  className="premium-guide-faq__trigger"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <span className="premium-guide-faq__icon">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen ? <div className="premium-guide-faq__content"><p>{item.answer}</p></div> : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
