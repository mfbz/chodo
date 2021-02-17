import { SheetMaterial } from '../../../wamphooks/procedures/use-procedure-hmimanager-getmaterials';
import { useGetMaterialArray } from './use-get-material-array';
import { useState, useEffect } from 'react';

// Save materials in a global instance to cache them
let materialArrayCache: SheetMaterial[] = [];

export function useMaterialArray() {
  const getMaterialArray = useGetMaterialArray();

  const [materialArray, setMaterialArray] = useState<SheetMaterial[] | null>(null);

  useEffect(() => {
    const executeGetMaterialArray = async () => {
      if (materialArrayCache.length) {
        setMaterialArray(materialArrayCache);
      } else {
        const _materialArray = await getMaterialArray();
        setMaterialArray(_materialArray);

        // Save it to cache
        if (_materialArray) {
          materialArrayCache = _materialArray;
        }
      }
    };

    executeGetMaterialArray();
  }, [getMaterialArray]);

  return materialArray;
}
