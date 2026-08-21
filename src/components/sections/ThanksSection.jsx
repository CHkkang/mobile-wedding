import { ScrollCue } from '../common/ScrollCue';

/**
 * 마지막 감사 인사를 담는 closing section입니다.
 * @param {{wedding: {groom: string, bride: string}, onShare: () => Promise<void>}} props Wedding 기본 정보와 share handler입니다.
 * @returns {JSX.Element} Thanks UI를 반환합니다.
 */
export function ThanksSection({ wedding, onShare }) {
  return (
    <section id="thanks" className="snap-section grid grid-rows-[104px_minmax(0,1fr)] px-6 text-center">
      <div className="flex items-end justify-center pb-5">
        <ScrollCue targetId="contact" direction="up" />
      </div>
      <div className="relative self-center overflow-hidden rounded-[28px] border border-white/75 bg-wedding-white/72 px-5 pb-7 pt-6 shadow-[0_18px_46px_rgba(80,64,54,0.09),inset_0_0_0_1px_rgba(216,196,166,0.16)]">
        <div className="absolute -left-8 top-8 h-24 w-24 rounded-full bg-wedding-petal/55 blur-2xl" />
        <div className="absolute -right-10 bottom-16 h-28 w-28 rounded-full bg-wedding-sage/25 blur-2xl" />
        <div className="relative">
          <WeddingCoupleLineArt />
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
function WeddingCoupleLineArt() {
  return (
    <div className="mx-auto w-full max-w-[242px]" aria-hidden="true">
      <svg className="h-auto w-full" viewBox="0 0 260 176" fill="none">
        <path
          d="M52 151c38 11 120 12 156 0"
          stroke="rgb(var(--color-wedding-champagne))"
          strokeLinecap="round"
          strokeWidth="2.6"
        />
        <path
          d="M83 81c-17 18-25 40-29 68h63c-4-28-14-51-34-68Z"
          fill="rgb(var(--color-wedding-white) / 0.9)"
          stroke="rgb(var(--color-wedding-champagne))"
          strokeLinejoin="round"
          strokeWidth="2.4"
        />
        <path
          d="M176 81c17 18 25 40 29 68h-62c4-28 13-51 33-68Z"
          fill="rgb(var(--color-wedding-ink) / 0.9)"
          stroke="rgb(var(--color-wedding-ink) / 0.76)"
          strokeLinejoin="round"
          strokeWidth="2.4"
        />
        <path
          d="M64 70c7-19 33-24 49-5 5 6 7 13 6 20M157 68c12-17 36-13 44 5 3 7 3 15-1 22"
          stroke="rgb(var(--color-wedding-ink) / 0.72)"
          strokeLinecap="round"
          strokeWidth="2.5"
        />
        <circle cx="84" cy="61" r="18" fill="rgb(var(--color-wedding-petal) / 0.86)" stroke="rgb(var(--color-wedding-ink) / 0.66)" strokeWidth="2.4" />
        <circle cx="176" cy="61" r="18" fill="rgb(var(--color-wedding-petal) / 0.86)" stroke="rgb(var(--color-wedding-ink) / 0.66)" strokeWidth="2.4" />
        <path
          d="M78 62h.1M90 62h.1M170 62h.1M182 62h.1"
          stroke="rgb(var(--color-wedding-ink) / 0.72)"
          strokeLinecap="round"
          strokeWidth="4"
        />
        <path
          d="M78 70c4 3 8 3 12 0M170 70c4 3 8 3 12 0"
          stroke="rgb(var(--color-wedding-ink) / 0.62)"
          strokeLinecap="round"
          strokeWidth="2.2"
        />
        <path
          d="M106 100c14 12 35 12 49 0"
          stroke="rgb(var(--color-wedding-ink) / 0.58)"
          strokeLinecap="round"
          strokeWidth="2.4"
        />
        <path
          d="M66 41c-6-6-13-8-19-3 2 8 8 12 19 11M92 38c7-8 17-8 24 1"
          stroke="rgb(var(--color-wedding-champagne))"
          strokeLinecap="round"
          strokeWidth="2.4"
        />
        <path
          d="M113 94l10-8 10 8-10 8-10-8ZM143 94l10-8 10 8-10 8-10-8Z"
          fill="rgb(var(--color-wedding-white) / 0.9)"
          stroke="rgb(var(--color-wedding-champagne))"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M128 84c-2-5-8-8-13-4-6 5-2 14 13 22 15-8 19-17 13-22-5-4-11-1-13 4Z"
          fill="rgb(var(--color-wedding-blush) / 0.56)"
          stroke="rgb(var(--color-wedding-blush))"
          strokeWidth="2"
        />
        <path
          d="M34 103c8-4 15-2 20 5M208 108c5-8 12-10 19-5M126 33c4-8 12-8 16 0"
          stroke="rgb(var(--color-wedding-blush))"
          strokeLinecap="round"
          strokeWidth="2.6"
        />
      </svg>
    </div>
  );
}
