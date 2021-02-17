import React, { useMemo } from 'react';
import { useConvertLength } from './hooks/use-convert-length';
import { useLengthUnitOfMeasure } from './hooks/use-length-unit-of-measure';
import { Variant } from '../bvc-label/interfaces/variant';
import { BVCLabel } from '../bvc-label';

export const BVCLengthLabel = React.memo(function BVCLengthLabel({
  value,
  valueMeasurementSystem = 'metric',
  displayMeasurementSystem = 'metric',
  showUnitOfMeasure = false,
  digits = 2,
  type,
  strong,
  disabled,
  variant,
  inverse,
  style,
}: {
  value: number;
  valueMeasurementSystem?: 'metric' | 'imperial';
  displayMeasurementSystem?: 'metric' | 'imperial';
  showUnitOfMeasure?: boolean;
  digits?: number;
  type?: 'secondary' | 'success' | 'warning' | 'danger';
  strong?: boolean;
  disabled?: boolean;
  variant?: Variant;
  inverse?: boolean;
  style?: React.CSSProperties;
}) {
  const convertedValue = useConvertLength(value, valueMeasurementSystem, displayMeasurementSystem, digits);
  const unitOfMeasure = useLengthUnitOfMeasure(displayMeasurementSystem);

  const valueToDisplay = useMemo(() => {
    if (!showUnitOfMeasure) {
      return convertedValue.toString();
    } else {
      return convertedValue.toString() + ' ' + unitOfMeasure;
    }
  }, [convertedValue, showUnitOfMeasure, unitOfMeasure]);

  return (
    <BVCLabel
      text={valueToDisplay}
      type={type}
      strong={strong}
      variant={variant}
      inverse={inverse}
      disabled={disabled}
      ellipsis={false}
      translate={false}
      style={style}
    />
  );
});
