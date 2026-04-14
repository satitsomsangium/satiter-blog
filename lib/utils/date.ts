/** Thai long date for post bylines (matches previous `getThaiDateText` behavior). */
export function formatDateThai(dateInput: string) {
  return new Intl.DateTimeFormat("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateInput));
}
