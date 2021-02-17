import { useState, useEffect } from 'react';
import { getMultiRoutes } from '../store/router';
import { MultiRoute } from '../interfaces/route';

export function useMultiRoutes() {
  const [multiRoutes, setMultiRoutes] = useState<MultiRoute[]>([]);

  useEffect(() => {
    const _multiRoutes = getMultiRoutes();

    setMultiRoutes(_multiRoutes);
  }, []);

  return multiRoutes;
}
