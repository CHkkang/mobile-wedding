import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import { ScrollCue } from './ScrollCue';

/**
 * 청첩장 본문 section의 공통 layout component입니다.
 * @param {{id: string, eyebrow?: string, title: string, nextId?: string, compact?: boolean, children: React.ReactNode}} props Section props입니다.
 * @returns {JSX.Element} 공통 section layout을 반환합니다.
 */
export function Section({ id, eyebrow, title, nextId, compact = false, children }) {
  const [sectionRef, isVisible] = useRevealOnScroll();

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`snap-section reveal-section px-6 ${compact ? 'py-10' : 'py-16'} ${isVisible ? 'is-visible' : ''}`}
    >
      <div className={`${compact ? 'mb-5' : 'mb-9'} text-center`}>
        {eyebrow && (
          <p className="ui-font text-[11px] font-medium uppercase tracking-[0.34em] text-wedding-champagne">
            {eyebrow}
          </p>
        )}
        <h2 className={`${eyebrow ? 'mt-3' : ''} font-display ${compact ? 'text-[29px]' : 'text-[32px]'} font-medium tracking-[0.02em] text-wedding-ink`}>
          {title}
        </h2>
        <div className={compact ? 'mt-3' : 'mt-5'}>
          <span className="section-ornament" aria-hidden="true">
            <span />
          </span>
        </div>
      </div>
      <div className="mx-auto w-full max-w-[408px]">{children}</div>
      <ScrollCue targetId={nextId} />
    </section>
  );
}
