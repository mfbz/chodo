import { useState, useEffect } from 'react';
import { getMultiRoutesMap } from '../store/router';
import { MultiRoute } from '../interfaces/route';

export function useMultiRoutesMap() {
  const [multiRoutesMap, setMultiRoutesMap] = useState<Map<string, MultiRoute>>(new Map<string, MultiRoute>());

  useEffect(() => {
    const _multiRoutesMap = getMultiRoutesMap();

    setMultiRoutesMap(_multiRoutesMap);
  }, []);

  return multiRoutesMap;
}
