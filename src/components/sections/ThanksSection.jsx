/**
 * 마지막 감사 인사를 담는 closing section입니다.
 * @param {{wedding: {groom: string, bride: string}}} props Wedding 기본 정보입니다.
 * @returns {JSX.Element} Thanks UI를 반환합니다.
 */
export function ThanksSection({ wedding }) {
  return (
    <section className="snap-section px-6 pb-20 pt-14 text-center">
      <p className="font-display text-3xl tracking-[0.08em]">Thank You</p>
      <p className="mt-6 text-[14px] leading-7 text-wedding-ink/65">
        저희의 시작을 함께해 주셔서 감사합니다.
        <br />
        따뜻한 마음 오래 간직하겠습니다.
      </p>
      <p className="mt-10 font-display text-2xl tracking-[0.12em]">
        {wedding.groom} &amp; {wedding.bride}
      </p>
    </section>
  );
}
