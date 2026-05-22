/**
 * 반투명 blur card style을 재사용하는 presentational component입니다.
 * @param {{children: React.ReactNode}} props Card content입니다.
 * @returns {JSX.Element} Blur card layout을 반환합니다.
 */
export function BlurCard({ children }) {
  return (
    <div className="rounded-2xl border border-white/70 bg-white/70 p-5 shadow-[0_12px_34px_rgba(43,43,43,0.05)]">
      {children}
    </div>
  );
}
