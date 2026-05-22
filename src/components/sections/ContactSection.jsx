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
      <div className="grid grid-cols-2 gap-3">
        {groupedContacts.map((group) => (
          <div
            key={group.title}
            className="polish-card wedding-card rounded-[24px] border border-white/80 p-3 shadow-[0_18px_50px_rgba(80,64,54,0.1),inset_0_0_0_1px_rgba(216,196,166,0.16)]"
          >
            <p className="text-center text-[13px] font-semibold tracking-[0.18em] text-wedding-champagne">
              {group.title}
            </p>
            <div className="mt-4 space-y-2">
              {group.contacts.map((contact) => (
                <ContactRow key={contact.label} contact={contact} />
              ))}
            </div>
          </div>
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
    <div className="rounded-[18px] border border-wedding-champagne/20 bg-wedding-white/62 p-3 text-center">
      <p className="mx-auto inline-flex rounded-full bg-wedding-petal/75 px-2.5 py-1 text-[11px] font-medium text-wedding-ink/65">
        {contact.label.replace('신랑 ', '').replace('신부 ', '')}
      </p>
      <p className="mt-2 text-[15px] font-semibold text-wedding-ink">{contact.name}</p>
      <div className="mt-3 flex justify-center gap-2">
        <ContactLink href={`tel:${contact.phone}`} label={`${contact.label}에게 전화하기`} icon="phone" />
        <ContactLink href={`sms:${contact.phone}`} label={`${contact.label}에게 문자하기`} icon="message" />
      </div>
    </div>
  );
}

/**
 * 전화 또는 문자 href로 이동하는 연락 action link입니다.
 * @param {{href: string, label: string, icon: 'phone' | 'message'}} props Link href와 label, icon type입니다.
 * @returns {JSX.Element} Contact action link UI를 반환합니다.
 */
function ContactLink({ href, label, icon }) {
  return (
    <a
      className="pressable flex h-10 w-10 items-center justify-center rounded-full border border-wedding-champagne/40 bg-wedding-white/90 text-wedding-ink/72 shadow-[0_8px_20px_rgba(80,64,54,0.05)]"
      href={href}
      aria-label={label}
    >
      {icon === 'phone' ? <PhoneIcon /> : <MessageIcon />}
    </a>
  );
}

/**
 * 전화 action icon입니다.
 * @returns {JSX.Element} Phone icon SVG를 반환합니다.
 */
function PhoneIcon() {
  return (
    <svg aria-hidden="true" className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none">
      <path
        d="M8.2 5.4 9.5 8c.3.6.2 1.2-.3 1.7l-.8.8c.9 1.8 2.3 3.2 4.1 4.1l.8-.8c.5-.5 1.1-.6 1.7-.3l2.6 1.3c.7.3 1.1 1.1.9 1.8l-.4 1.8c-.2.8-.9 1.3-1.7 1.3C9.8 19.7 4.3 14.2 4.3 7.6c0-.8.5-1.5 1.3-1.7l1.8-.4c.7-.2 1.5.2 1.8.9Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

/**
 * 문자 action icon입니다.
 * @returns {JSX.Element} Message icon SVG를 반환합니다.
 */
function MessageIcon() {
  return (
    <svg aria-hidden="true" className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 6.8c0-1 .8-1.8 1.8-1.8h10.4c1 0 1.8.8 1.8 1.8v7.4c0 1-.8 1.8-1.8 1.8H9.4L5 19V6.8Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path
        d="M8 9h8M8 12h5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}
