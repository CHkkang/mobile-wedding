import { ScrollCue } from '../common/ScrollCue';

/**
 * 큰 세로사진과 핵심 wedding identity를 보여주는 hero section입니다.
 * @param {{wedding: {groom: string, bride: string, heroDate: string, venue: string, hall: string, images: {hero: string}}, nextId?: string}} props Wedding 기본 정보입니다.
 * @returns {JSX.Element} Hero UI를 반환합니다.
 */
export function HeroSection({ wedding, nextId }) {
  return (
    <section
      id="top"
      className="snap-section relative min-h-[100svh] overflow-hidden bg-wedding-ink text-white"
    >
      <img
        className="hero-photo absolute inset-0 h-full w-full object-cover"
        src={wedding.images.hero}
        alt="겨울 감성 웨딩 세로 사진"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/22 to-black/72" />
      <div className="absolute inset-0 bg-black/18" />
      <div className="absolute inset-0 bg-wedding-petal/10 mix-blend-screen" />
      <div className="hero-veil" aria-hidden="true">
        <span className="hero-veil-panel hero-veil-left" />
        <span className="hero-veil-panel hero-veil-right" />
        <span className="hero-veil-glow" />
      </div>
      <div className="hero-frame" />
      <div className="hero-copy relative z-10 flex min-h-[100svh] flex-col px-7 pb-24 pt-12 text-center">
        <p className="ui-font text-[11px] font-semibold tracking-[0.34em] text-white/76">
          THE WEDDING OF
        </p>
        <div className="pointer-events-none relative mt-12 min-h-[44svh] flex-1" aria-hidden="true">
          <p className="hero-script hero-script-top">We are getting</p>
          <p className="hero-script hero-script-bottom">married!</p>
        </div>
        <h1 className="mt-8 whitespace-nowrap text-[clamp(29px,7.8vw,40px)] font-semibold leading-none text-white">
          {wedding.groom}
          <span className="mx-3 text-white/78">&amp;</span>
          {wedding.bride}
        </h1>
        <div className="mx-auto mt-5 h-px w-28 bg-white/58" />
        <p className="mt-5 text-[14px] font-medium leading-7 text-white/86">
          {wedding.heroDate}
        </p>
        <p className="mt-1 text-[14px] font-semibold leading-7 text-white/86">
          {wedding.venue} · {wedding.hall}
        </p>
      </div>
      <div className="absolute bottom-5 left-0 right-0 z-10">
        <ScrollCue targetId={nextId} tone="light" label="초대장 열어보기" />
      </div>
    </section>
  );
}
