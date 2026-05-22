/**
 * label/value 형태의 wedding detail row입니다.
 * @param {{label: string, value: string}} props Row props입니다.
 * @returns {JSX.Element} Detail row UI를 반환합니다.
 */
export function InfoRow({ label, value }) {
  return (
    <div className="flex items-center border-b border-wedding-champagne/20 py-4 last:border-b-0">
      <dt className="w-16 shrink-0 text-[12px] font-medium tracking-[0.12em] text-wedding-champagne">
        {label}
      </dt>
      <dd className="text-[15px] leading-6 text-wedding-ink/82">{value}</dd>
    </div>
  );
}
