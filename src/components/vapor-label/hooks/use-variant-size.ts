import { useMemo } from 'react';
import { VaporLabelVariant } from '../vapor-label';

// TODO CONVERT TO EM THAT ARE RELATED TO FONT SIZE OF THE WHOLE APP

export function useVariantSize(variant?: VaporLabelVariant) {
  return useMemo(() => {
    switch (variant) {
      case 'content':
        return 18;
      case 'header':
        return 24;
      case 'hero':
        return 40;
      default:
        return 18;
    }
  }, [variant]);
}
