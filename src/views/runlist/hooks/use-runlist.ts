import { useEffect, useState } from 'react';
import {
  HmiRunList,
  useProcedureHmimanagerGetLaserRunlist,
} from '../../../wamphooks/procedures/use-procedure-hmimanager-getlaserrunlist';
import { useTopicHmimanagerRunlistUpdated } from '../../../wamphooks/topics/use-topic-hmimanager-runlistupdated';

export function useRunlist(laserId: number) {
  const [runlist, setRunlist] = useState<HmiRunList | null>(null);

  // Initialize laser runlist as the one received from the get method
  const { data: laserRunlist } = useProcedureHmimanagerGetLaserRunlist({ idLaser: laserId });
  useEffect(() => setRunlist(laserRunlist), [laserRunlist]);

  // Each time a new runlist arrives update laser runlist only if the one of my selected id
  const { data: updatedRunlistData } = useTopicHmimanagerRunlistUpdated();
  useEffect(() => {
    if (updatedRunlistData?.obj?.idLaser === laserId) {
      setRunlist(updatedRunlistData.obj);
    }
  }, [laserId, updatedRunlistData]);

  return runlist;
}
