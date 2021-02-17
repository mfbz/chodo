import React from 'react';
import { List } from 'antd';

export const BVCGrid = React.memo(function BVCGrid({
  columns,
  data,
  renderItem,
}: {
  columns: number;
  data: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
}) {
  return (
    <List
      grid={{ gutter: 16, column: columns }}
      dataSource={data}
      split={false}
      renderItem={renderItem}
      style={{ width: '100%', height: '100%' }}
      locale={{ emptyText: <div style={{ width: '100%', height: '100%', margin: 0, padding: 0 }} /> }}
    />
  );
});
