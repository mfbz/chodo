import React from 'react';
import { Variant } from '../bvc-label/interfaces/variant';
import { useCurrentUser } from '../../application';
import { BVCMassLabel } from './bvc-mass-label';

// Equal to mass label but without displayMeasurementSystem because that depends on the user
export const BVCUserMassLabel = React.memo(function BVCUserMassLabel({
  value,
  valueMeasurementSystem = 'metric',
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
  showUnitOfMeasure?: boolean;
  digits?: number;
  type?: 'secondary' | 'success' | 'warning' | 'danger';
  strong?: boolean;
  disabled?: boolean;
  variant?: Variant;
  inverse?: boolean;
  style?: React.CSSProperties;
}) {
  const { measurementSystem } = useCurrentUser();

  return (
    <BVCMassLabel
      value={value}
      valueMeasurementSystem={valueMeasurementSystem}
      digits={digits}
      showUnitOfMeasure={showUnitOfMeasure}
      displayMeasurementSystem={measurementSystem}
      type={type}
      strong={strong}
      variant={variant}
      inverse={inverse}
      disabled={disabled}
      style={style}
    />
  );
});
