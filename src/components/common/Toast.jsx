/**
 * 하단 toast message를 표시합니다.
 * @param {{message: string}} props Toast message입니다.
 * @returns {JSX.Element | null} Toast UI를 반환합니다.
 */
export function Toast({ message }) {
  if (!message) {
    return null;
  }

  return (
    <div className="fixed bottom-5 left-1/2 z-50 w-[calc(100%-2rem)] max-w-[320px] -translate-x-1/2 rounded-full border border-white/70 bg-white/90 px-5 py-3 text-center text-[13px] text-wedding-ink/75 shadow-[0_10px_28px_rgba(43,43,43,0.12)]">
      {message}
    </div>
  );
}
