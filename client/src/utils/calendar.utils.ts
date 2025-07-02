export function formattedDate(
  date: Date | null,
  format: string = "yyyy/mm/dd"
) {
  if (!date) return "";

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return format
    .replace("dd", day)
    .replace("mm", month)
    .replace("yyyy", year.toString());
}

export function isSameDay(dateA: Date | null, dateB: Date | null) {
  if (!dateA || !dateB) return false;

  return (
    dateA.getDate() === dateB.getDate() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getFullYear() === dateB.getFullYear()
  );
}
