import { ScrollCue } from '../common/ScrollCue';

/**
 * 큰 세로사진과 핵심 wedding identity를 보여주는 hero section입니다.
 * @param {{wedding: {groom: string, bride: string, heroDate: string, venue: string, images: {hero: string}}, nextId?: string}} props Wedding 기본 정보입니다.
 * @returns {JSX.Element} Hero UI를 반환합니다.
 */
export function HeroSection({ wedding, nextId }) {
  return (
    <section className="snap-section relative min-h-screen overflow-hidden bg-wedding-ink text-white">
      <img
        className="hero-photo absolute inset-0 h-full w-full object-cover"
        src={wedding.images.hero}
        alt="겨울 감성 웨딩 세로 사진"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/28 via-black/10 to-black/62" />
      <div className="absolute inset-0 bg-wedding-petal/10 mix-blend-screen" />
      <div className="hero-frame" />
      <div className="hero-copy relative z-10 flex min-h-screen flex-col items-center justify-center px-7 text-center">
        <p className="text-[12px] font-semibold tracking-[0.34em] text-white/78">
          THE WEDDING OF
        </p>
        <h1 className="mt-6 whitespace-nowrap text-[clamp(34px,9vw,46px)] font-semibold leading-none">
          {wedding.groom} &amp; {wedding.bride}
        </h1>
        <div className="mx-auto mt-7 h-px w-24 bg-white/62" />
        <p className="mt-7 text-[15px] font-medium leading-7 text-white/88">{wedding.heroDate}</p>
        <p className="mt-2 text-[15px] font-medium leading-7 text-white/88">{wedding.venue}</p>
      </div>
      <div className="absolute bottom-8 left-0 right-0 z-10">
        <ScrollCue targetId={nextId} tone="light" />
      </div>
    </section>
  );
}
