import { useState } from 'react';
import { galleryImages } from '../../data/wedding';
import { Section } from '../common/Section';

/**
 * 웨딩 사진을 2열 grid로 보여주는 gallery section입니다.
 * @returns {JSX.Element} Gallery UI를 반환합니다.
 */
export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <Section id="gallery" eyebrow="Gallery" title="Gallery">
      <div className="grid grid-cols-2 gap-3">
        {galleryImages.map((image, index) => (
          <button
            key={image}
            className="aspect-[3/4] overflow-hidden rounded-2xl bg-wedding-mist"
            onClick={() => setSelectedImage({ src: image, index })}
            aria-label={`웨딩 갤러리 사진 ${index + 1} 크게 보기`}
          >
            <img
              className="h-full w-full object-cover"
              src={image}
              alt={`웨딩 갤러리 사진 ${index + 1}`}
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
  return (
    <div
      className="fixed inset-0 z-40 grid place-items-center bg-wedding-ink/55 px-5 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`웨딩 갤러리 사진 ${image.index + 1} 크게 보기`}
    >
      <div className="relative w-full max-w-[420px]" onClick={(event) => event.stopPropagation()}>
        <button
          className="absolute -right-1 -top-12 rounded-full border border-white/50 bg-white/25 px-4 py-2 text-[13px] text-white backdrop-blur"
          onClick={onClose}
          aria-label="큰 사진 닫기"
        >
          닫기
        </button>
        <img
          className="gallery-spin-in max-h-[78vh] w-full rounded-2xl object-contain"
          src={image.src}
          alt={`웨딩 갤러리 큰 사진 ${image.index + 1}`}
        />
      </div>
    </div>
  );
}
