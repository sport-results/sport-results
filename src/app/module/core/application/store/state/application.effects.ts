import { catchError, from, map, mergeMap, of, switchMap } from 'rxjs';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';

import { inject, Injectable } from '@angular/core';
import { RoleNames } from '@app/api/common';
import { ApplicationStoreService } from '@app/api/core/application';
import { AuthorizationService } from '@app/api/core/authorization';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as applicationActions from './application.actions';
import { UserEntity, UserStoreService } from '../../../../../api/domain/user';

@Injectable()
export class ApplicationEffects {
  private actions$ = inject(Actions);
  private applicationStoreService = inject(ApplicationStoreService);
  private auth = inject(Auth);
  private authorizationService$ = inject(AuthorizationService);
  private userStoreService = inject(UserStoreService);

  getAuthenticatedUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(applicationActions.getAuthenticatedUser),
      mergeMap(() => {
        const currentUser = this.auth.currentUser;
        const actions: any[] = [];

        if (currentUser) {
          const user: UserEntity = {
            displayName: currentUser.displayName,
            email: currentUser.email || '',
            meta: {
              creationDate: new Date().toISOString(),
              lastUpdated: new Date().toISOString(),
            },
            firstName: '',
            lastName: '',
            language: 'en',
            phone: '',
            photoURL: currentUser.photoURL,
            roles: [
              {
                uid: '66001',
                editable: false,
                name: RoleNames.USER,
                permissions: [RoleNames.USER],
              },
            ],
            uid: currentUser.uid || '',
          };

          this.userStoreService.dispatchLoadExistedUserAction(user);

          actions.push(
            applicationActions.authenticated({
              user,
            })
          );
        } else {
          actions.push(applicationActions.notAuthenticated());
        }

        return actions;
      }),
      catchError((err) =>
        of(applicationActions.authError({ error: err.message }))
      )
    )
  );

  public login = createEffect(() =>
    this.actions$.pipe(
      ofType(applicationActions.login),
      switchMap(() => {
        return from(this.googleLogin());
      }),
      map(() => {
        return applicationActions.getAuthenticatedUser();
      }),
      catchError((err) => {
        return of(applicationActions.authError({ error: err.message }));
      })
    )
  );
  private googleLogin(): Promise<unknown> {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }
}
