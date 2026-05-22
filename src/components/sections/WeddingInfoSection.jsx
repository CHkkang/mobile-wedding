import { BlurCard } from '../common/BlurCard';
import { InfoRow } from '../common/InfoRow';
import { Section } from '../common/Section';

/**
 * 예식 일시와 장소 정보를 제공하는 section입니다.
 * @param {{wedding: {date: string, time: string, venue: string}, onCalendarDownload: () => void}} props 예식 정보와 calendar handler입니다.
 * @returns {JSX.Element} Wedding info UI를 반환합니다.
 */
export function WeddingInfoSection({ wedding, onCalendarDownload }) {
  return (
    <Section id="info" eyebrow="Wedding Day" title="예식정보">
      <BlurCard>
        <div className="mb-3 rounded-2xl bg-wedding-petal/55 px-4 py-5 text-center">
          <p className="text-[12px] font-medium tracking-[0.2em] text-wedding-champagne">
            DECEMBER
          </p>
          <p className="mt-2 text-[34px] font-semibold leading-none text-wedding-ink">12</p>
        </div>
        <InfoRow label="날짜" value={wedding.date} />
        <InfoRow label="시간" value={wedding.time} />
        <InfoRow label="장소" value={wedding.venue} />
        <button
          className="mt-5 w-full rounded-full border border-wedding-champagne/55 bg-wedding-white/88 px-5 py-4 text-[14px] font-semibold text-wedding-ink/78 shadow-[0_12px_28px_rgba(80,64,54,0.08)] transition hover:border-wedding-blush hover:bg-white hover:text-wedding-ink"
          type="button"
          onClick={onCalendarDownload}
        >
          캘린더에 일정 추가
        </button>
      </BlurCard>
    </Section>
  );
}
