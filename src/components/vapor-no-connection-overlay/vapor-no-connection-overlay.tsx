import React from 'react';
import { Space } from 'antd';
import { VaporLabel } from '../vapor-label';
import { VaporSpin } from '../vapor-spin';
import { VaporOverlay } from '../vapor-overlay';

export const VaporNoConnectionOverlay = React.memo(function VaporNoConnectionOverlay({
  onlySpinner,
}: {
  onlySpinner?: boolean;
}) {
  return (
    <VaporOverlay>
      <Space size="large" direction="vertical" align={'center'}>
        <VaporSpin />

        {!onlySpinner && <VaporLabel text={'No connection'} variant={'header'} />}
      </Space>
    </VaporOverlay>
  );
});
