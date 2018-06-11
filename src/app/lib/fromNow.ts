import { DateTime } from 'luxon';

const fromNow = (lastLoginDate: string) => {
  const duration = DateTime.local()
    .diff(DateTime.fromISO(lastLoginDate))
    .shiftTo('years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds');

  const timeTable: [number, string, string][] = [
    [duration.years, 'years', 'year'],
    [duration.months, 'months', 'month'],
    [duration.days, 'days', 'day'],
    [duration.hours, 'hours', 'hour'],
    [duration.minutes, 'minutes', 'minute'],
    [duration.seconds, 'seconds', 'second'],
  ];

  for (const [time, plural, singular] of timeTable) {
    if (time > 1) {
      return `${Math.ceil(time)} ${plural} ago`;
    } else if (time > 0) {
      return `${Math.floor(time)} ${singular} ago`;
    }
  }

  return 'Now';
};

export default fromNow;
