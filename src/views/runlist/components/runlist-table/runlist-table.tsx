import React, { useMemo } from 'react';
import { HmiRunList, HmiRun } from '../../../../wamphooks/topics/use-topic-hmimanager-runlistupdated';
import { useRunlistTableColumns } from './hooks/use-runlist-table-columns';
import { BVCTable } from '../../../../components/bvc-table';

export const RunlistTable = React.memo(function RunlistTable({
  runlist,
  clickable,
  onClickRow,
}: {
  runlist: HmiRunList | null;
  clickable?: boolean;
  onClickRow?: (item: HmiRun) => void;
}) {
  const columns = useRunlistTableColumns();
  const data = useMemo<HmiRun[]>(() => runlist?.runs || [], [runlist]);

  return <BVCTable columns={columns as any} clickable={clickable} onClickRow={onClickRow as any} data={data} />;
});
