import jwtDecode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user';

const currentUserSubject = new BehaviorSubject<User | null>(null);

export function setCurrentUserToken(user: null | string) {
  if (user) {
    const userObj = jwtDecode(user);
    currentUserSubject.next(userObj as User);
  } else {
    currentUserSubject.next(null);
  }
}

export function getCurrentUser() {
  return currentUserSubject.value;
}

export function getCurrentUser$() {
  return currentUserSubject.asObservable();
}
