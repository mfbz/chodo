import React, { useMemo } from 'react';
import { HmiRun } from '../../../../../wamphooks/topics/use-topic-hmimanager-runlistupdated';
import { ColumnsType } from 'antd/lib/table';
import { BVCLabel } from '../../../../../components/bvc-label';
import { BVCUserLengthLabel, BVCUserTextLengthLabel } from '../../../../../components/bvc-length-label';

export function useRunlistTableColumns() {
  // Title rendered through BVC label to be translated
  // Handle also unit of measure conversion through length labels and hook to add unit of measure to column
  return useMemo<ColumnsType<HmiRun>>(() => {
    const columns = [
      {
        title: () => React.createElement(BVCLabel, { text: 'Id', variant: 'header', inverse: true }),
        dataIndex: 'id',
        key: 'id',
        width: 100,
        render: (id: number) => React.createElement(BVCLabel, { text: id.toString(), translate: false }),
      },
      {
        title: () => React.createElement(BVCLabel, { text: 'Quantity', variant: 'header', inverse: true }),
        dataIndex: 'quantityToDo',
        key: 'quantityToDo',
        width: 180,
        render: (quantityToDo: number) =>
          React.createElement(BVCLabel, { text: quantityToDo.toString(), translate: false }),
      },
      {
        title: () => React.createElement(BVCUserTextLengthLabel, { value: 'Length', variant: 'header', inverse: true }),
        dataIndex: 'length',
        key: 'length',
        width: 250,
        render: (length: number) => React.createElement(BVCUserLengthLabel, { value: length }),
      },
      {
        title: () => React.createElement(BVCUserTextLengthLabel, { value: 'Width', variant: 'header', inverse: true }),
        dataIndex: 'width',
        key: 'width',
        width: 250,
        render: (width: number) => React.createElement(BVCUserLengthLabel, { value: width }),
      },
      {
        title: () =>
          React.createElement(BVCUserTextLengthLabel, { value: 'Thickness', variant: 'header', inverse: true }),
        dataIndex: 'thickness',
        key: 'thickness',
        width: 250,
        render: (thickness: number) => React.createElement(BVCUserLengthLabel, { value: thickness }),
      },
      {
        title: () => React.createElement(BVCLabel, { text: 'Material', variant: 'header', inverse: true }),
        dataIndex: 'materialName',
        key: 'materialName',
        render: (materialName: string) => React.createElement(BVCLabel, { text: materialName, translate: false }),
      },
      {
        title: () => React.createElement(BVCLabel, { text: 'Cutting plan', variant: 'header', inverse: true }),
        dataIndex: 'cuttingPlan',
        key: 'cuttingPlan',
        render: (cuttingPlan: string) => React.createElement(BVCLabel, { text: cuttingPlan, translate: false }),
      },
    ];

    return columns;
  }, []);
}
