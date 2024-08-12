export function getTodayDateKr() {
  const objDate = new Date();
  const year = objDate.getFullYear();
  const month = objDate.getMonth() + 1; // getMonth는 0부터 시작하므로 1을 더함
  const day = objDate.getDate();
  return `${year}년 ${month}월 ${day}일`;
}
