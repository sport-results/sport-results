import { TestBed } from '@angular/core/testing';

import { UserEffectServiceImpl } from './user-effect.service.impl';
import {
  SportNetworkStoreService,
  SportNetworkUtilService,
} from '@app/api/domain/sport-network';
import { UserDataService, UserUtilService } from '@app/api/domain/user';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

jest.mock('@app/engine', () => {
  return {
    FirestoreDataEngine: jest.fn(),
  };
});

describe('UserEffectServiceImpl', () => {
  let userEffectService: UserEffectServiceImpl;
  let sportNetworkStoreService;
  let sportNetworkUtilService;
  let userDataService;
  let userUtilService;

  beforeEach(() => {
    sportNetworkStoreService = {};
    sportNetworkUtilService = {};
    userDataService = {};
    userUtilService = {};

    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        UserEffectServiceImpl,
        {
          provide: SportNetworkStoreService,
          useValue: sportNetworkStoreService,
        },
        {
          provide: SportNetworkUtilService,
          useValue: sportNetworkUtilService,
        },
        {
          provide: UserDataService,
          useValue: userDataService,
        },
        {
          provide: UserUtilService,
          useValue: userUtilService,
        },
      ],
    });
  });

  it('should be created', () => {
    userEffectService = TestBed.inject(UserEffectServiceImpl);

    expect(userEffectService).toBeTruthy();
  });
});
