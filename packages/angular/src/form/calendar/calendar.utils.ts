export function generateCalendarDays(inputDate: Date): Date[] {
  const daysInCalendar = 42;

  const year = inputDate.getFullYear();
  const month = inputDate.getMonth();

  const daysFromPrevMonth = calculateDaysInPreviousMonth(year, month);
  const daysInCurrentMonth = calculateDaysInMonth(year, month);
  const daysFromNextMonth =
    daysInCalendar - (daysFromPrevMonth.length + daysInCurrentMonth.length);
  const nextMonthDays = calculateDaysInNextMonth(
    year,
    month,
    daysFromNextMonth
  );

  return [...daysFromPrevMonth, ...daysInCurrentMonth, ...nextMonthDays];
}

export function calculateDaysInPreviousMonth(
  year: number,
  month: number
): Date[] {
  const firstDayOfMonth = new Date(year, month, 1);
  const firstDayOfWeek = firstDayOfMonth.getDay();

  const lastDayOfPrevMonth = new Date(year, month, 0);
  const daysInPrevMonth = lastDayOfPrevMonth.getDate();

  const result: Date[] = [];
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    result.push(new Date(year, month - 1, daysInPrevMonth - i));
  }

  return result;
}

export function calculateDaysInMonth(year: number, month: number): Date[] {
  const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();

  const result: Date[] = [];
  for (let i = 1; i <= daysInCurrentMonth; i++) {
    result.push(new Date(year, month, i));
  }

  return result;
}

export function calculateDaysInNextMonth(
  year: number,
  month: number,
  count: number
): Date[] {
  const result: Date[] = [];
  for (let i = 1; i <= count; i++) {
    result.push(new Date(year, month + 1, i));
  }

  return result;
}
