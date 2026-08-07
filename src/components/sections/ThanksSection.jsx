/**
 * 마지막 감사 인사를 담는 closing section입니다.
 * @param {{wedding: {groom: string, bride: string}, onShare: () => Promise<void>}} props Wedding 기본 정보와 share handler입니다.
 * @returns {JSX.Element} Thanks UI를 반환합니다.
 */
export function ThanksSection({ wedding, onShare }) {
  return (
    <section id="thanks" className="snap-section flex flex-col justify-center px-6 py-8 text-center">
      <div className="relative overflow-hidden rounded-[28px] border border-white/75 bg-wedding-white/72 px-5 pb-7 pt-6 shadow-[0_18px_46px_rgba(80,64,54,0.09),inset_0_0_0_1px_rgba(216,196,166,0.16)]">
        <div className="absolute -left-8 top-8 h-24 w-24 rounded-full bg-wedding-petal/55 blur-2xl" />
        <div className="absolute -right-10 bottom-16 h-28 w-28 rounded-full bg-wedding-sage/25 blur-2xl" />
        <div className="relative">
          <WeddingCoupleDoodle />
          <p className="mt-3 font-display text-[27px] font-medium tracking-[0.04em]">Thank You</p>
          <div className="section-rule mx-auto mt-3 h-px w-20" />
        </div>
        <p className="relative mt-4 text-[14px] leading-7 text-wedding-ink/65">
          저희의 시작을 함께해 주셔서 감사합니다.
          <br />
          따뜻한 마음 오래 간직하겠습니다.
        </p>
        <p className="relative mt-5 whitespace-nowrap font-display text-[clamp(22px,6.4vw,28px)] font-medium tracking-[0.04em]">
          {wedding.groom} &amp; {wedding.bride}
        </p>
        <button
          className="pressable luxury-button relative mt-6 w-full rounded-full border border-wedding-champagne/55 px-5 py-3.5 text-[14px] font-semibold text-wedding-ink/78 shadow-[0_12px_28px_rgba(80,64,54,0.08)] hover:border-wedding-blush hover:text-wedding-ink"
          type="button"
          onClick={onShare}
        >
          청첩장 공유하기
        </button>
      </div>
    </section>
  );
}

/**
 * 마지막 감사 화면에 들어가는 손그림 느낌의 웨딩부부 illustration입니다.
 * @returns {JSX.Element} Wedding couple doodle SVG를 반환합니다.
 */
function WeddingCoupleDoodle() {
  return (
    <div className="mx-auto w-full max-w-[250px]" aria-hidden="true">
      <svg className="h-auto w-full" viewBox="0 0 260 176" fill="none">
        <path
          d="M60 145c34 15 104 16 140 0"
          stroke="rgb(var(--color-wedding-champagne))"
          strokeLinecap="round"
          strokeWidth="5"
        />
        <path
          d="M78 80c-16 18-24 43-29 65h58c-4-28-11-50-29-65Z"
          fill="rgb(var(--color-wedding-white))"
          stroke="rgb(var(--color-wedding-ink))"
          strokeLinejoin="round"
          strokeWidth="3.4"
        />
        <path
          d="M178 80c15 18 23 43 28 65h-57c4-28 11-50 29-65Z"
          fill="rgb(var(--color-wedding-ink))"
          stroke="rgb(var(--color-wedding-ink))"
          strokeLinejoin="round"
          strokeWidth="3.4"
        />
        <circle cx="78" cy="60" r="20" fill="rgb(var(--color-wedding-petal))" stroke="rgb(var(--color-wedding-ink))" strokeWidth="3.4" />
        <circle cx="178" cy="60" r="20" fill="rgb(var(--color-wedding-petal))" stroke="rgb(var(--color-wedding-ink))" strokeWidth="3.4" />
        <path
          d="M62 55c5-18 28-18 34-1M164 52c8-13 25-12 32 1"
          stroke="rgb(var(--color-wedding-ink))"
          strokeLinecap="round"
          strokeWidth="4"
        />
        <path
          d="M72 62h.1M84 62h.1M172 62h.1M184 62h.1"
          stroke="rgb(var(--color-wedding-ink))"
          strokeLinecap="round"
          strokeWidth="5"
        />
        <path
          d="M72 70c4 4 9 4 13 0M172 70c4 4 9 4 13 0"
          stroke="rgb(var(--color-wedding-ink))"
          strokeLinecap="round"
          strokeWidth="2.8"
        />
        <path
          d="M101 100c16 15 39 15 55 0"
          stroke="rgb(var(--color-wedding-ink))"
          strokeLinecap="round"
          strokeWidth="3.2"
        />
        <path
          d="M68 36c-7-5-13-6-18-1 2 8 8 12 18 11"
          fill="rgb(var(--color-wedding-white))"
          stroke="rgb(var(--color-wedding-ink))"
          strokeLinejoin="round"
          strokeWidth="2.8"
        />
        <path
          d="M101 94l11-9 11 9-11 9-11-9ZM146 94l11-9 11 9-11 9-11-9Z"
          fill="rgb(var(--color-wedding-champagne))"
          stroke="rgb(var(--color-wedding-ink))"
          strokeLinejoin="round"
          strokeWidth="2.6"
        />
        <path
          d="M121 35c5-10 14-10 19 0M32 98c8-3 14-1 18 5M210 103c5-7 11-9 18-5"
          stroke="rgb(var(--color-wedding-blush))"
          strokeLinecap="round"
          strokeWidth="4"
        />
      </svg>
    </div>
  );
}
