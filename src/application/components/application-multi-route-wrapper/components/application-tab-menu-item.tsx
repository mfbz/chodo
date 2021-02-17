import React from 'react';
import { BVCLabel } from '../../../../components/bvc-label';

export const ApplicationTabMenuItem = React.memo(function ApplicationTabMenuItem({
  icon,
  text,
  selected,
  onClick,
}: {
  icon: React.ReactNode;
  text: string;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      style={{
        width: selected ? 105 : 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: selected ? '#CDCDCD' : '#989898',
        marginBottom: 5,
        marginRight: selected ? 0 : 5,
        padding: 8,
        borderRadius: '5px 0px 0px 5px',
        cursor: 'pointer',
      }}
      onClick={onClick}>
      {icon}

      <BVCLabel text={text} ellipsis={true} style={{ width: '100%', textAlign: 'center' }} />
    </div>
  );
});
