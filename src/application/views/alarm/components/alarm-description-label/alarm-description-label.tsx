import React from 'react';
import { BehaviorSubject } from 'rxjs';
import { BVCLabel } from '../../../../../components/bvc-label';
import { useCurrentUser } from '../../../../hooks/use-current-user';
import { useAlarmDescriptionValue } from './hooks/use-alarm-description-value';

export const AlarmDescriptionLabel = React.memo(function AlarmDescriptionLabel({
  description,
}: {
  description: BehaviorSubject<{
    [lang: string]: string;
  }>;
}) {
  // Get current user language so that i can display the correct description
  const { language } = useCurrentUser();

  // Get current descrition depending on user language
  const currentDescription = useAlarmDescriptionValue(description, language);

  return <BVCLabel text={currentDescription} translate={false} />;
});
