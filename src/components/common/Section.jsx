import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import { ScrollCue } from './ScrollCue';

/**
 * 청첩장 본문 section의 공통 layout component입니다.
 * @param {{id: string, eyebrow: string, title: string, children: React.ReactNode}} props Section props입니다.
 * @returns {JSX.Element} 공통 section layout을 반환합니다.
 */
export function Section({ id, eyebrow, title, children }) {
  const [sectionRef, isVisible] = useRevealOnScroll();

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`snap-section reveal-section px-6 py-16 ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="mb-9 text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-wedding-champagne">
          {eyebrow}
        </p>
        <h2 className="mt-3 font-display text-[31px] font-medium tracking-[0.02em] text-wedding-ink">
          {title}
        </h2>
        <div className="section-rule mx-auto mt-5 h-px w-24" />
      </div>
      {children}
      <ScrollCue />
    </section>
  );
}
