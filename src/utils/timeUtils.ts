import { toZonedTime } from 'date-fns-tz';
import { TIME_ZONE } from '@/constants';

export function getFormattedDateKr() {
  const objDate = toZonedTime(new Date(), TIME_ZONE);
  const year = objDate.getFullYear();
  const month = objDate.getMonth() + 1; // getMonth는 0부터 시작하므로 1을 더함
  const day = objDate.getDate();
  return `${year}년 ${month}월 ${day}일`;
}

export function getCurrentDate() {
  return toZonedTime(new Date(), TIME_ZONE).toISOString();
}

export const isValidDate = (year: string | undefined, month: string | undefined, day: string | undefined): boolean => {
  if (!year || !month || !day) return false;

  const yearPattern = /^20\d{2}$/;
  if (!yearPattern.test(year)) return false;

  const y = parseInt(year, 10);
  const m = parseInt(month, 10);
  const d = parseInt(day, 10);

  if (Number.isNaN(y) || Number.isNaN(m) || Number.isNaN(d)) return false;

  if (m < 1 || m > 12) return false;

  const daysInMonth = toZonedTime(new Date(y, m, 0), TIME_ZONE).getDate();
  if (d < 1 || d > daysInMonth) return false;

  return true;
};
