import { useMemo } from 'react';

// Standalone by default
export function useStandaloneByWorkmode(workMode?: 'sfcc' | 'standalone') {
  return useMemo(() => !workMode || workMode === 'standalone', [workMode]);
}
