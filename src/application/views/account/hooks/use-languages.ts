import { useEffect, useState } from 'react';
import { useLoadLanguages } from './use-load-languages';
import { Language } from '../../../interfaces/language';

// Save languages in a global instance to cache them
let languagesCache: Language[] = [];

export function useLanguages() {
  const loadLanguages = useLoadLanguages();

  const [languages, setLanguages] = useState<Language[] | null>(null);

  useEffect(() => {
    const executeLoadLanguages = async () => {
      if (languagesCache.length) {
        setLanguages(languagesCache);
      } else {
        const _languages = await loadLanguages();
        setLanguages(_languages);

        // Save it to cache
        if (_languages) {
          languagesCache = _languages;
        }
      }
    };

    executeLoadLanguages();
  }, [loadLanguages]);

  return languages;
}
