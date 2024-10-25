import { TestBed } from '@angular/core/testing';

import { AuthorizationServiceImpl } from './authorization.service.impl';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('AuthorizationServiceImpl', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        AuthorizationServiceImpl,
      ],
    })
  );

  it('should be created', () => {
    const service: AuthorizationServiceImpl = TestBed.inject(
      AuthorizationServiceImpl
    );
    expect(service).toBeTruthy();
  });
});
