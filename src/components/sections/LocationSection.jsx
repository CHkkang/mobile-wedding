import { useState } from 'react';
import { transitGuides } from '../../data/wedding';
import { ActionButton } from '../common/ActionButton';
import { BlurCard } from '../common/BlurCard';
import { ModalShell } from '../common/ModalShell';
import { Section } from '../common/Section';
import { KakaoMapPreview } from '../map/KakaoMapPreview';

const kakaoMapAppKey = import.meta.env.VITE_KAKAO_MAP_APP_KEY;

/**
 * 오시는 길과 카카오맵을 제공하는 section입니다.
 * @param {{wedding: {venue: string, address: string, mapQuery: string}, nextId?: string, onCopy: (text: string, successMessage: string) => Promise<void>}} props Location action props입니다.
 * @returns {JSX.Element} Location UI를 반환합니다.
 */
export function LocationSection({ wedding, nextId, onCopy }) {
  const [isTransitModalOpen, setIsTransitModalOpen] = useState(false);

  return (
    <Section id="location" eyebrow="Location" title="오시는 길" nextId={nextId}>
      <BlurCard>
        <p className="text-center text-[16px] font-medium">{wedding.venue}</p>
        <p className="mt-2 text-center text-[14px] text-wedding-ink/65">{wedding.address}</p>
        <KakaoMapPreview
          address={wedding.address}
          appKey={kakaoMapAppKey}
          mapQuery={wedding.mapQuery}
          venue={wedding.venue}
        />
        <div className="mt-5 grid grid-cols-2 gap-3">
          <ActionButton
            label="카카오맵"
            onClick={() =>
              window.open(
                `https://map.kakao.com/link/search/${encodeURIComponent(wedding.mapQuery)}`,
                '_blank',
              )
            }
          />
          <ActionButton
            label="주소 복사"
            onClick={() => onCopy(wedding.address, '주소가 복사되었습니다.')}
          />
        </div>
        <button
          className="pressable luxury-button mt-3 w-full rounded-full border border-wedding-champagne/55 px-5 py-4 text-[14px] font-semibold text-wedding-ink/78 shadow-[0_12px_28px_rgba(80,64,54,0.08)] hover:border-wedding-blush hover:text-wedding-ink"
          type="button"
          onClick={() => setIsTransitModalOpen(true)}
        >
          교통 안내 보기
        </button>
      </BlurCard>
      {isTransitModalOpen && (
        <TransitGuideModal guides={transitGuides} onClose={() => setIsTransitModalOpen(false)} />
      )}
    </Section>
  );
}

/**
 * 교통수단별 오시는 길 안내를 modal로 표시합니다.
 * @param {{guides: Array<{title: string, items: string[]}>, onClose: () => void}} props 교통 안내 modal props입니다.
 * @returns {JSX.Element} Transit guide modal UI를 반환합니다.
 */
function TransitGuideModal({ guides, onClose }) {
  return (
    <ModalShell eyebrow="Location" title="교통 안내" ariaLabel="교통 안내 보기" onClose={onClose}>
      <div className="stagger-grid space-y-4 text-left">
          {guides.map((guide) => (
            <article
              key={guide.title}
              className="rounded-[22px] border border-wedding-champagne/25 bg-wedding-white/82 p-5 shadow-[0_10px_28px_rgba(80,64,54,0.05)]"
            >
              <h4 className="text-[15px] font-semibold text-wedding-ink">{guide.title}</h4>
              <ul className="mt-3 space-y-2">
                {guide.items.map((item) => (
                  <li key={item} className="flex gap-2 text-[13px] leading-6 text-wedding-ink/65">
                    <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-wedding-champagne" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
      </div>
    </ModalShell>
  );
}
