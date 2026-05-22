import { ScrollCue } from '../common/ScrollCue';

/**
 * 큰 세로사진과 핵심 wedding identity를 보여주는 hero section입니다.
 * @param {{wedding: {groom: string, bride: string, date: string}}} props Wedding 기본 정보입니다.
 * @returns {JSX.Element} Hero UI를 반환합니다.
 */
export function HeroSection({ wedding }) {
  return (
    <section className="snap-section relative min-h-screen px-5 pb-10 pt-5">
      <div className="relative h-[72vh] min-h-[560px] overflow-hidden rounded-b-[220px] rounded-t-[28px]">
        <img
          className="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1100&q=88"
          alt="겨울 감성 웨딩 세로 사진"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/35" />
        <div className="absolute inset-0 bg-wedding-frost/15 mix-blend-screen" />
        <div className="absolute bottom-8 left-1/2 w-[90%] -translate-x-1/2 rounded-2xl border border-white/40 bg-black/18 px-4 py-7 text-center text-white shadow-[0_18px_40px_rgba(0,0,0,0.14)]">
          <p className="whitespace-nowrap font-display text-[clamp(27px,8vw,34px)] leading-none">
            {wedding.groom} &amp; {wedding.bride}
          </p>
          <p className="mt-4 text-[13px] tracking-[0.26em]">{wedding.date}</p>
        </div>
      </div>
      <ScrollCue />
    </section>
  );
}
