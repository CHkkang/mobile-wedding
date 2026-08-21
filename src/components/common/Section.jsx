import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import { ScrollCue } from './ScrollCue';

const previousSectionIds = {
  invitation: 'top',
  info: 'invitation',
  location: 'info',
  gallery: 'location',
  gift: 'gallery',
  contact: 'gift',
  thanks: 'contact',
};

/**
 * 청첩장 본문 section의 공통 layout component입니다.
 * @param {{id: string, eyebrow?: string, title: string, nextId?: string, compact?: boolean, children: React.ReactNode}} props Section props입니다.
 * @returns {JSX.Element} 공통 section layout을 반환합니다.
 */
export function Section({ id, eyebrow, title, nextId, compact = false, children }) {
  const [sectionRef, isVisible] = useRevealOnScroll();
  const previousId = previousSectionIds[id];

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`snap-section reveal-section relative flex flex-col justify-center px-6 pb-24 pt-20 ${isVisible ? 'is-visible' : ''}`}
    >
      {previousId && (
        <div className="absolute left-0 right-0 top-5">
          <ScrollCue targetId={previousId} direction="up" />
        </div>
      )}
      <div className={`${compact ? 'mb-4' : 'mb-7'} text-center`}>
        {eyebrow && (
          <p className="ui-font text-[11px] font-medium uppercase tracking-[0.34em] text-wedding-champagne">
            {eyebrow}
          </p>
        )}
        <h2 className={`${eyebrow ? 'mt-3' : ''} font-display ${compact ? 'text-[29px]' : 'text-[32px]'} font-medium tracking-[0.02em] text-wedding-ink`}>
          {title}
        </h2>
        <div className={compact ? 'mt-2.5' : 'mt-4'}>
          <span className="section-ornament" aria-hidden="true">
            <span />
          </span>
        </div>
      </div>
      <div className="mx-auto w-full max-w-[408px]">{children}</div>
      <div className="absolute bottom-5 left-0 right-0">
        <ScrollCue targetId={nextId} />
      </div>
    </section>
  );
}
