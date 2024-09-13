import { MenuItem } from 'primeng/api';
import {
  combineLatest,
  Observable,
  ReplaySubject,
  Subject,
  switchMap,
} from 'rxjs';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RoleNames, User } from '@app/api/common';
import { ApplicationStoreService } from '@app/api/core/application';
import { AuthorizationService } from '@app/api/core/authorization';

import { TopBarParams } from '../../api';

@Injectable()
export class TopBarService {
  private params!: TopBarParams;
  private params$$: Subject<TopBarParams>;

  constructor(
    private applicationStoreService: ApplicationStoreService,
    private authorizationService: AuthorizationService,
    private router: Router,
  ) {
    this.params$$ = new ReplaySubject();
  }

  public createMenuItems(): MenuItem[] {
    return [
      
    ];
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
        this.params = this.updateParams(
          this.params,
          user,
        );

        this.params$$.next(this.params);

        return this.params$$;
      })
    );
  }

  public login(): void {
    this.applicationStoreService.dispatchLogin();
  }

  public testLogin(user: User): void {
    this.applicationStoreService.dispatchTestLogin(user);
    this.router.navigate(['/home']);
  }

  public logout(): void {
    this.authorizationService.removeAll();
    this.applicationStoreService.dispatchLogout();
    this.router.navigate(['/home']);
  }

  private updateParams(
    params: TopBarParams,
    user: User | null,
  ): TopBarParams {
    let newParams: TopBarParams;

    if (!params) {
      newParams = {
        addPagePermissions: [],
        editPagePermissions: [],
        isAuthenticated: !!user,
        menuItems: this.createMenuItems(),
        user,
        users
      };
    } else {
      params.user = user;
      params.menuItems = this.createMenuItems();
      newParams = params;
    }

    return newParams;
  }
}

const users: User[] = [
  {
    id: 'admin',
    email: 'admin@example.com',
    displayName: 'Test Admin',
    roles: [{
      id: 'admin',
      name: RoleNames.ADMIN,
      editable: false,
      permissions: ['ADMIN']
    }]
  },
  {
    id: 'user1',
    email: 'user1@example.com',
    displayName: 'User 1',
    roles: [{
      id: 'user',
      name: RoleNames.USER,
      editable: false,
      permissions: ['USER']
    }]
  },
  {
    id: 'user2',
    email: 'user2@example.com',
    displayName: 'User 2',
    roles: [{
      id: 'user',
      name: RoleNames.USER,
      editable: false,
      permissions: ['USER']
    }]
  },
];
