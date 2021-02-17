import { useMemo } from 'react';

export function useMassUnitOfMeasure(measurementSystem: 'metric' | 'imperial') {
  return useMemo(() => {
    if (measurementSystem === 'metric') {
      return 'kg';
    } else {
      return 'lb';
    }
  }, [measurementSystem]);
}
