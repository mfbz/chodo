import React, { useMemo } from 'react';
import { useMassUnitOfMeasure } from './hooks/use-mass-unit-of-measure';
import { Variant } from '../bvc-label/interfaces/variant';
import { BVCLabel } from '../bvc-label';
import { useTranslation } from 'react-i18next';

export const BVCTextMassLabel = React.memo(function BVCTextMassLabel({
  value,
  displayMeasurementSystem = 'metric',
  type,
  strong,
  disabled,
  variant,
  inverse,
  translate = true,
  style,
}: {
  value: string;
  displayMeasurementSystem?: 'metric' | 'imperial';
  type?: 'secondary' | 'success' | 'warning' | 'danger';
  strong?: boolean;
  disabled?: boolean;
  variant?: Variant;
  inverse?: boolean;
  translate?: boolean;
  style?: React.CSSProperties;
}) {
  const { t } = useTranslation();

  const unitOfMeasure = useMassUnitOfMeasure(displayMeasurementSystem);
  const valueToDisplay = useMemo(() => `${translate ? t(value) : value} [${unitOfMeasure}]`, [
    translate,
    t,
    value,
    unitOfMeasure,
  ]);

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
