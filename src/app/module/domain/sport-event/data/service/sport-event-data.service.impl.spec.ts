import { TestBed } from '@angular/core/testing';

import { SportEventDataServiceImpl } from './sport-event-data.service.impl';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

jest.mock('@app/engine', () => {
  return {
    FirestoreDataEngine: jest.fn(),
  };
});

describe('SportEventDataServiceImpl', () => {
  let service: SportEventDataServiceImpl;
  let firestoreMock;
  let firestoreDataEngineMock;

  beforeEach(() => {
    firestoreDataEngineMock = {};
    firestoreMock = {};

    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        SportEventDataServiceImpl,
        { provide: Firestore, useValue: firestoreMock },
      ],
    });

    service = TestBed.inject(SportEventDataServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
