import React from 'react';
import { Button } from 'antd';
import useDimensions from 'react-cool-dimensions';
import { useTranslation } from 'react-i18next';

export const BVCBlockButton = React.memo(function BVCBlockButton({
  text,
  icon,
  disabled,
  onClick,
  onClickDisabled,
  style,
}: {
  text: string;
  icon: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  onClickDisabled?: () => void;
  style?: React.CSSProperties;
}) {
  const { t } = useTranslation();
  const { ref, width, height } = useDimensions();

  return (
    <Button
      type="primary"
      icon={icon}
      onClick={disabled ? onClickDisabled : onClick}
      block={true}
      style={{
        backgroundColor: '#CBCBCC',
        border: '2px solid #000000',
        borderRadius: 4,
        padding: '4px 10px 5px 10px',
        margin: 0,
        opacity: disabled ? 0.5 : 1,
        textAlign: 'left',
        ...style,
      }}
      ref={ref}>
      <span
        style={{
          width: width - 20 - 48,
          height: height,
          paddingTop: 8,
          fontWeight: 'bold',
          position: 'absolute',
          textAlign: 'center',
        }}>
        {t(text)}
      </span>
    </Button>
  );
});
