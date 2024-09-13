import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { User } from '@app/api/common';
import { ApplicationStoreService } from '@app/api/core/application';
import { select, Store } from '@ngrx/store';

import * as applicationActions from './application.actions';
import { ApplicationPartialState } from './application.reducer';
import * as applicationSelectors from './application.selectors';

@Injectable()
export class ApplicationStoreServiceImpl extends ApplicationStoreService {
  public constructor(private store: Store<ApplicationPartialState>) {
    super();
  }

  public dispatchAuthenticated(user: User): void {
    this.store.dispatch(applicationActions.authenticated({ user }));
  }

  public dispatchGetUser(): void {
    this.store.dispatch(applicationActions.getUser());
  }

  public dispatchLogin(): void {
    this.store.dispatch(applicationActions.login());
  }

  public dispatchLogout(): void {
    this.store.dispatch(applicationActions.logout());
  }

  public dispatchSetCheckpointId(checkpointId: number): void {
    this.store.dispatch(applicationActions.setCheckpointId({ checkpointId }));
  }

  public dispatchTestLogin(user: User): void {
    this.store.dispatch(applicationActions.testLogin({ user }));
  }

  public selectAuthenticatedUser$(): Observable<User | null> {
    return this.store.pipe(
      select(applicationSelectors.selectAuthenticatedUser)
    );
  }

  public selectCheckpointId$(): Observable<number> {
    return this.store.pipe(select(applicationSelectors.selectCheckpointId));
  }

  public selectIsAuthenticated$(): Observable<boolean> {
    return this.store.pipe(select(applicationSelectors.selectIsAuthenticated));
  }
}
