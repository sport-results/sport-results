import { TestBed } from '@angular/core/testing';

import { AuthorizationServiceImpl } from './authorization.service.impl';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';

describe('AuthorizationServiceImpl', () => {
  let permissionsServiceMock: unknown;
  let rolesServiceMock: unknown;

  beforeEach(() => {
    permissionsServiceMock = {};
    rolesServiceMock = {};

    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        AuthorizationServiceImpl,
        {
          provide: NgxPermissionsService,
          useValue: permissionsServiceMock
        },
        {
          provide: NgxRolesService,
          useValue: rolesServiceMock
        }
      ],
    });
  });

  it('should be created', () => {
    const service: AuthorizationServiceImpl = TestBed.inject(
      AuthorizationServiceImpl
    );
    expect(service).toBeTruthy();
  });
});
