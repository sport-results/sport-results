import { TestBed } from '@angular/core/testing';

import { NetworkPlayerDataServiceImpl } from './network-player-data.service.impl';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

jest.mock('@app/engine', () => {
  return {
    FirestoreDataEngine: jest.fn(),
  };
});

describe('NetworkPlayerDataServiceImpl', () => {
  let service: NetworkPlayerDataServiceImpl;
  let firestoreMock;
  let firestoreDataEngineMock;

  beforeEach(() => {
    firestoreDataEngineMock = {};
    firestoreMock = {};

    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        NetworkPlayerDataServiceImpl,
        { provide: Firestore, useValue: firestoreMock },
      ],
    });

    service = TestBed.inject(NetworkPlayerDataServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
