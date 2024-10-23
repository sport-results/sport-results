import { TestBed } from '@angular/core/testing';

import { PermissionStoreServiceImpl } from './permission-store.service.impl';
import { Firestore } from '@angular/fire/firestore';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

jest.mock('@app/engine', () => {
  return {
    FirestoreDataEngine: jest.fn(),
  };
});

describe('PermissionStoreServiceImpl', () => {
  let permissionStoreService: PermissionStoreServiceImpl;
  let firestoreMock;
  let firestoreDataEngineMock;

  beforeEach(() => {
    firestoreDataEngineMock = {};
    firestoreMock = {};
    TestBed.configureTestingModule({
      providers: [
        PermissionStoreServiceImpl,
        provideMockStore(),
        { provide: Firestore, useValue: firestoreMock },
      ],
    });
  });

  it('should be created', () => {
    permissionStoreService = TestBed.inject(PermissionStoreServiceImpl);

    expect(permissionStoreService).toBeTruthy();
  });
});
