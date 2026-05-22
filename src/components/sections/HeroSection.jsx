import { ScrollCue } from '../common/ScrollCue';

/**
 * 큰 세로사진과 핵심 wedding identity를 보여주는 hero section입니다.
 * @param {{wedding: {groom: string, bride: string, date: string}}} props Wedding 기본 정보입니다.
 * @returns {JSX.Element} Hero UI를 반환합니다.
 */
export function HeroSection({ wedding }) {
  return (
    <section className="snap-section relative min-h-screen px-5 pb-10 pt-5">
      <div className="relative h-[72vh] min-h-[560px] overflow-hidden rounded-b-[210px] rounded-t-[34px] shadow-[0_22px_58px_rgba(80,64,54,0.16)]">
        <img
          className="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1100&q=88"
          alt="겨울 감성 웨딩 세로 사진"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/45" />
        <div className="absolute inset-0 bg-wedding-petal/10 mix-blend-screen" />
        <div className="absolute left-1/2 top-8 -translate-x-1/2 rounded-full border border-white/45 bg-white/18 px-4 py-2 text-[11px] font-medium tracking-[0.28em] text-white">
          SAVE THE DATE
        </div>
        <div className="absolute bottom-8 left-1/2 w-[90%] -translate-x-1/2 rounded-[24px] border border-white/45 bg-black/22 px-4 py-7 text-center text-white shadow-[0_18px_40px_rgba(0,0,0,0.14)]">
          <p className="whitespace-nowrap font-display text-[clamp(27px,8vw,34px)] font-medium leading-none">
            {wedding.groom} &amp; {wedding.bride}
          </p>
          <div className="mx-auto mt-5 h-px w-20 bg-white/55" />
          <p className="mt-4 text-[13px] font-medium tracking-[0.24em]">{wedding.date}</p>
        </div>
      </div>
      <ScrollCue />
    </section>
  );
}
