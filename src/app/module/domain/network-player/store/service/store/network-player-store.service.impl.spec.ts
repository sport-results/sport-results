import { TestBed } from '@angular/core/testing';

import { NetworkPlayerStoreServiceImpl } from './network-player-store.service.impl';
import { Firestore } from '@angular/fire/firestore';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

jest.mock('@app/engine', () => {
  return {
    FirestoreDataEngine: jest.fn(),
  };
});

describe('NetworkPlayerStoreServiceImpl', () => {
  let userStoreService: NetworkPlayerStoreServiceImpl;
  let firestoreMock;
  let firestoreDataEngineMock;

  beforeEach(() => {
    firestoreDataEngineMock = {};
    firestoreMock = {};
    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        NetworkPlayerStoreServiceImpl,
        provideMockStore(),
        { provide: Firestore, useValue: firestoreMock },
      ],
    });
  });

  it('should be created', () => {
    userStoreService = TestBed.inject(NetworkPlayerStoreServiceImpl);

    expect(userStoreService).toBeTruthy();
  });
});
