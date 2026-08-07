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
    <Section id="gallery" eyebrow="IV" title="Gallery" nextId={nextId}>
      <div className="stagger-grid grid grid-cols-2 gap-3">
        {galleryImages.map((image, index) => (
          <GalleryThumbnail
            key={image}
            image={image}
            index={index}
            isFeatured={index === 0}
            onSelect={() => setSelectedIndex(index)}
          />
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
 * 갤러리 썸네일을 표시하는 카드형 button component입니다.
 * @param {{image: string, index: number, isFeatured: boolean, onSelect: () => void}} props 이미지 정보와 선택 handler입니다.
 * @returns {JSX.Element} Gallery thumbnail button UI를 반환합니다.
 */
function GalleryThumbnail({ image, index, isFeatured, onSelect }) {
  return (
    <button
      className={`pressable group relative overflow-hidden rounded-[24px] border border-white/75 bg-wedding-mist shadow-[0_16px_40px_rgba(80,64,54,0.14)] ${
        isFeatured ? 'col-span-2 aspect-[4/5]' : 'aspect-[3/4]'
      }`}
      type="button"
      onClick={onSelect}
      aria-label={`웨딩 갤러리 사진 ${index + 1} 크게 보기`}
    >
      <img
        className="h-full w-full object-cover transition duration-500 md:group-hover:scale-[1.03]"
        src={image}
        alt={`웨딩 갤러리 사진 ${index + 1}`}
        loading={index === 0 ? 'eager' : 'lazy'}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/8 via-transparent to-black/38" />
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
        <span className="ui-font rounded-full border border-white/45 bg-black/42 px-3 py-1.5 text-[11px] font-semibold text-white">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="ui-font rounded-full border border-white/45 bg-wedding-white/88 px-3 py-1.5 text-[11px] font-semibold text-wedding-ink/70">
          View
        </span>
      </div>
    </button>
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
