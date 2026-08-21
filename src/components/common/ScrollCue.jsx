/**
 * 다음 section으로 이어지는 visual cue입니다.
 * @param {{targetId?: string, tone?: 'light' | 'dark', label?: string}} props Scroll target id와 색상 tone, CTA label입니다.
 * @returns {JSX.Element | null} 아래 방향 indicator button을 반환합니다.
 */
export function ScrollCue({ targetId, tone = 'dark', label }) {
  if (!targetId) {
    return null;
  }

  /**
   * target section으로 부드럽게 이동합니다.
   * @returns {void}
   */
  const handleScroll = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toneClass =
    tone === 'light'
      ? 'border-white/55 bg-white/18 text-white shadow-[0_14px_34px_rgba(0,0,0,0.18)]'
      : 'border-wedding-champagne/45 bg-wedding-white/88 text-wedding-ink/70 shadow-[0_12px_28px_rgba(80,64,54,0.1)]';

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {label && (
        <p className={`ui-font text-[12px] font-semibold tracking-[0.18em] ${
          tone === 'light' ? 'text-white/82' : 'text-wedding-ink/52'
        }`}>
          {label}
        </p>
      )}
      <button
        className={`pressable scroll-cue-button flex h-11 w-11 items-center justify-center rounded-full border ${toneClass}`}
        type="button"
        aria-label="다음 섹션으로 이동"
        onClick={handleScroll}
      >
        <span aria-hidden="true" className="scroll-cue-arrow" />
      </button>
    </div>
  );
}
