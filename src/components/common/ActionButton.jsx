/**
 * 지도와 주소 관련 command button입니다.
 * @param {{label: string, onClick: () => void}} props Button label과 click handler입니다.
 * @returns {JSX.Element} Action button UI를 반환합니다.
 */
export function ActionButton({ label, onClick }) {
  return (
    <button
      className="rounded-full border border-wedding-accent/35 bg-wedding-white/80 px-4 py-3 text-[13px] text-wedding-ink/75 shadow-[0_8px_20px_rgba(43,43,43,0.04)]"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
