import { Subject } from 'rxjs';

export function isSubject<T>(subject: any): subject is Subject<T> {
  return !!subject.next;
}
