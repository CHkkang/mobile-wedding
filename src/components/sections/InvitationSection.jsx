import { Section } from '../common/Section';

/**
 * 초대 문구를 담는 invitation section입니다.
 * @param {{parents: {groom: string, bride: string}}} props 양가 부모님 정보입니다.
 * @returns {JSX.Element} Invitation UI를 반환합니다.
 */
export function InvitationSection({ parents }) {
  return (
    <Section id="invitation" eyebrow="Invitation" title="초대합니다">
      <div className="space-y-5 text-center text-[15px] leading-8 text-wedding-ink/80">
        <p>
          서로의 계절을 따뜻하게 채워 온 두 사람이
          <br />
          이제 하나의 겨울을 함께 맞이하려 합니다.
        </p>
        <p>
          소중한 걸음으로 축복해 주시면
          <br />
          오래도록 깊이 간직하겠습니다.
        </p>
        <p className="pt-3 text-[14px] text-wedding-ink/65">
          {parents.groom}
          <br />
          {parents.bride}
        </p>
      </div>
    </Section>
  );
}
