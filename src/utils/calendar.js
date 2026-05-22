/**
 * Date 값을 iCalendar UTC timestamp로 변환합니다.
 * @param {string} isoDateTime ISO 8601 date-time 문자열입니다.
 * @returns {string} iCalendar UTC timestamp입니다.
 */
function toIcsDateTime(isoDateTime) {
  return new Date(isoDateTime).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

/**
 * iCalendar text field에서 특수문자를 escape합니다.
 * @param {string} value iCalendar field 값입니다.
 * @returns {string} escape된 iCalendar field 값입니다.
 */
function escapeIcsText(value) {
  return value.replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n');
}

/**
 * 예식 정보를 기반으로 iCalendar 파일 내용을 생성합니다.
 * @param {{title: string, startDateTime: string, endDateTime: string, venue: string, hall?: string, address: string, description: string}} event Calendar event 데이터입니다.
 * @returns {string} iCalendar 파일 문자열입니다.
 */
export function createWeddingIcs(event) {
  const now = toIcsDateTime(new Date().toISOString());

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Mobile Wedding//Wedding Invitation//KO',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${event.startDateTime}-mobile-wedding`,
    `DTSTAMP:${now}`,
    `DTSTART:${toIcsDateTime(event.startDateTime)}`,
    `DTEND:${toIcsDateTime(event.endDateTime)}`,
    `SUMMARY:${escapeIcsText(event.title)}`,
    `LOCATION:${escapeIcsText(`${event.venue} ${event.hall || ''} ${event.address}`.trim())}`,
    `DESCRIPTION:${escapeIcsText(event.description)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

/**
 * 문자열 content를 파일로 다운로드합니다.
 * @param {string} content 다운로드할 파일 내용입니다.
 * @param {string} filename 다운로드 파일명입니다.
 * @param {string} mimeType 파일 MIME type입니다.
 * @returns {void}
 */
export function downloadTextFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
