import { BlurCard } from '../common/BlurCard';
import { InfoRow } from '../common/InfoRow';
import { Section } from '../common/Section';
import { getDaysUntil } from '../../utils/date';

/**
 * 예식 일시와 장소 정보를 제공하는 section입니다.
 * @param {{wedding: {date: string, time: string, venue: string, hall: string, calendar: {startDateTime: string}}, nextId?: string, onCalendarDownload: () => void}} props 예식 정보와 calendar handler입니다.
 * @returns {JSX.Element} Wedding info UI를 반환합니다.
 */
export function WeddingInfoSection({ wedding, nextId, onCalendarDownload }) {
  const daysUntilWedding = getDaysUntil(wedding.calendar.startDateTime);
  const weddingDate = new Date(wedding.calendar.startDateTime);

  return (
    <Section id="info" eyebrow="II" title="Wedding Day" nextId={nextId} compact>
      <BlurCard>
        <div className="grid grid-cols-[1.25fr_1fr] gap-3">
          <WeddingCalendar date={weddingDate} />
          <div className="rounded-[20px] border border-wedding-champagne/30 bg-wedding-white/82 px-3 py-4 text-center shadow-[0_12px_32px_rgba(80,64,54,0.06)]">
            <p className="ui-font text-[10px] font-semibold tracking-[0.2em] text-wedding-champagne">
            WEDDING D-DAY
            </p>
            <p className="mt-4 text-[28px] font-semibold leading-none text-wedding-ink">
              {formatDday(daysUntilWedding)}
            </p>
            <p className="mt-4 text-[12px] leading-5 text-wedding-ink/58">
              {formatDdayMessage(daysUntilWedding)}
            </p>
          </div>
        </div>
        <InfoRow label="날짜" value={wedding.date} />
        <InfoRow label="시간" value={wedding.time} />
        <button
          className="pressable luxury-button mt-4 w-full rounded-full border border-wedding-champagne/55 px-5 py-3.5 text-[14px] font-semibold text-wedding-ink/78 shadow-[0_12px_28px_rgba(80,64,54,0.08)] hover:border-wedding-blush hover:text-wedding-ink"
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
 * 예식 날짜가 표시된 mini calendar UI입니다.
 * @param {{date: Date}} props 예식 날짜입니다.
 * @returns {JSX.Element} Mini calendar UI를 반환합니다.
 */
function WeddingCalendar({ date }) {
  const monthLabel = `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, '0')}`;
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const calendarCells = [
    ...Array.from({ length: firstDay }, (_, index) => ({ key: `empty-${index}`, day: null })),
    ...Array.from({ length: daysInMonth }, (_, index) => ({
      key: `day-${index + 1}`,
      day: index + 1,
    })),
  ];

  return (
    <div className="rounded-[20px] border border-wedding-champagne/25 bg-wedding-petal/55 px-3 py-4 text-center shadow-[inset_0_0_0_1px_rgba(255,255,255,0.48)]">
      <p className="ui-font text-[11px] font-semibold tracking-[0.18em] text-wedding-champagne">
        {monthLabel}
      </p>
      <div className="ui-font mt-3 grid grid-cols-7 gap-0.5 text-[10px] font-semibold text-wedding-ink/42">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((weekday, index) => (
          <span key={`${weekday}-${index}`}>{weekday}</span>
        ))}
      </div>
      <div className="ui-font mt-1.5 grid grid-cols-7 gap-0.5 text-[10px] text-wedding-ink/58">
        {calendarCells.map((cell) => (
          <span
            key={cell.key}
            className={`relative flex aspect-square items-center justify-center rounded-full ${
              cell.day === date.getDate()
                ? 'bg-wedding-champagne text-wedding-white shadow-[0_8px_18px_rgba(80,64,54,0.14)]'
                : ''
            }`}
          >
            {cell.day}
            {cell.day === date.getDate() && (
              <svg
                aria-hidden="true"
                className="absolute -right-1 -top-1 h-4 w-4 text-wedding-ink"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="m5 12 4 4 10-10"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                />
              </svg>
            )}
          </span>
        ))}
      </div>
    </div>
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

  return `결혼식까지 ${daysUntilWedding}일 남았습니다.`;
}
