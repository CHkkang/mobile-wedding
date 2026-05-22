/**
 * 지도와 주소 관련 command button입니다.
 * @param {{label: string, onClick: () => void}} props Button label과 click handler입니다.
 * @returns {JSX.Element} Action button UI를 반환합니다.
 */
export function ActionButton({ label, onClick }) {
  return (
    <button
      className="pressable luxury-button rounded-full border border-wedding-champagne/55 px-4 py-3 text-[13px] font-semibold text-wedding-ink/75 shadow-[0_10px_24px_rgba(80,64,54,0.08)] hover:border-wedding-blush hover:text-wedding-ink"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
