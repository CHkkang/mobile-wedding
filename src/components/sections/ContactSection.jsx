import { ActionButton } from '../common/ActionButton';
import { BlurCard } from '../common/BlurCard';
import { Section } from '../common/Section';

/**
 * 연락처 목록을 전화/문자 action으로 표시하는 section입니다.
 * @param {{contacts: Array<{label: string, name: string, phone: string}>, nextId?: string}} props 연락처 데이터입니다.
 * @returns {JSX.Element} Contact action UI를 반환합니다.
 */
export function ContactSection({ contacts, nextId }) {
  return (
    <Section id="contact" eyebrow="Contact" title="연락하기" nextId={nextId}>
      <div className="space-y-3">
        {contacts.map((contact) => (
          <BlurCard key={contact.label}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="inline-flex rounded-full bg-wedding-petal/75 px-3 py-1 text-[12px] font-medium text-wedding-ink/65">
                  {contact.label}
                </p>
                <p className="mt-3 text-[16px] font-semibold text-wedding-ink">{contact.name}</p>
              </div>
              <div className="grid min-w-[132px] grid-cols-2 gap-2">
                <ContactLink href={`tel:${contact.phone}`} label="전화" />
                <ContactLink href={`sms:${contact.phone}`} label="문자" />
              </div>
            </div>
          </BlurCard>
        ))}
      </div>
    </Section>
  );
}

/**
 * 전화 또는 문자 href로 이동하는 연락 action link입니다.
 * @param {{href: string, label: string}} props Link href와 label입니다.
 * @returns {JSX.Element} Contact action link UI를 반환합니다.
 */
function ContactLink({ href, label }) {
  return (
    <a
      className="pressable rounded-full border border-wedding-champagne/40 bg-wedding-white/90 px-3 py-3 text-center text-[12px] font-medium text-wedding-ink/72 shadow-[0_8px_20px_rgba(80,64,54,0.05)]"
      href={href}
    >
      {label}
    </a>
  );
}
