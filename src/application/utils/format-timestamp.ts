import moment from 'moment';

export function formatTimestamp(timestampMS: number) {
  return moment.unix(timestampMS / 1000).format('HH:mm:ss DD/MM/YYYY');
}
