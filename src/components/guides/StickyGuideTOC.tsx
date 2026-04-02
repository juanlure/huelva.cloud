import type { GuideTOCItem } from '@/types/guides';

export function StickyGuideTOC({ items }: { items: GuideTOCItem[] }) {
  return (
    <nav className="premium-guide-toc" aria-label="Tabla de contenidos">
      <div className="premium-guide-container">
        <ul className="premium-guide-toc__list">
          {items.map((item) => (
            <li key={item.id}>
              <a className="premium-guide-toc__link" href={`#${item.id}`}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
