import React from 'react';
import { List } from 'antd';

export const BVCList = React.memo(function BVCList({
  data,
  renderItem,
}: {
  data: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
}) {
  return (
    <List
      dataSource={data}
      split={false}
      renderItem={renderItem}
      style={{ width: '100%', height: '100%' }}
      locale={{ emptyText: <div style={{ width: '100%', height: '100%', margin: 0, padding: 0 }} /> }}
    />
  );
});
