import { TestBed } from '@angular/core/testing';

import { FirestoreDataEngine } from './firestore-data.engine';

describe('FirestoreDataEngine', () => {
  let service: FirestoreDataEngine;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreDataEngine);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
