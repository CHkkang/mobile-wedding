import { transitGuides } from '../../data/wedding';
import { ActionButton } from '../common/ActionButton';
import { BlurCard } from '../common/BlurCard';
import { Section } from '../common/Section';
import { KakaoMapPreview } from '../map/KakaoMapPreview';

const kakaoMapAppKey = import.meta.env.VITE_KAKAO_MAP_APP_KEY;

/**
 * 오시는 길과 카카오맵을 제공하는 section입니다.
 * @param {{wedding: {venue: string, address: string, mapQuery: string}, onCopy: (text: string, successMessage: string) => Promise<void>}} props Location action props입니다.
 * @returns {JSX.Element} Location UI를 반환합니다.
 */
export function LocationSection({ wedding, onCopy }) {
  return (
    <Section id="location" eyebrow="Location" title="오시는 길">
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
        <TransitGuideList guides={transitGuides} />
      </BlurCard>
    </Section>
  );
}

/**
 * 교통수단별 오시는 길 안내를 카드 목록으로 표시합니다.
 * @param {{guides: Array<{title: string, items: string[]}>}} props 교통 안내 데이터입니다.
 * @returns {JSX.Element} Transit guide list UI를 반환합니다.
 */
function TransitGuideList({ guides }) {
  return (
    <div className="mt-7 space-y-4 text-left">
      {guides.map((guide) => (
        <article key={guide.title} className="rounded-xl bg-wedding-white/45 p-4">
          <h3 className="text-[14px] font-semibold text-wedding-ink">{guide.title}</h3>
          <ul className="mt-3 space-y-2">
            {guide.items.map((item) => (
              <li key={item} className="flex gap-2 text-[13px] leading-6 text-wedding-ink/65">
                <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-wedding-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
