/**
 * 마지막 감사 인사를 담는 closing section입니다.
 * @param {{wedding: {groom: string, bride: string}, onShare: () => Promise<void>}} props Wedding 기본 정보와 share handler입니다.
 * @returns {JSX.Element} Thanks UI를 반환합니다.
 */
export function ThanksSection({ wedding, onShare }) {
  return (
    <section className="snap-section px-6 pb-20 pt-14 text-center">
      <div className="rounded-[28px] border border-white/75 bg-wedding-white/70 px-5 py-12 shadow-[0_18px_50px_rgba(80,64,54,0.08)]">
        <p className="font-display text-3xl font-medium tracking-[0.04em]">Thank You</p>
        <div className="section-rule mx-auto mt-5 h-px w-24" />
        <p className="mt-6 text-[14px] leading-7 text-wedding-ink/65">
          저희의 시작을 함께해 주셔서 감사합니다.
          <br />
          따뜻한 마음 오래 간직하겠습니다.
        </p>
        <button
          className="luxury-button mt-8 w-full rounded-full border border-wedding-champagne/55 px-5 py-4 text-[14px] font-semibold text-wedding-ink/78 shadow-[0_12px_28px_rgba(80,64,54,0.08)] transition hover:border-wedding-blush hover:text-wedding-ink"
          type="button"
          onClick={onShare}
        >
          청첩장 공유하기
        </button>
        <p className="mt-10 whitespace-nowrap font-display text-[clamp(22px,6.4vw,28px)] font-medium tracking-[0.04em]">
          {wedding.groom} &amp; {wedding.bride}
        </p>
      </div>
    </section>
  );
}
