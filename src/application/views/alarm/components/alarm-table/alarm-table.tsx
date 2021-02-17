import React, { useMemo } from 'react';
import { useAlarmTableColumns } from './hooks/use-alarm-table-columns';
import { Alarm } from '../../../../interfaces/alarm';
import { BVCTable } from '../../../../../components/bvc-table';

export const AlarmTable = React.memo(function AlarmTable({
  alarms,
  showOccurred,
  clickable,
  selectable,
  onClickRow,
  onSelectRow,
}: {
  alarms: Alarm[] | null;
  showOccurred?: boolean;
  clickable?: boolean;
  selectable?: boolean;
  onClickRow?: (alarm: Alarm) => void;
  onSelectRow?: (alarm: Alarm) => void;
}) {
  const columns = useAlarmTableColumns(showOccurred);
  const data = useMemo<Alarm[]>(() => alarms || [], [alarms]);

  return (
    <BVCTable
      columns={columns as any}
      data={data}
      clickable={clickable}
      selectable={selectable}
      onClickRow={onClickRow as any}
      onSelectRow={onSelectRow as any}
    />
  );
});
