import { useEffect, useState } from 'react';

const sections = [
  { id: 'top', label: '처음' },
  { id: 'invitation', label: '초대' },
  { id: 'info', label: '예식' },
  { id: 'location', label: '길' },
  { id: 'gallery', label: '사진' },
  { id: 'gift', label: '마음' },
  { id: 'contact', label: '연락' },
  { id: 'thanks', label: '감사' },
];

/**
 * 현재 section 위치를 보여주고 원하는 section으로 이동하는 floating navigator입니다.
 * @returns {JSX.Element} Section navigator UI를 반환합니다.
 */
export function SectionNavigator() {
  const [activeId, setActiveId] = useState('top');

  useEffect(() => {
    const targets = sections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean);

    if (!targets.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          setActiveId(visibleEntry.target.id);
        }
      },
      {
        rootMargin: '-30% 0px -45% 0px',
        threshold: [0.12, 0.28, 0.5],
      },
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  /**
   * 선택한 section으로 부드럽게 이동합니다.
   * @param {string} targetId 이동할 section id입니다.
   * @returns {void}
   */
  const handleNavigate = (targetId) => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav
      className="section-navigator fixed top-1/2 z-50 -translate-y-1/2 rounded-full border border-wedding-champagne/30 bg-wedding-white/70 px-1.5 py-2.5 shadow-[0_10px_24px_rgba(43,43,43,0.08)]"
      aria-label="섹션 이동"
    >
      <div className="flex flex-col items-center gap-1.5">
        {sections.map((section) => {
          const isActive = activeId === section.id;

          return (
            <button
              key={section.id}
              className={`pressable h-2 rounded-full border border-wedding-champagne/40 transition-all ${
                isActive
                  ? 'w-5 bg-wedding-champagne'
                  : 'w-2 bg-wedding-white/78 hover:bg-wedding-petal'
              }`}
              type="button"
              aria-label={`${section.label} 섹션으로 이동`}
              aria-current={isActive ? 'true' : undefined}
              onClick={() => handleNavigate(section.id)}
            />
          );
        })}
      </div>
    </nav>
  );
}
