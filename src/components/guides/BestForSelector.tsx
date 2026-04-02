'use client';

import { useMemo, useState } from 'react';
import type { BestForSelectorData } from '@/types/guides';

export function BestForSelector({ data }: { data: BestForSelectorData }) {
  const [selected, setSelected] = useState(data.options[0]?.label ?? '');

  const activeOption = useMemo(
    () => data.options.find((option) => option.label === selected) ?? data.options[0],
    [data.options, selected]
  );

  return (
    <section id={data.sectionId} className="premium-guide-section">
      <div className="premium-guide-container premium-guide-stack-lg">
        <div className="premium-guide-reading-width premium-guide-stack-sm">
          <p className="premium-guide-eyebrow">Según tu viaje</p>
          <h2 className="premium-guide-h2">{data.title}</h2>
          {data.intro ? <p className="premium-guide-lead">{data.intro}</p> : null}
        </div>

        <div className="premium-guide-bestfor">
          <div className="premium-guide-bestfor__list" role="tablist" aria-label={data.title}>
            {data.options.map((option) => (
              <button
                key={option.label}
                type="button"
                className={`premium-guide-bestfor__button${activeOption?.label === option.label ? ' is-active' : ''}`}
                onClick={() => setSelected(option.label)}
              >
                <span className="premium-guide-bestfor__label">{option.label}</span>
                <span className="premium-guide-bestfor__audience">{option.audience}</span>
              </button>
            ))}
          </div>

          {activeOption ? (
            <div className="premium-guide-panel premium-guide-bestfor__result premium-guide-stack-sm">
              <p className="premium-guide-eyebrow">Tu mejor jugada</p>
              <h3 className="premium-guide-h3">{activeOption.label}</h3>
              <p className="premium-guide-kicker">{activeOption.audience}</p>
              <p className="premium-guide-body premium-guide-body--strong">{activeOption.recommendation}</p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
