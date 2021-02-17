import React from 'react';
import { BehaviorSubject } from 'rxjs';

const modalSubject = new BehaviorSubject<React.ReactElement | null>(null);

export function setModalComponent(modal: React.ReactElement | null) {
  modalSubject.next(modal);
}

export function getModalComponent$() {
  return modalSubject.asObservable();
}
