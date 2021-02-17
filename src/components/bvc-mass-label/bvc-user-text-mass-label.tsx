import React from 'react';
import { Variant } from '../bvc-label/interfaces/variant';
import { useCurrentUser } from '../../application';
import { BVCTextMassLabel } from './bvc-text-mass-label';

export const BVCUserTextMassLabel = React.memo(function BVCUserTextMassLabel({
  value,
  type,
  strong,
  disabled,
  variant,
  inverse,
  translate = true,
  style,
}: {
  value: string;
  type?: 'secondary' | 'success' | 'warning' | 'danger';
  strong?: boolean;
  disabled?: boolean;
  variant?: Variant;
  inverse?: boolean;
  translate?: boolean;
  style?: React.CSSProperties;
}) {
  const { measurementSystem } = useCurrentUser();

  return (
    <BVCTextMassLabel
      value={value}
      displayMeasurementSystem={measurementSystem}
      type={type}
      strong={strong}
      variant={variant}
      inverse={inverse}
      disabled={disabled}
      translate={translate}
      style={style}
    />
  );
});
