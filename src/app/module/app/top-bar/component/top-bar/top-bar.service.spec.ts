import { TestBed } from '@angular/core/testing';

import { TopBarService } from './top-bar.service';
import { ApplicationStoreService } from '@app/api/core/application';
import { AuthorizationService } from '@app/api/core/authorization';
import { NetworkPlayerStoreService } from '@app/api/domain/network-player';
import { SportNetworkStoreService } from '@app/api/domain/sport-network';
import { SportEventStoreService } from '@app/api/domain/sport-event';
import { PermissionStoreService } from '@app/api/domain/permission';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('TopBarService', () => {
  let service: TopBarService;
  let applicationStoreServiceMock: unknown;
  let authorizationServiceMock: unknown;
  let networkPlayerStoreServiceMock: unknown;
  let sportNetworkStoreService: unknown;
  let sportEventStoreService: unknown;
  let permissionStoreService: unknown;

  beforeEach(() => {
    applicationStoreServiceMock = {};
    authorizationServiceMock = {};
    networkPlayerStoreServiceMock = {};
    sportNetworkStoreService = {};
    sportEventStoreService = {};
    permissionStoreService = {};
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        TopBarService,
        {
          provide: ApplicationStoreService,
          value: applicationStoreServiceMock,
        },
        {
          provide: AuthorizationService,
          value: authorizationServiceMock,
        },
        {
          provide: NetworkPlayerStoreService,
          value: networkPlayerStoreServiceMock,
        },
        {
          provide: SportNetworkStoreService,
          value: sportNetworkStoreService,
        },
        {
          provide: SportEventStoreService,
          value: sportEventStoreService,
        },
        {
          provide: PermissionStoreService,
          value: permissionStoreService,
        },
      ],
    });
    service = TestBed.inject(TopBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
