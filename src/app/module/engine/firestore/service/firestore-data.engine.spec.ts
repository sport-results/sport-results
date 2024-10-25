import { TestBed } from '@angular/core/testing';

import { FirestoreDataEngine } from './firestore-data.engine';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('FirestoreDataEngine', () => {
  let service: FirestoreDataEngine;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideExperimentalZonelessChangeDetection()],
    });
    service = TestBed.inject(FirestoreDataEngine);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
