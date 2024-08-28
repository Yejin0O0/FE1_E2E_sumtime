import { toZonedTime } from 'date-fns-tz';

export const TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;
console.log('~~~~~~~~~in CONSTANTS: ', TIME_ZONE);

console.log('~~~~~~~~~~ toZonedTime', toZonedTime(new Date(), 'Asia/Seoul'));
export const TODAY = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));

console.log('~~~~~~~~~~~~~~~TODAY in CONSTANTS:', TODAY);
