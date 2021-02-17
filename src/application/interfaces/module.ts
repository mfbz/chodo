import { BehaviorSubject } from 'rxjs';

export interface Module {
  name: string;
  noConnectionSubject: BehaviorSubject<boolean>;
}
