import { useState, useEffect } from 'react';
import { Module } from '../interfaces/module';
import { getModule } from '../store/module';

export function useModule() {
  const [module, setModule] = useState<Module | null>();

  useEffect(() => {
    const _module = getModule();

    setModule(_module);
  }, []);

  return module;
}
