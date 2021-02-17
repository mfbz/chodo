import React, { useMemo } from 'react';
import { useConvertMass } from './hooks/use-convert-mass';
import { useMassUnitOfMeasure } from './hooks/use-mass-unit-of-measure';
import { Variant } from '../bvc-label/interfaces/variant';
import { BVCLabel } from '../bvc-label';

export const BVCMassLabel = React.memo(function BVCMassLabel({
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
  const convertedValue = useConvertMass(value, valueMeasurementSystem, displayMeasurementSystem, digits);
  const unitOfMeasure = useMassUnitOfMeasure(displayMeasurementSystem);

  const valueToDisplay = useMemo(() => {
    if (!showUnitOfMeasure) {
      return convertedValue.toString();
    } else {
      return convertedValue.toString() + ' ' + unitOfMeasure;
    }
  }, [convertedValue, unitOfMeasure, showUnitOfMeasure]);

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
