import { useEffect, useRef, useState } from 'react';

/**
 * Viewport 진입 여부를 감지해 section reveal animation을 제어합니다.
 * @returns {[React.RefObject<HTMLElement>, boolean]} 관찰 대상 ref와 노출 여부입니다.
 */
export function useRevealOnScroll() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const target = sectionRef.current;

    if (!target) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '0px 0px -18% 0px',
        threshold: 0.22,
      },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, []);

  return [sectionRef, isVisible];
}
