import { TestBed } from '@angular/core/testing';

import { SportPlayerDataServiceImpl } from './sport-player-data.service.impl';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

jest.mock('@app/engine', () => {
  return {
    FirestoreDataEngine: jest.fn(),
  };
});
describe('SportPlayerDataServiceImpl', () => {
  let service: SportPlayerDataServiceImpl;
  let firestoreMock;
  let firestoreDataEngineMock;

  beforeEach(() => {
    firestoreDataEngineMock = {};
    firestoreMock = {};

    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        SportPlayerDataServiceImpl,
        { provide: Firestore, useValue: firestoreMock },
      ],
    });

    service = TestBed.inject(SportPlayerDataServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
