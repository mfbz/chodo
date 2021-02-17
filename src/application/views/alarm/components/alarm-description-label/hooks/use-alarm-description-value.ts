import { BehaviorSubject, Subscription, isObservable } from 'rxjs';
import { useState, useEffect } from 'react';

export function useAlarmDescriptionValue(
  description: BehaviorSubject<{
    [lang: string]: string;
  }>,
  language?: string,
) {
  const [currentDescription, setCurrentDescription] = useState('');

  useEffect(() => {
    const subscription = description.subscribe(_description => {
      if (language && language in _description) {
        setCurrentDescription(_description[language]);
      } else {
        setCurrentDescription(_description['default']);
      }
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [description, language]);

  return currentDescription;
}
