import React from 'react';
import { Alarm } from '../../../../interfaces/alarm';
import { BVCPanel } from '../../../../../components/bvc-panel';
import { useAlarmSolutions } from './hooks/use-alarm-solutions';
import { useAlarmSolutionDescriptionValue } from './hooks/use-alarm-solution-description-value';
import { useCurrentUser } from '../../../../hooks/use-current-user';

export const AlarmSolutionsPanel = React.memo(function AlarmSolutionsPanel({ alarm }: { alarm: Alarm }) {
  const solutions = useAlarmSolutions(alarm.messageId);

  // Get language used to decide what description to show
  const { language } = useCurrentUser();
  // Get correct language description of first solution only
  const solutionDescription = useAlarmSolutionDescriptionValue(solutions?.[0], language);

  return (
    <BVCPanel title={'Solutions'} background={'#FFFFFF'}>
      <div style={{ width: '100%', height: '100%', padding: 16 }}>{solutionDescription}</div>
    </BVCPanel>
  );
});
