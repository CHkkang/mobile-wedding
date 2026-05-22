import { useEffect, useRef, useState } from 'react';

/**
 * 배경 음악 재생 상태를 제어하는 fixed toggle button component입니다.
 * @param {{src: string, title?: string}} props BGM audio source와 표시용 제목입니다.
 * @returns {JSX.Element | null} BGM toggle UI를 반환합니다.
 */
export function BgmToggle({ src, title = 'Wedding BGM' }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsPlaying(true);
    setIsReady(false);
  }, [src]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!src || !audio || !isPlaying) {
      return undefined;
    }

    let isMounted = true;

    /**
     * Autoplay가 차단된 경우 첫 사용자 gesture에서 다시 BGM 재생을 시도합니다.
     * @returns {Promise<void>} Audio 재생 시도가 끝난 뒤 resolve됩니다.
     */
    const playAudio = async () => {
      try {
        await audio.play();

        if (isMounted) {
          setIsPlaying(true);
        }
      } catch {
        if (isMounted) {
          setIsPlaying(true);
        }
      }
    };

    /**
     * 첫 interaction 직후 BGM을 재생하고 등록된 event listener를 정리합니다.
     * @returns {void}
     */
    const handleFirstInteraction = () => {
      playAudio();
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    playAudio();
    window.addEventListener('pointerdown', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });

    return () => {
      isMounted = false;
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [isPlaying, src]);

  if (!src) {
    return null;
  }

  /**
   * Browser autoplay policy를 고려해 사용자 gesture 이후 BGM을 재생하거나 정지합니다.
   * @returns {Promise<void>} Audio play/pause 처리가 끝난 뒤 resolve됩니다.
   */
  const handleToggle = async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <div className="fixed right-4 top-4 z-50">
      <audio
        ref={audioRef}
        loop
        preload="metadata"
        src={src}
        onCanPlay={() => setIsReady(true)}
        onEnded={() => setIsPlaying(false)}
        onError={() => {
          setIsReady(false);
          setIsPlaying(false);
        }}
        title={title}
      />
      <button
        className="pressable flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/90 text-wedding-ink shadow-[0_10px_30px_rgba(43,43,43,0.14)] hover:bg-white focus:outline-none focus:ring-2 focus:ring-wedding-mocha/30"
        type="button"
        aria-label={isPlaying ? '배경 음악 정지' : '배경 음악 재생'}
        aria-pressed={isPlaying}
        disabled={!isReady}
        onClick={handleToggle}
      >
        {isPlaying ? (
          <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18V5l10-2v13"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
            />
            <path
              d="M9 18.2c0 1.1-1.2 2-2.7 2s-2.7-.9-2.7-2 1.2-2 2.7-2 2.7.9 2.7 2ZM19 16.2c0 1.1-1.2 2-2.7 2s-2.7-.9-2.7-2 1.2-2 2.7-2 2.7.9 2.7 2Z"
              fill="currentColor"
            />
          </svg>
        ) : (
          <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18V5l10-2v13"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
            />
            <path
              d="M9 18.2c0 1.1-1.2 2-2.7 2s-2.7-.9-2.7-2 1.2-2 2.7-2 2.7.9 2.7 2ZM19 16.2c0 1.1-1.2 2-2.7 2s-2.7-.9-2.7-2 1.2-2 2.7-2 2.7.9 2.7 2Z"
              fill="currentColor"
            />
            <path d="M4 4l16 16" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
          </svg>
        )}
      </button>
    </div>
  );
}
