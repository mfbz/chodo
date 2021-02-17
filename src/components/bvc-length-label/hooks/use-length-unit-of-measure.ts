import { useMemo } from 'react';

export function useLengthUnitOfMeasure(measurementSystem: 'metric' | 'imperial') {
  return useMemo(() => {
    if (measurementSystem === 'metric') {
      return 'mm';
    } else {
      return 'in';
    }
  }, [measurementSystem]);
}
