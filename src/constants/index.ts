import { toZonedTime } from 'date-fns-tz';

export const TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const TODAY = toZonedTime(new Date(), TIME_ZONE);
