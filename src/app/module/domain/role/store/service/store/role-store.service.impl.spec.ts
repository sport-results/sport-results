import { TestBed } from '@angular/core/testing';

import { RoleStoreServiceImpl } from './role-store.service.impl';
import { Firestore } from '@angular/fire/firestore';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

jest.mock('@app/engine', () => {
  return {
    FirestoreDataEngine: jest.fn(),
  };
});

describe('RoleStoreServiceImpl', () => {
  let roleStoreService: RoleStoreServiceImpl;
  let firestoreMock;
  let firestoreDataEngineMock;

  beforeEach(() => {
    firestoreDataEngineMock = {};
    firestoreMock = {};
    TestBed.configureTestingModule({
      providers: [
        RoleStoreServiceImpl,
        provideMockStore(),
        { provide: Firestore, useValue: firestoreMock },
      ],
    });
  });

  it('should be created', () => {
    roleStoreService = TestBed.inject(RoleStoreServiceImpl);

    expect(roleStoreService).toBeTruthy();
  });
});
