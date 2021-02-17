import { useState, useMemo, useEffect } from 'react';
import { BVCTableItem } from '..';

export function useTableOnRow({
  data,
  clickable,
  selectable,
  multipleSelection,
  onClickRow,
  onSelectRow,
}: {
  data: BVCTableItem[];
  clickable?: boolean;
  selectable?: boolean;
  multipleSelection?: boolean;
  onClickRow?: (item: BVCTableItem) => void;
  onSelectRow?: (item?: BVCTableItem) => void;
}) {
  const [selectedKeys, setSelectedKeys] = useState<(string | number)[]>([]);

  // Preselect first element if table is selectable and on data change
  useEffect(() => {
    if (selectable) {
      const preselectedItem = data.length ? data[0] : undefined;

      if (onSelectRow) {
        onSelectRow(preselectedItem);
      }
      setSelectedKeys(preselectedItem ? [preselectedItem.id] : []);
    }
  }, [data]);

  // Use an effect that clears the list selecting only first element if multipleSelection goes to false or doing nothing if only one is selected
  useEffect(() => {
    if (!multipleSelection) {
    }
  }, [multipleSelection]);

  const rowSelection = useMemo(
    () =>
      selectable
        ? {
            columnWidth: '1px',
            type: 'radio',
            hideSelectAll: true,
            selectedRowKeys: selectedKeys,
            renderCell: () => undefined,
          }
        : undefined,
    [selectedKeys],
  );

  // What to do when a row is clicked
  const onRow = useMemo(
    () => (item: BVCTableItem) => {
      return {
        onClick: () => {
          if (selectable) {
            const index = selectedKeys.indexOf(item.id);

            if (multipleSelection) {
              // Trigger on select row if i'm setting this item as new selected one
              if (index >= 0) {
                // Already present

                // Remove it from selected keys
                setSelectedKeys(_selectedKeys => {
                  const newSelectedKeys = [..._selectedKeys];
                  newSelectedKeys.splice(index, 1);
                  return newSelectedKeys;
                });
              } else {
                // Not already included

                // Trigger on select and add it to selected keys
                if (onSelectRow) {
                  onSelectRow(item);
                }
              }
            } else {
              // If not already selected set it as selected
              if (index === -1) {
                if (onSelectRow) {
                  onSelectRow(item);
                }
                setSelectedKeys([item.id]);
              }
            }
          }

          if (clickable && onClickRow) {
            onClickRow(item);
          }
        },
      };
    },
    [clickable, selectable, multipleSelection, selectedKeys, onSelectRow, onClickRow],
  );

  return { rowSelection, onRow };
}
