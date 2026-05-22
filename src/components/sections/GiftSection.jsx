import { useState } from 'react';
import { BlurCard } from '../common/BlurCard';
import { ModalShell } from '../common/ModalShell';
import { Section } from '../common/Section';

/**
 * 축의금 계좌 정보를 표시하는 section입니다.
 * @param {{accounts: Array<{label: string, bank: string, number: string, holder: string, kakaoPayUrl?: string, tossUrl?: string}>, onCopy: (text: string, successMessage: string) => Promise<void>}} props Gift action props입니다.
 * @returns {JSX.Element} Gift account UI를 반환합니다.
 */
export function GiftSection({ accounts, onCopy }) {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const groupedAccounts = [
    {
      title: '신랑측',
      buttonLabel: '신랑측 계좌번호 보기',
      accounts: accounts.filter((account) => account.side === 'groom'),
    },
    {
      title: '신부측',
      buttonLabel: '신부측 계좌번호 보기',
      accounts: accounts.filter((account) => account.side === 'bride'),
    },
  ];

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
      <BlurCard>
        <div className="py-3 text-center">
          <p className="text-[15px] leading-8 text-wedding-ink/72">
            멀리서도 축하의 마음을
            <br />
            전하고 싶으신 분들을 위해 안내드립니다.
          </p>
          <p className="mt-5 text-[15px] leading-8 text-wedding-ink/72">
            소중한 축하를 보내주셔서
            <br />
            마음 깊이 감사드립니다.
          </p>
          <div className="mt-7 space-y-3">
            {groupedAccounts.map((group) => (
              <button
                key={group.title}
                className="luxury-button w-full rounded-full border border-wedding-champagne/55 px-5 py-4 text-[14px] font-semibold text-wedding-ink/78 shadow-[0_12px_28px_rgba(80,64,54,0.08)] transition hover:border-wedding-blush hover:text-wedding-ink"
                type="button"
                onClick={() => setSelectedGroup(group)}
              >
                {group.buttonLabel}
              </button>
            ))}
          </div>
        </div>
      </BlurCard>
      {selectedGroup && (
        <GiftAccountModal
          group={selectedGroup}
          onClose={() => setSelectedGroup(null)}
          onCopy={onCopy}
          onPayment={handlePayment}
        />
      )}
    </Section>
  );
}

/**
 * 선택한 측의 축의금 계좌를 화면 위에 표시하는 modal component입니다.
 * @param {{group: {title: string, accounts: Array<{label: string, bank: string, number: string, holder: string, kakaoPayUrl?: string, tossUrl?: string}>}, onClose: () => void, onCopy: (text: string, successMessage: string) => Promise<void>, onPayment: (account: {label: string, bank: string, number: string, holder: string, kakaoPayUrl?: string, tossUrl?: string}, paymentUrl: string | undefined, paymentLabel: string) => void}} props 계좌 modal props입니다.
 * @returns {JSX.Element} 선택한 그룹 계좌 modal UI를 반환합니다.
 */
function GiftAccountModal({ group, onClose, onCopy, onPayment }) {
  return (
    <ModalShell
      eyebrow="With Heart"
      title={`${group.title} 계좌번호`}
      ariaLabel={`${group.title} 계좌번호 보기`}
      onClose={onClose}
    >
      <div className="space-y-4">
          {group.accounts.map((account) => (
            <article
              key={account.label}
              className="rounded-[22px] border border-wedding-champagne/25 bg-wedding-white/82 p-5 shadow-[0_10px_28px_rgba(80,64,54,0.05)]"
            >
              <p className="inline-flex rounded-full bg-wedding-petal/75 px-3 py-1 text-[12px] font-medium text-wedding-ink/65">
                {account.label}
              </p>
              <p className="mt-4 text-[13px] font-medium text-wedding-ink/62">예금주</p>
              <p className="mt-1 text-[18px] font-semibold text-wedding-ink">{account.holder}</p>
              <div className="mt-5 border-t border-wedding-champagne/20 pt-5">
                <p className="text-[13px] font-medium text-wedding-ink/62">계좌</p>
                <p className="mt-1 text-[17px] font-semibold leading-7 text-wedding-ink">
                  {account.bank} {account.number}
                </p>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2">
                <GiftActionButton
                  label="복사"
                  onClick={() =>
                    onCopy(formatAccount(account), `${account.label} 계좌가 복사되었습니다.`)
                  }
                />
                <GiftActionButton
                  label="카카오페이"
                  onClick={() => onPayment(account, account.kakaoPayUrl, '카카오페이')}
                />
                <GiftActionButton
                  label="토스"
                  onClick={() => onPayment(account, account.tossUrl, '토스')}
                />
              </div>
            </article>
          ))}
      </div>
    </ModalShell>
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
