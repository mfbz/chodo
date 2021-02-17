import React from 'react';
import { Typography } from 'antd';
import { useVariantSize } from './hooks/use-variant-size';

export type VaporLabelVariant = 'content' | 'header' | 'hero';

export const VaporLabel = React.memo(function VaporLabel({
  text,
  type,
  ellipsis,
  strong,
  disabled,
  variant,
  inverse,
  style,
}: {
  text: string;
  type?: 'secondary' | 'success' | 'warning' | 'danger';
  ellipsis?: boolean;
  strong?: boolean;
  disabled?: boolean;
  variant?: VaporLabelVariant;
  inverse?: boolean;
  style?: React.CSSProperties;
}) {
  // Get font size depending on the variant
  const size = useVariantSize(variant);

  // TODO CHANGE DEFAULT FONT COLOR
  return (
    <Typography.Text
      type={type}
      ellipsis={ellipsis}
      strong={strong}
      disabled={disabled}
      style={{ fontSize: size, color: inverse ? '#FFFFFF' : '#000000', ...style }}>
      {text}
    </Typography.Text>
  );
});
