import Link from 'next/link';

interface StrategicGuideCTAProps {
  eyebrow: string;
  title: string;
  body: string;
  primary: {
    href: string;
    label: string;
  };
  secondary?: {
    href: string;
    label: string;
  };
}

export default function StrategicGuideCTA({ eyebrow, title, body, primary, secondary }: StrategicGuideCTAProps) {
  return (
    <section
      aria-label={title}
      className="mt-12 mb-10 rounded-[28px] border border-[rgba(26,42,58,0.08)] bg-[linear-gradient(135deg,rgba(212,85,58,0.08),rgba(26,42,58,0.03))] p-6 md:p-8 shadow-[0_20px_70px_rgba(26,42,58,0.08)]"
    >
      <div className="flex flex-col gap-4">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4553A]">{eyebrow}</p>
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#0F1A24] leading-tight">{title}</h2>
          <p className="text-base md:text-lg leading-relaxed text-[#3A4A5A]">{body}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href={primary.href}
            className="inline-flex items-center justify-center rounded-full bg-[#0F1A24] px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            {primary.label}
          </Link>
          {secondary ? (
            <Link
              href={secondary.href}
              className="inline-flex items-center justify-center rounded-full border border-[rgba(26,42,58,0.14)] bg-white px-5 py-3 text-sm font-semibold text-[#0F1A24] transition-colors hover:border-[#D4553A] hover:text-[#D4553A]"
            >
              {secondary.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
