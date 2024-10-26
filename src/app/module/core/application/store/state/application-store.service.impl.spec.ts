import { TestBed } from '@angular/core/testing';

import { ApplicationStoreServiceImpl } from './application-store.service.impl';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';

describe('ApplicationStoreServiceImpl', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        ApplicationStoreServiceImpl,
        provideMockStore()
      ],
    })
  );

  it('should be created', () => {
    const service: ApplicationStoreServiceImpl = TestBed.inject(
      ApplicationStoreServiceImpl
    );

    expect(service).toBeTruthy();
  });
});
