import { TestBed } from '@angular/core/testing';

import { SportNetworkDataServiceImpl } from './sport-network-data.service.impl';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

jest.mock('@app/engine', () => {
  return {
    FirestoreDataEngine: jest.fn(),
  };
});
describe('SportNetworkDataServiceImpl', () => {
  let service: SportNetworkDataServiceImpl;
  let firestoreMock;
  let firestoreDataEngineMock;

  beforeEach(() => {
    firestoreDataEngineMock = {};
    firestoreMock = {};

    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        SportNetworkDataServiceImpl,
        { provide: Firestore, useValue: firestoreMock },
      ],
    });

    service = TestBed.inject(SportNetworkDataServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
