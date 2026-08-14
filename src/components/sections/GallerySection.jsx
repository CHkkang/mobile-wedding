import { useState } from 'react';
import { createPortal } from 'react-dom';
import { galleryImages } from '../../data/wedding';
import { Section } from '../common/Section';

/**
 * 웨딩 사진을 한 화면에 들어오는 horizontal slider로 보여주는 gallery section입니다.
 * @param {{nextId?: string}} props 다음 section id입니다.
 * @returns {JSX.Element} Gallery UI를 반환합니다.
 */
export function GallerySection({ nextId }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  /**
   * Slider scroll 위치를 기준으로 현재 보고 있는 gallery index를 계산합니다.
   * @param {React.UIEvent<HTMLDivElement>} event Scroll event입니다.
   * @returns {void}
   */
  const handleSlideScroll = (event) => {
    const slider = event.currentTarget;
    const firstSlide = slider.querySelector('[data-gallery-slide="true"]');

    if (!firstSlide) {
      return;
    }

    const slideWidth = firstSlide.getBoundingClientRect().width;
    const gap = Number.parseFloat(window.getComputedStyle(slider).columnGap || '0');
    const nextIndex = Math.round(slider.scrollLeft / (slideWidth + gap));
    const boundedIndex = Math.min(Math.max(nextIndex, 0), galleryImages.length - 1);

    setActiveIndex((currentIndex) => (
      currentIndex === boundedIndex ? currentIndex : boundedIndex
    ));
  };

  return (
    <Section id="gallery" eyebrow="IV" title="Gallery" nextId={nextId} compact>
      <div className="polish-card">
        <div className="mb-3 flex items-center justify-between px-1">
          <p className="ui-font text-[11px] font-semibold uppercase tracking-[0.22em] text-wedding-ink/45">
            Swipe Gallery
          </p>
          <p className="ui-font rounded-full border border-wedding-blush/45 bg-wedding-white/82 px-3 py-1 text-[11px] font-semibold text-wedding-ink/62 shadow-[0_8px_18px_rgba(80,64,54,0.08)]">
            {String(activeIndex + 1).padStart(2, '0')} / {String(galleryImages.length).padStart(2, '0')}
          </p>
        </div>
        <div
          className="gallery-slider -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-6 pb-4"
          onScroll={handleSlideScroll}
          aria-label="웨딩 갤러리 슬라이드"
        >
        {galleryImages.map((image, index) => (
          <GallerySlide
            key={image}
            image={image}
            index={index}
            isActive={index === activeIndex}
            onSelect={() => setSelectedIndex(index)}
          />
        ))}
        </div>
        <GallerySlideProgress activeIndex={activeIndex} count={galleryImages.length} />
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
 * 갤러리 slider 안에서 한 장의 사진 preview를 표시하는 card button입니다.
 * @param {{image: string, index: number, isActive: boolean, onSelect: () => void}} props 이미지 정보와 선택 handler입니다.
 * @returns {JSX.Element} Gallery slide button UI를 반환합니다.
 */
function GallerySlide({ image, index, isActive, onSelect }) {
  return (
    <button
      className={`pressable group relative h-[min(48svh,400px)] min-h-[300px] w-[82%] shrink-0 snap-center overflow-hidden rounded-[26px] border bg-wedding-mist text-left shadow-[0_18px_42px_rgba(80,64,54,0.16)] transition duration-300 ${
        isActive
          ? 'border-white/90 opacity-100'
          : 'border-white/60 opacity-[0.72]'
      }`}
      type="button"
      onClick={onSelect}
      aria-label={`웨딩 갤러리 사진 ${index + 1} 크게 보기`}
      data-gallery-slide="true"
    >
      <img
        className="h-full w-full object-cover transition duration-500 md:group-hover:scale-[1.03]"
        src={image}
        alt={`웨딩 갤러리 사진 ${index + 1}`}
        loading={index === 0 ? 'eager' : 'lazy'}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/14 via-transparent to-black/46" />
      <div className="absolute left-4 top-4">
        <span className="ui-font rounded-full border border-white/45 bg-black/48 px-3 py-1.5 text-[11px] font-semibold text-white shadow-[0_10px_22px_rgba(0,0,0,0.22)]">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
        <span className="font-script text-[34px] leading-none text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.42)]">
          Memories
        </span>
        <span className="ui-font inline-flex items-center gap-1.5 rounded-full border border-white/65 bg-black/68 px-3.5 py-2.5 text-[11px] font-semibold text-white shadow-[0_12px_26px_rgba(0,0,0,0.28)] backdrop-blur-sm">
          <span aria-hidden="true">＋</span>
          사진 크게 보기
        </span>
      </div>
    </button>
  );
}

/**
 * Gallery slider의 현재 위치를 dot과 drag hint로 보여줍니다.
 * @param {{activeIndex: number, count: number}} props 현재 index와 전체 slide 수입니다.
 * @returns {JSX.Element} Gallery progress UI를 반환합니다.
 */
function GallerySlideProgress({ activeIndex, count }) {
  return (
    <div className="mt-1 flex items-center justify-between px-1">
      <div className="flex items-center gap-1.5" aria-hidden="true">
        {Array.from({ length: count }).map((_, index) => (
          <span
            key={index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? 'w-7 bg-wedding-champagne'
                : 'w-1.5 bg-wedding-ink/18'
            }`}
          />
        ))}
      </div>
      <div className="ui-font flex items-center gap-2 text-[11px] font-semibold text-wedding-ink/48">
        <span>옆으로 넘겨보기</span>
        <span className="gallery-swipe-arrow" aria-hidden="true" />
      </div>
    </div>
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
      className="fixed inset-0 z-[100] h-dvh w-dvw overflow-hidden bg-wedding-ink"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`웨딩 갤러리 사진 ${currentIndex + 1} 크게 보기`}
    >
      <div
        className="relative h-full w-full"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          key={currentImage}
          className="gallery-spin-in h-full w-full object-cover"
          src={currentImage}
          alt={`웨딩 갤러리 큰 사진 ${currentIndex + 1}`}
          onClick={(event) => event.stopPropagation()}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/45" />
        <button
          className="pressable absolute right-4 top-5 z-10 rounded-full border border-white/55 bg-black/82 px-5 py-3 text-[13px] font-semibold text-white shadow-[0_14px_34px_rgba(0,0,0,0.42)]"
          onClick={onClose}
          aria-label="큰 사진 닫기"
        >
          닫기
        </button>
        <GalleryControlButton direction="previous" onClick={showPrevious} />
        <GalleryControlButton direction="next" onClick={showNext} />
        <p
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/55 bg-black/74 px-4 py-2 text-[12px] font-semibold text-white shadow-[0_14px_34px_rgba(0,0,0,0.36)]"
          onClick={(event) => event.stopPropagation()}
        >
          {currentIndex + 1} / {images.length}
        </p>
      </div>
    </div>,
    document.body,
  );
}

/**
 * 갤러리 modal의 이전/다음 control button입니다.
 * @param {{direction: 'previous' | 'next', onClick: () => void}} props 방향과 click handler입니다.
 * @returns {JSX.Element} Gallery control button UI를 반환합니다.
 */
function GalleryControlButton({ direction, onClick }) {
  const isPrevious = direction === 'previous';

  /**
   * 부모 overlay click으로 닫히지 않도록 전파를 막고 이동합니다.
   * @param {React.MouseEvent<HTMLButtonElement>} event Click event입니다.
   * @returns {void}
   */
  const handleClick = (event) => {
    event.stopPropagation();
    onClick();
  };

  return (
    <button
      className={`pressable absolute top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/55 bg-black/82 text-white shadow-[0_14px_34px_rgba(0,0,0,0.42)] ${
        isPrevious ? 'left-4' : 'right-4'
      }`}
      type="button"
      aria-label={isPrevious ? '이전 사진 보기' : '다음 사진 보기'}
      onClick={handleClick}
    >
      {isPrevious ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </button>
  );
}

/**
 * 이전 사진 이동 icon입니다.
 * @returns {JSX.Element} Left chevron SVG를 반환합니다.
 */
function ChevronLeftIcon() {
  return (
    <svg aria-hidden="true" className="h-7 w-7" viewBox="0 0 24 24" fill="none">
      <path
        d="m15 18-6-6 6-6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
      />
    </svg>
  );
}

/**
 * 다음 사진 이동 icon입니다.
 * @returns {JSX.Element} Right chevron SVG를 반환합니다.
 */
function ChevronRightIcon() {
  return (
    <svg aria-hidden="true" className="h-7 w-7" viewBox="0 0 24 24" fill="none">
      <path
        d="m9 18 6-6-6-6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
      />
    </svg>
  );
}
