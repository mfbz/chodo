import React from 'react';
import Icon from '@ant-design/icons';
import { IconSize } from './interfaces/icon-size';
import { useIconSize } from './hooks/use-icon-size';

export const BVCIcon = React.memo(function BVCIcon({ src, size = 'normal' }: { src: string; size?: IconSize }) {
  const iconSize = useIconSize(size);

  return <Icon component={() => <img src={src} width={iconSize} height={iconSize} />} size={iconSize} />;
});
