import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { inject, Injectable } from '@angular/core';
import { ActionEnum } from '@app/api/common';
import { ApplicationStoreService } from '@app/api/core/application';
import { AuthorizationService } from '@app/api/core/authorization';
import { RoleEntity } from '@app/api/domain/role';
import { UserEffectService } from '@app/api/domain/user';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as userActions from './user.actions';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private authenticationService = inject(ApplicationStoreService);
  private authorizationService = inject(AuthorizationService);
  private userEffectService = inject(UserEffectService);

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.addEntity),
      switchMap((action) =>
        this.userEffectService.addEntity$(action.user).pipe(
          map((entity) =>
            userActions.addEntitySuccess({
              user: entity,
            })
          )
        )
      )
    )
  );
  listUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.listEntities),
      switchMap((action) =>
        this.userEffectService
          .listEntities$(
            action.subCollectionPath,
            action.pathParams,
            action.queryParams
          )
          .pipe(
            map((users) => {
              return userActions.listEntitiesSuccess({
                users,
              });
            })
          )
      )
    )
  );
  loadExistedUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loadExistedUser),
      switchMap((action) =>
        this.userEffectService.loadExistedUser$(action.user).pipe(
          map((user) => {
            this.authorizationService.addRoles(user.roles as RoleEntity[]);
            this.authorizationService.addPermission(
              `${ActionEnum.SOME}${user.uid}`
            );
            this.authenticationService.dispatchAuthenticated(user);
            return userActions.loadExistedUserSuccess({
              user,
            });
          }),
          catchError((error) => {
            return of(userActions.loadExistedUserFail({ error }));
          })
        )
      )
    )
  );
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loadEntity),
      switchMap((action) =>
        this.userEffectService.loadEntity$(action.uid).pipe(
          map((user) =>
            userActions.loadEntitySuccess({
              user,
            })
          )
        )
      )
    )
  );
  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.updateEntity),
      switchMap((action) =>
        this.userEffectService.updateEntity$(action.user).pipe(
          map((userEntity) =>
            userActions.updateEntitySuccess({
              user: {
                changes: { ...userEntity },
                id: userEntity && userEntity.uid,
              },
            })
          ),
          catchError((error) => {
            return of(userActions.updateEntityFail({ error }));
          })
        )
      )
    )
  );
}
