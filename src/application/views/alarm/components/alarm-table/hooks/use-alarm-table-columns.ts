import React, { useMemo } from 'react';
import { Alarm } from '../../../../../interfaces/alarm';
import { ColumnsType } from 'antd/lib/table';
import { BVCLabel } from '../../../../../../components/bvc-label';
import { BVCIcon } from '../../../../../../components/bvc-icon';
import { BehaviorSubject } from 'rxjs';
import { formatTimestamp } from '../../../../../utils/format-timestamp';
import { AlarmDescriptionLabel } from '../../alarm-description-label/alarm-description-label';
import { AlarmIcon } from '../components/alarm-icon';

export function useAlarmTableColumns(showOccurred?: boolean) {
  // Title rendered through BVC label to be translated
  return useMemo<ColumnsType<Alarm>>(() => {
    const columns = [
      {
        title: '',
        dataIndex: 'messageType',
        key: 'messageType',
        width: 80,
        render: (messageType: 'warning' | 'error' | 'info') => React.createElement(AlarmIcon, { type: messageType }),
      },
      {
        title: 'Id',
        dataIndex: 'messageId',
        key: 'messageId',
        width: 120,
        render: (messageId: string) => React.createElement(BVCLabel, { text: messageId, translate: false }),
      },
      {
        title: () => React.createElement(BVCLabel, { text: 'Description', variant: 'header', inverse: true }),
        dataIndex: 'description',
        key: 'description',
        render: (
          description: BehaviorSubject<{
            [lang: string]: string;
          }>,
        ) => React.createElement(AlarmDescriptionLabel, { description: description }),
      },
      {
        title: () => React.createElement(BVCLabel, { text: 'Details', variant: 'header', inverse: true }),
        dataIndex: 'details',
        key: 'details',
        width: 300,
        render: (details: string) => React.createElement(BVCLabel, { text: details, translate: false }),
      },
    ];

    if (showOccurred) {
      columns.push({
        title: () => React.createElement(BVCLabel, { text: 'Occurred', variant: 'header', inverse: true }),
        dataIndex: 'occurred',
        key: 'occurred',
        width: 200,
        render: (occurred: number) =>
          React.createElement(BVCLabel, { text: formatTimestamp(occurred), translate: false }),
      } as any);
    }

    return columns;
  }, []);
}
