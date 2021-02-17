import React, { useMemo } from 'react';
import { useLengthUnitOfMeasure } from './hooks/use-length-unit-of-measure';
import { Variant } from '../bvc-label/interfaces/variant';
import { BVCLabel } from '../bvc-label';
import { useTranslation } from 'react-i18next';

export const BVCTextLengthLabel = React.memo(function BVCTextLengthLabel({
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

  const unitOfMeasure = useLengthUnitOfMeasure(displayMeasurementSystem);
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
