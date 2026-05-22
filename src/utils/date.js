/**
 * 오늘부터 target date까지 남은 calendar day 수를 계산합니다.
 * @param {string} targetDateTime ISO 8601 date-time 문자열입니다.
 * @returns {number} 남은 일수입니다. 당일은 0, 지난 날짜는 음수입니다.
 */
export function getDaysUntil(targetDateTime) {
  const target = new Date(targetDateTime);
  const today = new Date();
  const targetDate = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const millisecondsPerDay = 1000 * 60 * 60 * 24;

  return Math.ceil((targetDate.getTime() - todayDate.getTime()) / millisecondsPerDay);
}
