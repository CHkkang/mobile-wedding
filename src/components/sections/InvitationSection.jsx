import { Section } from '../common/Section';

/**
 * 초대 문구를 담는 invitation section입니다.
 * @param {{parents: {groom: string, bride: string}, nextId?: string}} props 양가 부모님 정보입니다.
 * @returns {JSX.Element} Invitation UI를 반환합니다.
 */
export function InvitationSection({ parents, nextId }) {
  return (
    <Section id="invitation" eyebrow="I" title="Invitation" nextId={nextId}>
      <div className="relative text-center">
        <div className="mx-auto mb-7 flex h-12 w-12 items-center justify-center rounded-full border border-wedding-champagne/45 bg-wedding-white/70 text-[22px] text-wedding-champagne">
          “
        </div>
        <div className="space-y-5 text-[15px] leading-8 text-wedding-ink/78">
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
          <ParentNames parents={parents} />
        </div>
      </div>
    </Section>
  );
}

/**
 * 부모님 문구를 이름/관계가 균형 있게 보이도록 분리해 표시합니다.
 * @param {{parents: {groom: string, bride: string}}} props 양가 부모님 문구입니다.
 * @returns {JSX.Element} 부모님 소개 UI를 반환합니다.
 */
function ParentNames({ parents }) {
  const rows = [formatParentLine(parents.groom), formatParentLine(parents.bride)];

  return (
    <div className="mx-auto mt-8 max-w-[320px] space-y-2 rounded-[22px] border border-wedding-champagne/20 bg-wedding-white/60 px-4 py-4 text-center">
      {rows.map((row) => (
        <div key={`${row.parents}-${row.child}`} className="text-[14px] leading-7 text-wedding-ink/62">
          <span>{row.parents}</span>
          <span className="mx-2 text-wedding-champagne/70">의</span>
          <span className="whitespace-nowrap text-[16px] font-semibold text-wedding-ink">
            <span className="ui-font mr-1.5 text-[12px] font-medium text-wedding-champagne">
              {row.relation}
            </span>
            <span className="border-b border-wedding-champagne/45 pb-0.5">{row.child}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

/**
 * "부모의 관계 이름" 형태의 문자열을 표시용 조각으로 분리합니다.
 * @param {string} text 부모님 소개 문자열입니다.
 * @returns {{parents: string, relation: string, child: string}} 표시용 부모/관계/이름입니다.
 */
function formatParentLine(text) {
  const [parents, childText = ''] = text.split('의 ');
  const [relation = '', child = ''] = childText.split(' ');

  return { parents, relation, child };
}
