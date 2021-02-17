import { useEffect, useState } from 'react';
import { defineLanguage } from '../utils/define-language';

export function useInitializeLanguage() {
  const [i18nInstance, setI18nInstance] = useState<any>(null);

  useEffect(() => {
    defineLanguage('default', '').then(_i18nInstance => {
      setI18nInstance(_i18nInstance);
    });
  }, []);

  return i18nInstance;
}
