import { TestBed } from '@angular/core/testing';

import { RoleDataServiceImpl } from './role-data.service.impl';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

jest.mock('@app/engine', () => {
  return {
    FirestoreDataEngine: jest.fn(),
  };
});

describe('RoleDataServiceImpl', () => {
  let service: RoleDataServiceImpl;
  let firestoreMock;
  let firestoreDataEngineMock;

  beforeEach(() => {
    firestoreDataEngineMock = {};
    firestoreMock = {};

    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        RoleDataServiceImpl,
        { provide: Firestore, useValue: firestoreMock },
      ],
    });

    service = TestBed.inject(RoleDataServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
