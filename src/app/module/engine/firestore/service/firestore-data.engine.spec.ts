import { TestBed } from '@angular/core/testing';

import { FirestoreDataEngine } from './firestore-data.engine';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FirestoreDataUtil } from './firestore-data.util';

describe('FirestoreDataEngine', () => {
  let service: FirestoreDataEngine;
  let firestoreMock;
  let firestoreDataUtilMock: unknown;

  beforeEach(() => {
    firestoreMock = {};
    firestoreDataUtilMock = {
      createCollectionReference: () => ({})
    };

    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        { provide: Firestore, useValue: firestoreMock },
        { provide: FirestoreDataUtil, useValue: firestoreDataUtilMock },
      ],
    });
    const firestore = TestBed.inject(Firestore);
    const firestoreDataUtil = TestBed.inject(FirestoreDataUtil);

    service = new FirestoreDataEngine(firestore, 'test', firestoreDataUtil);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
