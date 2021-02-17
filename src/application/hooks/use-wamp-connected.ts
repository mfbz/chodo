import { useEffect, useState } from 'react';
import { useNoConnectionSubject } from './use-no-connection-subject';
import { Subscription } from 'rxjs';

export function useWampConnected() {
  const noConnectionSubject = useNoConnectionSubject();
  const [wampConnected, setWampConnected] = useState(false);

  useEffect(() => {
    let subscription: Subscription;

    if (noConnectionSubject) {
      subscription = noConnectionSubject.subscribe(notConnected => setWampConnected(!notConnected));
    }

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [noConnectionSubject]);

  return wampConnected;
}
