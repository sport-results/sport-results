import { TestBed } from '@angular/core/testing';

import { UserStoreServiceImpl } from './user-store.service.impl';
import { Firestore } from '@angular/fire/firestore';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

jest.mock('@app/engine', () => {
  return {
    FirestoreDataEngine: jest.fn(),
  };
});

describe('UserStoreServiceImpl', () => {
  let userStoreService: UserStoreServiceImpl;
  let firestoreMock;
  let firestoreDataEngineMock;

  beforeEach(() => {
    firestoreDataEngineMock = {};
    firestoreMock = {};
    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        UserStoreServiceImpl,
        provideMockStore(),
        { provide: Firestore, useValue: firestoreMock },
      ],
    });
  });

  it('should be created', () => {
    userStoreService = TestBed.inject(UserStoreServiceImpl);

    expect(userStoreService).toBeTruthy();
  });
});
