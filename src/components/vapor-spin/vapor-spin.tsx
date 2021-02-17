import Icon from '@ant-design/icons';
import { MdRefresh } from 'react-icons/md';
import React from 'react';

export const VaporSpin = React.memo(function VaporSpin({}: {}) {
  return (
    <div>
      <Icon component={MdRefresh} spin={true} />
    </div>
  );
});
