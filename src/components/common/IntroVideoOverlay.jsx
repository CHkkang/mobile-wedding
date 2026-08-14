import { useEffect } from 'react';
import { createPortal } from 'react-dom';

/**
 * YouTube video id를 autoplay 가능한 embed URL로 변환합니다.
 * @param {string} videoId YouTube video id입니다.
 * @returns {string} YouTube embed URL입니다.
 */
function createYouTubeEmbedUrl(videoId) {
  const params = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    playsinline: '1',
    controls: '0',
    disablekb: '1',
    fs: '0',
    loop: '1',
    modestbranding: '1',
    playlist: videoId,
    rel: '0',
  });

  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

/**
 * 첫 진입 시 짧은 cinematic intro video를 보여준 뒤 본문을 reveal하는 overlay입니다.
 * @param {{videoId?: string, videoSrc?: string, greeting: string, durationMs: number, onFinish: () => void}} props Intro 설정과 종료 handler입니다.
 * @returns {JSX.Element | null} Intro overlay UI를 반환합니다.
 */
export function IntroVideoOverlay({ videoId, videoSrc, greeting, durationMs, onFinish }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const timerId = window.setTimeout(onFinish, durationMs);

    return () => {
      document.body.style.overflow = '';
      window.clearTimeout(timerId);
    };
  }, [durationMs, onFinish]);

  if (!videoId && !videoSrc) {
    return null;
  }

  return createPortal(
    <div className="intro-overlay fixed inset-0 z-[200] overflow-hidden bg-black text-white">
      {videoSrc ? (
        <video
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : (
        <iframe
          className="pointer-events-none absolute left-1/2 top-1/2 h-[100dvh] w-[177.78dvh] min-w-[100dvw] -translate-x-1/2 -translate-y-1/2"
          src={createYouTubeEmbedUrl(videoId)}
          title="Wedding intro video"
          allow="autoplay; encrypted-media; picture-in-picture"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/65" />
      <div className="intro-copy absolute inset-x-0 top-1/2 mx-auto w-full max-w-[480px] -translate-y-1/2 px-7 text-center">
        <p className="ui-font text-[12px] font-medium tracking-[0.34em] text-white/70">
          CHANHYUK &amp; MINJI
        </p>
        <h1 className="mt-5 whitespace-nowrap text-[clamp(38px,12vw,58px)] font-semibold leading-none tracking-[-0.01em]">
          {greeting}
        </h1>
        <div className="mx-auto mt-7 h-px w-24 bg-white/55" />
      </div>
      <button
        className="pressable absolute bottom-8 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/45 bg-white/12 px-5 py-3 text-[13px] font-medium text-white"
        type="button"
        onClick={onFinish}
      >
        바로 보기
      </button>
    </div>,
    document.body,
  );
}
