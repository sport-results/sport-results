import { TestBed } from '@angular/core/testing';

import { UserDataServiceImpl } from './user-data.service.impl';
import { Firestore } from '@angular/fire/firestore';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

jest.mock('@app/engine', () => {
  return {
    FirestoreDataEngine: jest.fn(),
  };
});

describe('UserDataServiceImpl', () => {
  let userDataService: UserDataServiceImpl;
  let firestoreMock;
  let firestoreDataEngineMock;

  beforeEach(() => {
    firestoreDataEngineMock = {};
    firestoreMock = {};
    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        UserDataServiceImpl,
        { provide: Firestore, useValue: firestoreMock },
      ],
    });
  });

  it('should be created', () => {
    userDataService = TestBed.inject(UserDataServiceImpl);

    expect(userDataService).toBeTruthy();
  });
});
