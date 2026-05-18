/**
 * 다음 section으로 이어지는 visual cue입니다.
 * @returns {JSX.Element} 아래 방향 indicator를 반환합니다.
 */
export function ScrollCue() {
  return (
    <div className="mt-8 flex justify-center text-wedding-accent" aria-hidden="true">
      <span className="text-3xl leading-none">↓</span>
    </div>
  );
}
