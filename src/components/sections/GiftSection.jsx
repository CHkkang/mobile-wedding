import { BlurCard } from '../common/BlurCard';
import { Section } from '../common/Section';

/**
 * 축의금 계좌 정보를 표시하는 section입니다.
 * @param {{accounts: Array<{label: string, bank: string, number: string, holder: string, kakaoPayUrl?: string, tossUrl?: string}>, onCopy: (text: string, successMessage: string) => Promise<void>}} props Gift action props입니다.
 * @returns {JSX.Element} Gift account UI를 반환합니다.
 */
export function GiftSection({ accounts, onCopy }) {
  /**
   * 송금 link가 있으면 새 창으로 열고, 없으면 계좌 정보를 복사합니다.
   * @param {{bank: string, number: string, holder: string, label: string}} account 계좌 정보입니다.
   * @param {string | undefined} paymentUrl 송금 서비스 URL입니다.
   * @param {string} paymentLabel 송금 서비스 이름입니다.
   * @returns {void}
   */
  const handlePayment = (account, paymentUrl, paymentLabel) => {
    if (paymentUrl) {
      window.open(paymentUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    onCopy(
      formatAccount(account),
      `${paymentLabel} 링크 준비 전이라 ${account.label} 계좌를 복사했습니다.`,
    );
  };

  return (
    <Section id="gift" eyebrow="With Heart" title="마음 전하실 곳">
      <div className="space-y-3">
        {accounts.map((account) => (
          <BlurCard key={account.label}>
            <div>
              <p className="inline-flex rounded-full bg-wedding-petal/75 px-3 py-1 text-[12px] font-medium text-wedding-ink/65">
                {account.label}
              </p>
              <p className="mt-3 text-[15px] font-semibold">
                {account.bank} {account.number}
              </p>
              <p className="mt-1 text-[13px] text-wedding-ink/60">예금주 {account.holder}</p>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <GiftActionButton
                  label="계좌 복사"
                  onClick={() => onCopy(formatAccount(account), `${account.label} 계좌가 복사되었습니다.`)}
                />
                <GiftActionButton
                  label="카카오페이"
                  onClick={() => handlePayment(account, account.kakaoPayUrl, '카카오페이')}
                />
                <GiftActionButton
                  label="토스"
                  onClick={() => handlePayment(account, account.tossUrl, '토스')}
                />
              </div>
            </div>
          </BlurCard>
        ))}
      </div>
    </Section>
  );
}

/**
 * 계좌 정보를 복사용 문자열로 변환합니다.
 * @param {{bank: string, number: string, holder: string}} account 계좌 정보입니다.
 * @returns {string} 복사할 계좌 문자열입니다.
 */
function formatAccount(account) {
  return `${account.bank} ${account.number} ${account.holder}`;
}

/**
 * 축의금 관련 action button입니다.
 * @param {{label: string, onClick: () => void}} props Button label과 click handler입니다.
 * @returns {JSX.Element} Gift action button UI를 반환합니다.
 */
function GiftActionButton({ label, onClick }) {
  return (
    <button
      className="rounded-full border border-wedding-champagne/40 bg-wedding-white/90 px-2 py-3 text-[12px] font-medium text-wedding-ink/72 shadow-[0_8px_20px_rgba(80,64,54,0.05)] transition hover:border-wedding-blush hover:text-wedding-ink"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
