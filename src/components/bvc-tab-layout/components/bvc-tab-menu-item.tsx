import React from 'react';
import { BVCTabLayoutItem } from '../interfaces/bvc-tab-layout-item';
import { BVCLabel } from '../../bvc-label';

export const BVCTabMenuItem = React.memo(function BVCTabMenuItem({
  item,
  selected,
  onClick,
  style,
}: {
  item: BVCTabLayoutItem;
  selected: boolean;
  onClick: () => void;
  style?: React.CSSProperties;
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
        ...style,
      }}
      onClick={onClick}>
      {item.icon}

      <BVCLabel text={item.title} ellipsis={true} style={{ width: '100%', textAlign: 'center' }} />
    </div>
  );
});
