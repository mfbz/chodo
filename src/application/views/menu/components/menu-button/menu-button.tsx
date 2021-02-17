import React from 'react';
import { BVCLabel } from '../../../../../components/bvc-label';

export const MenuButton = React.memo(function MenuButton({
  text,
  icon,
  onClick,
}: {
  text: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <div
      style={{
        width: '100%',
        height: 200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#FFFFFF',
        marginBottom: 10,
        border: '1px solid #000000',
        borderRadius: 10,
        cursor: 'pointer',
      }}
      onClick={onClick}>
      {icon}
      <div style={{ marginTop: 8 }}>
        <BVCLabel text={text} variant={'header'} />
      </div>
    </div>
  );
});
