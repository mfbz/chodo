let alarmServiceUrl = 'http://localhost:3000';

export function getAlarmServiceUrl() {
  return alarmServiceUrl;
}

export function setAlarmServiceUrl(_alarmServiceUrl: string) {
  alarmServiceUrl = _alarmServiceUrl;
}

export function addAlarmServicePrefix(resourceName: string) {
  const separator = alarmServiceUrl.slice(-1) === '/' ? '' : '/';

  return alarmServiceUrl + separator + resourceName;
}
