import { useEffect, useState, useMemo } from 'react';
import { Alarm } from '../interfaces/alarm';
import { getAlarms$ } from '../store/alarm';

export function useCurrentAlarms() {
  const [alarms, setAlarms] = useState<Alarm[] | null>(null);

  useEffect(() => {
    const subscription = getAlarms$().subscribe(_alarms => {
      setAlarms(_alarms);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return alarms;
}
