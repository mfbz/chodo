import { useEffect, useState, useMemo } from 'react';
import { getModalComponent$ } from '../store/modal';

export function useCurrentModal() {
  const [modal, setModal] = useState<React.ReactElement | null>(null);

  useEffect(() => {
    const subscription = getModalComponent$().subscribe(_modal => {
      setModal(_modal);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return modal;
}
