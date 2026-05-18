import { BlurCard } from '../common/BlurCard';
import { InfoRow } from '../common/InfoRow';
import { Section } from '../common/Section';

/**
 * 예식 일시와 장소 정보를 제공하는 section입니다.
 * @param {{wedding: {date: string, time: string, venue: string}}} props 예식 정보입니다.
 * @returns {JSX.Element} Wedding info UI를 반환합니다.
 */
export function WeddingInfoSection({ wedding }) {
  return (
    <Section id="info" eyebrow="Wedding Day" title="예식정보">
      <BlurCard>
        <InfoRow label="날짜" value={wedding.date} />
        <InfoRow label="시간" value={wedding.time} />
        <InfoRow label="장소" value={wedding.venue} />
      </BlurCard>
    </Section>
  );
}
