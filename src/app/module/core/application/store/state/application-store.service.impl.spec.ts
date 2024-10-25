import { TestBed } from '@angular/core/testing';

import { ApplicationStoreServiceImpl } from './application-store.service.impl';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('ApplicationStoreServiceImpl', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [provideExperimentalZonelessChangeDetection()],
    })
  );

  it('should be created', () => {
    const service: ApplicationStoreServiceImpl = TestBed.inject(
      ApplicationStoreServiceImpl
    );

    expect(service).toBeTruthy();
  });
});
