import { catchError, from, map, mergeMap, of, switchMap } from 'rxjs';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from '@angular/fire/auth';

import { inject, Injectable } from '@angular/core';
import { RoleNamesEnum } from '@app/api/common';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as applicationActions from './application.actions';
import { UserEntity, UserStoreService } from '../../../../../api/domain/user';
import {
  SportNetworkStoreService,
  SportNetworkUtilService,
} from '@app/api/domain/sport-network';

@Injectable()
export class ApplicationEffects {
  private actions$ = inject(Actions);
  private auth = inject(Auth);
  private userStoreService = inject(UserStoreService);
  private provider = new GoogleAuthProvider();

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
                name: RoleNamesEnum.USER,
                permissions: [RoleNamesEnum.USER],
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

  private getTokenFromLogin(result: UserCredential) {
    // This gives you a Google Access Token.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    console.log('token', token);
    return token;
  }

  private async googleLogin(): Promise<unknown> {
    const result = await signInWithPopup(this.auth, this.provider);

    // The signed-in user info.
    const user = result.user;
    console.log('googleLogin user', user);
    this.getTokenFromLogin(result);
    return result;
  }
}
