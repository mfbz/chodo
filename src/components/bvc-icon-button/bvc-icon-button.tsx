import React from 'react';
import { Button } from 'antd';
import { IconSize } from '../bvc-icon/interfaces/icon-size';
import { useButtonSize } from './hooks/use-button-size';

export const BVCIconButton = React.memo(function BVCIconButton({
  icon,
  size = 'normal',
  disabled,
  onClick,
  onClickDisabled,
  onTouchStart,
  onTouchEnd,
  onTouchMove,
  onMouseDown,
  onMouseUp,
  onMouseMove,
  style,
}: {
  icon: React.ReactNode;
  size?: IconSize;
  disabled?: boolean;
  onClick?: () => void;
  onClickDisabled?: () => void;
  onTouchStart?: (event: React.TouchEvent<any>) => void;
  onTouchEnd?: (event: React.TouchEvent<any>) => void;
  onTouchMove?: (event: React.TouchEvent<any>) => void;
  onMouseDown?: (event: React.MouseEvent<any>) => void;
  onMouseUp?: (event: React.MouseEvent<any>) => void;
  onMouseMove?: (event: React.MouseEvent<any>) => void;
  style?: React.CSSProperties;
}) {
  const { width, height, padding } = useButtonSize(size);

  return (
    <Button
      type="primary"
      icon={icon}
      onClick={disabled ? onClickDisabled : onClick}
      onTouchStart={disabled ? undefined : onTouchStart}
      onTouchEnd={disabled ? undefined : onTouchEnd}
      onTouchMove={disabled ? undefined : onTouchMove}
      onMouseDown={disabled ? undefined : onMouseDown}
      onMouseUp={disabled ? undefined : onMouseUp}
      onMouseMove={disabled ? undefined : onMouseMove}
      style={{
        backgroundColor: '#CBCBCC',
        border: '2px solid #000000',
        borderRadius: 4,
        padding: padding,
        margin: 0,
        width: width,
        height: height,
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
    />
  );
});
