import { useState, useCallback } from 'react';
import { Alarm } from '../../../interfaces/alarm';

export function useAlarmSelection() {
  const [selectedAlarm, setSelectedAlarm] = useState<Alarm>();
  const onSelectRow = useCallback(alarm => setSelectedAlarm(alarm), []);

  return { onSelectRow, selectedAlarm };
}
