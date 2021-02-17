import { useState, useEffect } from 'react';
import { AlarmSolution } from './use-alarm-solutions';

export function useAlarmSolutionDescriptionValue(solution?: AlarmSolution, language?: string) {
  const [currentDescription, setCurrentDescription] = useState('');

  useEffect(() => {
    if (solution) {
      if (language && language in solution.description) {
        setCurrentDescription(solution.description[language]);
      } else {
        setCurrentDescription(solution.description['default']);
      }
    } else {
      setCurrentDescription('');
    }
  }, [solution, language]);

  return currentDescription;
}
