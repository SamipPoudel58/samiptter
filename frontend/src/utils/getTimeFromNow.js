import dayjs from 'dayjs';
import relativeTime from 'dayjs/esm/plugin/relativeTime';
dayjs.extend(relativeTime);
import updateLocale from 'dayjs/esm/plugin/updateLocale';
dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s',
    s: '1s',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    M: '1mon',
    MM: '%dmon',
    y: '1y',
    yy: '%dy',
  },
});

export function getTimeFromNow(time) {
  return dayjs(time).fromNow(true);
}
