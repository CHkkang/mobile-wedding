import { BlurCard } from '../common/BlurCard';
import { InfoRow } from '../common/InfoRow';
import { Section } from '../common/Section';
import { getDaysUntil } from '../../utils/date';

/**
 * 예식 일시와 장소 정보를 제공하는 section입니다.
 * @param {{wedding: {date: string, time: string, venue: string}, nextId?: string, onCalendarDownload: () => void}} props 예식 정보와 calendar handler입니다.
 * @returns {JSX.Element} Wedding info UI를 반환합니다.
 */
export function WeddingInfoSection({ wedding, nextId, onCalendarDownload }) {
  const daysUntilWedding = getDaysUntil(wedding.calendar.startDateTime);

  return (
    <Section id="info" eyebrow="Wedding Day" title="예식정보" nextId={nextId}>
      <BlurCard>
        <div className="mb-4 rounded-[22px] border border-wedding-champagne/25 bg-wedding-petal/55 px-4 py-5 text-center shadow-[inset_0_0_0_1px_rgba(255,255,255,0.48)]">
          <p className="text-[12px] font-medium tracking-[0.2em] text-wedding-champagne">
            DECEMBER
          </p>
          <p className="mt-2 text-[34px] font-semibold leading-none text-wedding-ink">12</p>
        </div>
        <div className="mb-3 rounded-[22px] border border-wedding-champagne/30 bg-wedding-white/82 px-5 py-5 text-center shadow-[0_12px_32px_rgba(80,64,54,0.06)]">
          <p className="text-[11px] font-semibold tracking-[0.28em] text-wedding-champagne">
            WEDDING D-DAY
          </p>
          <p className="mt-3 text-[32px] font-semibold leading-none text-wedding-ink">
            {formatDday(daysUntilWedding)}
          </p>
          <p className="mt-3 text-[13px] text-wedding-ink/58">
            {formatDdayMessage(daysUntilWedding)}
          </p>
        </div>
        <InfoRow label="날짜" value={wedding.date} />
        <InfoRow label="시간" value={wedding.time} />
        <InfoRow label="장소" value={wedding.venue} />
        <button
          className="pressable luxury-button mt-5 w-full rounded-full border border-wedding-champagne/55 px-5 py-4 text-[14px] font-semibold text-wedding-ink/78 shadow-[0_12px_28px_rgba(80,64,54,0.08)] hover:border-wedding-blush hover:text-wedding-ink"
          type="button"
          onClick={onCalendarDownload}
        >
          캘린더에 일정 추가
        </button>
      </BlurCard>
    </Section>
  );
}

/**
 * D-day 숫자를 표시 문자열로 변환합니다.
 * @param {number} daysUntilWedding 남은 일수입니다.
 * @returns {string} D-day 표시 문자열입니다.
 */
function formatDday(daysUntilWedding) {
  if (daysUntilWedding === 0) {
    return 'D-DAY';
  }

  if (daysUntilWedding < 0) {
    return `D+${Math.abs(daysUntilWedding)}`;
  }

  return `D-${daysUntilWedding}`;
}

/**
 * D-day 상태에 맞는 안내 문구를 반환합니다.
 * @param {number} daysUntilWedding 남은 일수입니다.
 * @returns {string} D-day 안내 문구입니다.
 */
function formatDdayMessage(daysUntilWedding) {
  if (daysUntilWedding === 0) {
    return '오늘, 두 사람의 새로운 시작을 함께합니다.';
  }

  if (daysUntilWedding < 0) {
    return '함께해 주신 마음을 오래 간직하겠습니다.';
  }

  return `두 사람의 결혼식까지 ${daysUntilWedding}일 남았습니다.`;
}
