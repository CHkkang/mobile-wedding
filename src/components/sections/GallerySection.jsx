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
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <Section id="gallery" eyebrow="Gallery" title="Gallery" nextId={nextId}>
      <div className="stagger-grid grid grid-cols-2 gap-3">
        {galleryImages.map((image, index) => (
          <button
            key={image}
            className="pressable aspect-[3/4] overflow-hidden rounded-[22px] bg-wedding-mist shadow-[0_14px_34px_rgba(80,64,54,0.12)]"
            onClick={() => setSelectedImage({ src: image, index })}
            aria-label={`웨딩 갤러리 사진 ${index + 1} 크게 보기`}
          >
            <img
              className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
              src={image}
              alt={`웨딩 갤러리 사진 ${index + 1}`}
              loading="lazy"
            />
          </button>
        ))}
      </div>
      {selectedImage && (
        <GalleryModal image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </Section>
  );
}

/**
 * 갤러리 이미지를 큰 화면으로 보여주는 modal component입니다.
 * @param {{image: {src: string, index: number}, onClose: () => void}} props Modal image와 close handler입니다.
 * @returns {JSX.Element} Gallery modal UI를 반환합니다.
 */
function GalleryModal({ image, onClose }) {
  return createPortal(
    <div
      className="fixed inset-0 z-[100] grid h-dvh w-dvw place-items-center bg-[#2b2724]/70 px-4 py-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`웨딩 갤러리 사진 ${image.index + 1} 크게 보기`}
    >
      <div
        className="relative flex h-full w-full max-w-[520px] items-center"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="pressable absolute right-0 top-0 z-10 rounded-full border border-white/60 bg-wedding-white/88 px-4 py-2 text-[13px] font-semibold text-wedding-ink/72 shadow-[0_10px_28px_rgba(0,0,0,0.14)]"
          onClick={onClose}
          aria-label="큰 사진 닫기"
        >
          닫기
        </button>
        <img
          className="gallery-spin-in max-h-full w-full rounded-2xl object-contain"
          src={image.src}
          alt={`웨딩 갤러리 큰 사진 ${image.index + 1}`}
        />
      </div>
    </div>,
    document.body,
  );
}
