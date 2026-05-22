import { useState } from 'react';
import { createPortal } from 'react-dom';
import { galleryImages } from '../../data/wedding';
import { Section } from '../common/Section';

/**
 * 웨딩 사진을 2열 grid로 보여주는 gallery section입니다.
 * @param {{nextId?: string}} props 다음 section id입니다.
 * @returns {JSX.Element} Gallery UI를 반환합니다.
 */
export function GallerySection({ nextId }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <Section id="gallery" eyebrow="Gallery" title="Gallery" nextId={nextId}>
      <div className="stagger-grid grid grid-cols-2 gap-3">
        {galleryImages.map((image, index) => (
          <button
            key={image}
            className="pressable aspect-[3/4] overflow-hidden rounded-[22px] bg-wedding-mist shadow-[0_14px_34px_rgba(80,64,54,0.12)]"
            onClick={() => setSelectedIndex(index)}
            aria-label={`웨딩 갤러리 사진 ${index + 1} 크게 보기`}
          >
            <img
              className="h-full w-full object-cover transition duration-500 md:hover:scale-[1.03]"
              src={image}
              alt={`웨딩 갤러리 사진 ${index + 1}`}
              loading="lazy"
            />
          </button>
        ))}
      </div>
      {selectedIndex !== null && (
        <GalleryModal
          images={galleryImages}
          initialIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </Section>
  );
}

/**
 * 갤러리 이미지를 큰 화면 slider로 보여주는 modal component입니다.
 * @param {{images: string[], initialIndex: number, onClose: () => void}} props Modal image 목록과 close handler입니다.
 * @returns {JSX.Element} Gallery slider modal UI를 반환합니다.
 */
function GalleryModal({ images, initialIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [touchStartX, setTouchStartX] = useState(null);
  const currentImage = images[currentIndex];

  /**
   * 다음 이미지 index로 이동합니다.
   * @returns {void}
   */
  const showNext = () => {
    setCurrentIndex((index) => (index + 1) % images.length);
  };

  /**
   * 이전 이미지 index로 이동합니다.
   * @returns {void}
   */
  const showPrevious = () => {
    setCurrentIndex((index) => (index - 1 + images.length) % images.length);
  };

  /**
   * 터치 시작 위치를 저장합니다.
   * @param {React.TouchEvent<HTMLDivElement>} event Touch start event입니다.
   * @returns {void}
   */
  const handleTouchStart = (event) => {
    setTouchStartX(event.touches[0].clientX);
  };

  /**
   * 터치 이동 거리에 따라 이전/다음 사진으로 이동합니다.
   * @param {React.TouchEvent<HTMLDivElement>} event Touch end event입니다.
   * @returns {void}
   */
  const handleTouchEnd = (event) => {
    if (touchStartX === null) {
      return;
    }

    const touchEndX = event.changedTouches[0].clientX;
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) > 48) {
      if (swipeDistance > 0) {
        showPrevious();
      } else {
        showNext();
      }
    }

    setTouchStartX(null);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] grid h-dvh w-dvw place-items-center bg-wedding-ink/70 px-4 py-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`웨딩 갤러리 사진 ${currentIndex + 1} 크게 보기`}
    >
      <div
        className="relative flex h-full w-full max-w-[520px] items-center"
        onClick={(event) => event.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          className="pressable absolute right-0 top-0 z-10 rounded-full border border-white/60 bg-wedding-white/88 px-4 py-2 text-[13px] font-semibold text-wedding-ink/72 shadow-[0_10px_28px_rgba(0,0,0,0.14)]"
          onClick={onClose}
          aria-label="큰 사진 닫기"
        >
          닫기
        </button>
        <button
          className="pressable absolute left-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-wedding-white/88 text-[22px] font-semibold text-wedding-ink/72 shadow-[0_10px_28px_rgba(0,0,0,0.14)]"
          type="button"
          aria-label="이전 사진 보기"
          onClick={showPrevious}
        >
          ‹
        </button>
        <div className="flex w-full flex-col items-center">
          <img
            key={currentImage}
            className="gallery-spin-in max-h-[78dvh] w-full rounded-2xl object-contain shadow-[0_18px_50px_rgba(0,0,0,0.2)]"
            src={currentImage}
            alt={`웨딩 갤러리 큰 사진 ${currentIndex + 1}`}
          />
          <p className="mt-4 rounded-full border border-white/45 bg-wedding-white/86 px-4 py-2 text-[12px] font-semibold text-wedding-ink/62 shadow-[0_10px_28px_rgba(0,0,0,0.12)]">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
        <button
          className="pressable absolute right-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-wedding-white/88 text-[22px] font-semibold text-wedding-ink/72 shadow-[0_10px_28px_rgba(0,0,0,0.14)]"
          type="button"
          aria-label="다음 사진 보기"
          onClick={showNext}
        >
          ›
        </button>
      </div>
    </div>,
    document.body,
  );
}
