import { useMemo } from "react";

export function useCalendarDays(year: number, month: number) {
  const days = useMemo(() => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDatOfMonth = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const daysInMonth = lastDatOfMonth.getDate();

    const daysArray: (Date | null)[] = [];

    for (let i = 0; i < firstDayOfWeek; i++) {
      daysArray.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      daysArray.push(new Date(year, month, day));
    }
    return daysArray;
  }, [year, month]);
  return days;
}
