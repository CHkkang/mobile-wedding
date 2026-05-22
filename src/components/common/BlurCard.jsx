/**
 * 반투명 blur card style을 재사용하는 presentational component입니다.
 * @param {{children: React.ReactNode}} props Card content입니다.
 * @returns {JSX.Element} Blur card layout을 반환합니다.
 */
export function BlurCard({ children }) {
  return (
    <div className="polish-card wedding-card rounded-[24px] border border-white/80 p-5 shadow-[0_18px_50px_rgba(80,64,54,0.1),inset_0_0_0_1px_rgba(216,196,166,0.16)] transition-transform duration-300">
      {children}
    </div>
  );
}
