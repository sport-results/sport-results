import { of } from 'rxjs';

import { TestBed } from '@angular/core/testing';
import { ApplicationStoreService } from '@app/api/core/application';
import { RoleDataService } from '@app/api/domain/role';

import { UserUtilServiceImpl } from './user-util.service.impl';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('UserUtilServiceImpl', () => {
  let service: UserUtilServiceImpl;
  let applicationStoreServiceMock;
  let roleDataServiceMock;

  beforeEach(() => {
    applicationStoreServiceMock = {
      selectAuthenticatedUser$: jest.fn(),
    };
    roleDataServiceMock = {
      listByIds$: jest.fn(),
    };

    applicationStoreServiceMock.selectAuthenticatedUser$.mockReturnValueOnce(
      of({})
    );
    roleDataServiceMock.listByIds$.mockReturnValueOnce(of([]));

    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        UserUtilServiceImpl,
        {
          provide: ApplicationStoreService,
          useValue: applicationStoreServiceMock,
        },
        {
          provide: RoleDataService,
          useValue: roleDataServiceMock,
        },
      ],
    });

    service = TestBed.inject(UserUtilServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
