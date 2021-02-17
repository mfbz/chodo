import { useMemo } from 'react';

export function useConvertLength(
  value: number,
  valueMeasurementSystem: 'metric' | 'imperial',
  displayMeasurementSystem: 'metric' | 'imperial',
  digits: number,
) {
  return value;

  /*
  const factor = 25.4;
  return useMemo(() => {
    if (valueMeasurementSystem === 'metric' && displayMeasurementSystem === 'imperial') {
      // Fix decimals and remove trailing zeros through parseFloat
      return parseFloat((value / factor).toFixed(digits));
    }
    if (valueMeasurementSystem === 'imperial' && displayMeasurementSystem === 'metric') {
      // Fix decimals and remove trailing zeros through parseFloat
      return parseFloat((value * factor).toFixed(digits));
    }
    return Number(value.toFixed(digits));
  }, [valueMeasurementSystem, displayMeasurementSystem, value, digits]);
  */
}
