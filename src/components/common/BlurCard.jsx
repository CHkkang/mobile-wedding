/**
 * 반투명 blur card style을 재사용하는 presentational component입니다.
 * @param {{children: React.ReactNode}} props Card content입니다.
 * @returns {JSX.Element} Blur card layout을 반환합니다.
 */
export function BlurCard({ children }) {
  return (
    <div className="wedding-card rounded-[22px] border border-white/80 p-5 shadow-[0_18px_50px_rgba(80,64,54,0.08)]">
      {children}
    </div>
  );
}
