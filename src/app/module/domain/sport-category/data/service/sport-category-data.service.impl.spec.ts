import { TestBed } from '@angular/core/testing';

import { SportCategoryDataServiceImpl } from './sport-category-data.service.impl';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

jest.mock('@app/engine', () => {
  return {
    FirestoreDataEngine: jest.fn(),
  };
});

describe('SportCategoryDataServiceImpl', () => {
  let service: SportCategoryDataServiceImpl;
  let firestoreMock;
  let firestoreDataEngineMock;

  beforeEach(() => {
    firestoreDataEngineMock = {};
    firestoreMock = {};

    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        SportCategoryDataServiceImpl,
        { provide: Firestore, useValue: firestoreMock },
      ],
    });

    service = TestBed.inject(SportCategoryDataServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
