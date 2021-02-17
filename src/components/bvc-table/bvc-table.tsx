import React from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { useTableScrollY } from './hooks/use-table-scroll-y';
import { useTableOnRow } from './hooks/use-table-on-row';
import useDimensions from 'react-cool-dimensions';

export interface BVCTableItem {
  id: string | number;
  [key: string]: any;
}

export const BVCTable = React.memo(function BVCTable({
  columns,
  data,
  clickable = true,
  selectable = false,
  showHeader = true,
  onClickRow,
  onSelectRow,
}: {
  columns: ColumnsType<BVCTableItem>;
  data: BVCTableItem[];
  clickable?: boolean;
  selectable?: boolean;
  showHeader?: boolean;
  onClickRow?: (item: BVCTableItem) => void;
  onSelectRow?: (item?: BVCTableItem) => void;
}) {
  const { ref, height } = useDimensions();

  const { rowSelection, onRow } = useTableOnRow({ data, clickable, selectable, onSelectRow, onClickRow });
  const scrollY = useTableScrollY(height);

  return (
    <div style={{ width: '100%', height: '100%', background: '#FFFFFF' }} ref={ref as any}>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        showHeader={showHeader}
        locale={{ emptyText: <div style={{ width: '100%', height: '100%', margin: 0, padding: 0 }} /> }}
        scroll={{ y: scrollY }}
        rowKey={item => item.id}
        rowSelection={rowSelection as any}
        rowClassName={clickable || selectable ? 'pointable' : undefined}
        onRow={onRow}
      />
    </div>
  );
});
