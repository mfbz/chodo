export function convertLength(
  value: number,
  valueMeasurementSystem: 'metric' | 'imperial',
  displayMeasurementSystem: 'metric' | 'imperial',
  digits: number = 2,
) {
  return value;

  /*
  const factor = 25.4;
  if (valueMeasurementSystem === 'metric' && displayMeasurementSystem === 'imperial') {
    // Fix decimals and remove trailing zeros through parseFloat
    return parseFloat((value / factor).toFixed(digits));
  }

  if (valueMeasurementSystem === 'imperial' && displayMeasurementSystem === 'metric') {
    // Fix decimals and remove trailing zeros through parseFloat
    return parseFloat((value * factor).toFixed(digits));
  }

  return Number(value.toFixed(digits));
  */
}