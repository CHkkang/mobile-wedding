/**
 * label/value 형태의 wedding detail row입니다.
 * @param {{label: string, value: string}} props Row props입니다.
 * @returns {JSX.Element} Detail row UI를 반환합니다.
 */
export function InfoRow({ label, value }) {
  return (
    <div className="flex border-b border-wedding-accent/15 py-4 last:border-b-0">
      <dt className="w-16 shrink-0 text-[13px] text-wedding-accent">{label}</dt>
      <dd className="text-[15px] leading-6 text-wedding-ink/80">{value}</dd>
    </div>
  );
}
