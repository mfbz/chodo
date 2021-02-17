import React from 'react';
import { BVCIcon } from '../../bvc-icon';

export const BVCTabMenuItemAdd = React.memo(function BVCTabMenuItemAdd({ onClick }: { onClick?: () => void }) {
  return (
    <div
      style={{
        width: 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#989898',
        marginBottom: 5,
        marginRight: 5,
        padding: 8,
        borderRadius: '5px 0px 0px 5px',
        cursor: 'pointer',
      }}
      onClick={onClick}>
      <BVCIcon src={require('./../../../assets/Add_48x48.png')} />
    </div>
  );
});
