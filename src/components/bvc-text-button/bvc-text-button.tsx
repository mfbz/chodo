import React from 'react';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

export const BVCTextButton = React.memo(function BVCTextButton({
  text,
  disabled,
  htmlType,
  onClick,
  onClickDisabled,
}: {
  text: string;
  disabled?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  onClickDisabled?: () => void;
}) {
  const { t } = useTranslation();

  return (
    <Button
      type="primary"
      onClick={disabled ? onClickDisabled : onClick}
      block={true}
      style={{
        backgroundColor: '#CBCBCC',
        border: '2px solid #000000',
        borderRadius: 4,
        padding: '4px 10px 5px 10px',
        margin: 0,
        fontWeight: 'bold',
        opacity: disabled ? 0.5 : 1,
      }}
      htmlType={htmlType}>
      {t(text)}
    </Button>
  );
});
