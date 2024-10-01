import { MenuItem } from 'primeng/api';
import {
  combineLatest,
  Observable,
  ReplaySubject,
  Subject,
  switchMap,
} from 'rxjs';

import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationStoreService } from '@app/api/core/application';
import { AuthorizationService } from '@app/api/core/authorization';

import { TopBarParams } from '../../api';
import { NetworkPlayerStoreService } from '@app/api/domain/network-player';
import { User } from '@app/api/common';
import { SportNetworkStoreService } from '@app/api/domain/sport-network';
import { SportEventStoreService } from '@app/api/domain/sport-event';

@Injectable()
export class TopBarService {
  private applicationStoreService = inject(ApplicationStoreService);
  private authorizationService = inject(AuthorizationService);
  private networkPlayerStoreService = inject(NetworkPlayerStoreService);
  private sportNetworkStoreService = inject(SportNetworkStoreService);
  private sportEventStoreService = inject(SportEventStoreService);
  private router = inject(Router);

  private params!: TopBarParams;
  private params$$: Subject<TopBarParams>;

  constructor(
  ) {
    this.params$$ = new ReplaySubject();
  }

  public createMenuItems(): MenuItem[] {
    return [];
  }

  logoClickHandler(): void {
    this.applicationStoreService.dispatchLogin();
    this.router.navigate(['/']);
  }

  public imgClickHandler(): void {
    this.router.navigate(['/']);
  }

  public init$(): Observable<TopBarParams> {
    return combineLatest([
      this.applicationStoreService.selectAuthenticatedUser$(),
    ]).pipe(
      switchMap(([user]) => {
        this.params = this.updateParams(this.params, user);

        this.params$$.next(this.params);

        return this.params$$;
      })
    );
  }

  public login(): void {
    this.applicationStoreService.dispatchLogin();
  }

  public logout(): void {
    this.applicationStoreService.dispatchLogout();
    this.authorizationService.removeAll();
    this.networkPlayerStoreService.dispatchResetAction();
    this.sportNetworkStoreService.dispatchResetAction();
    this.sportEventStoreService.dispatchResetAction();
    this.router.navigate(['/home']);
  }

  private updateParams(params: TopBarParams, user: User | null): TopBarParams {
    let newParams: TopBarParams;

    if (!params) {
      newParams = {
        addPagePermissions: [],
        editPagePermissions: [],
        isAuthenticated: !!user,
        menuItems: this.createMenuItems(),
        user,
      };
    } else {
      params.user = user;
      params.menuItems = this.createMenuItems();
      newParams = params;
    }

    return newParams;
  }
}
