/**
 * 반투명 blur card style을 재사용하는 presentational component입니다.
 * @param {{children: React.ReactNode}} props Card content입니다.
 * @returns {JSX.Element} Blur card layout을 반환합니다.
 */
export function BlurCard({ children }) {
  return (
    <div className="rounded-2xl border border-white/60 bg-white/35 p-5 backdrop-blur-md">
      {children}
    </div>
  );
}
