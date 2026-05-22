import { BlurCard } from '../common/BlurCard';
import { Section } from '../common/Section';

/**
 * 연락처 목록을 전화/문자 action으로 표시하는 section입니다.
 * @param {{contacts: Array<{label: string, name: string, phone: string}>, nextId?: string}} props 연락처 데이터입니다.
 * @returns {JSX.Element} Contact action UI를 반환합니다.
 */
export function ContactSection({ contacts, nextId }) {
  const groupedContacts = [
    {
      title: '신랑측',
      contacts: contacts.filter((contact) => contact.side === 'groom'),
    },
    {
      title: '신부측',
      contacts: contacts.filter((contact) => contact.side === 'bride'),
    },
  ];

  return (
    <Section id="contact" eyebrow="Contact" title="연락하기" nextId={nextId}>
      <div className="space-y-5">
        {groupedContacts.map((group) => (
          <BlurCard key={group.title}>
            <p className="text-center text-[13px] font-semibold tracking-[0.18em] text-wedding-champagne">
              {group.title}
            </p>
            <div className="mt-4 space-y-3">
              {group.contacts.map((contact) => (
                <ContactRow key={contact.label} contact={contact} />
              ))}
            </div>
          </BlurCard>
        ))}
      </div>
    </Section>
  );
}

/**
 * 연락처 한 줄을 전화/문자 action과 함께 표시합니다.
 * @param {{contact: {label: string, name: string, phone: string}}} props 연락처 데이터입니다.
 * @returns {JSX.Element} Contact row UI를 반환합니다.
 */
function ContactRow({ contact }) {
  return (
    <div className="rounded-[18px] border border-wedding-champagne/20 bg-wedding-white/62 p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="inline-flex rounded-full bg-wedding-petal/75 px-3 py-1 text-[12px] font-medium text-wedding-ink/65">
            {contact.label}
          </p>
          <p className="mt-2 text-[16px] font-semibold text-wedding-ink">{contact.name}</p>
          <p className="mt-1 text-[13px] text-wedding-ink/56">{contact.phone}</p>
        </div>
        <div className="grid min-w-[118px] grid-cols-2 gap-2">
          <ContactLink href={`tel:${contact.phone}`} label="전화" />
          <ContactLink href={`sms:${contact.phone}`} label="문자" />
        </div>
      </div>
    </div>
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
