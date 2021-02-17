import { useEffect, useState } from 'react';
import { BackendService } from '../interfaces/backend-service';
import { useGetBackendServiceArray } from './use-get-backend-service-array';

// Save axis in a global instance to cache them
let backendServiceArrayCache: BackendService[] = [];

export function useBackendServiceArray() {
  const getBackendServiceArray = useGetBackendServiceArray();

  const [backendServiceArray, setBackendServiceArray] = useState<BackendService[] | null>(null);

  useEffect(() => {
    const executeGetBackendServiceArray = async () => {
      if (backendServiceArrayCache.length) {
        setBackendServiceArray(backendServiceArrayCache);
      } else {
        const _backendServiceArray = await getBackendServiceArray();
        setBackendServiceArray(_backendServiceArray);

        // Save it to cache
        if (_backendServiceArray) {
          backendServiceArrayCache = _backendServiceArray;
        }
      }
    };

    executeGetBackendServiceArray();
  }, [getBackendServiceArray]);

  return backendServiceArray;
}
