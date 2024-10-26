import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SportCategoryRuleDataServiceImpl } from './sport-category-rule-data.service.impl';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

jest.mock('@app/engine', () => {
  return {
    FirestoreDataEngine: jest.fn(),
  };
});

describe('SportCategoryRuleDataServiceImpl', () => {
  let service: SportCategoryRuleDataServiceImpl;
  let firestoreMock;
  let firestoreDataEngineMock;

  beforeEach(() => {
    firestoreDataEngineMock = {};
    firestoreMock = {};

    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        SportCategoryRuleDataServiceImpl,
        { provide: Firestore, useValue: firestoreMock },
      ],
    });

    service = TestBed.inject(SportCategoryRuleDataServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
