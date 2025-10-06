export const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export function getDaysInMonth(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const numDays = new Date(year, month + 1, 0).getDate();

  const daysArray = [];

  for (let i = 0; i < firstDay; i++) {
    daysArray.push(null);
  }

  for (let i = 1; i <= numDays; i++) {
    daysArray.push(new Date(year, month, i));
  }

  return daysArray;
}

export function formatDate(date) {
  if (!date) return '';
  return date.toISOString().split("T")[0];
}
