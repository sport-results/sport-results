import { catchError, map, of, switchMap } from 'rxjs';

import { inject, Injectable } from '@angular/core';
import {
  PermissionEffectService,
} from '@app/api/domain/permission';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as permissionActions from './permission.actions';
import { AuthorizationService } from '@app/api/core/authorization';

@Injectable()
export class PermissionEffects {
  private actions$ = inject(Actions);
  private authorizationService = inject(AuthorizationService);
  private permissionEffectService = inject(PermissionEffectService);

  addEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(permissionActions.addEntity),
      switchMap((action) =>
        this.permissionEffectService
          .addEntity$(action.permission, action.subCollectionPath)
          .pipe(
            map((entity) =>
              permissionActions.addEntitySuccess({
                permission: entity,
              })
            )
          )
      )
    )
  );

  listEntities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(permissionActions.listEntities),
      switchMap((action) =>
        this.permissionEffectService
          .listEntities$(
            action.subCollectionPath,
            action.pathParams,
            action.queryParams
          )
          .pipe(
            map((entities) => {
              return permissionActions.listEntitiesSuccess({
                permissions: entities,
              });
            })
          )
      )
    )
  );

  loadEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(permissionActions.loadEntity),
      switchMap((action) =>
        this.permissionEffectService.loadEntity$(action.uid).pipe(
          map((entity) =>
            permissionActions.loadEntitySuccess({
              permission: entity,
            })
          )
        )
      )
    )
  );

  searchEntitiesByCollectionGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(permissionActions.searchEntitiesByCollectionGroup),
      switchMap((action) =>
        this.permissionEffectService
          .searchEntitiesByCollectionGroup$(action.searchParams)
          .pipe(
            map((permissions) => {
              this.authorizationService.addUserPermissions(permissions);
              return permissionActions.searchEntitiesByCollectionGroupSuccess({
                permissions,
              });
            }),
            catchError((error) => {
              return of(
                permissionActions.searchEntitiesByCollectionGroupFail({ error })
              );
            })
          )
      )
    )
  );

  updateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(permissionActions.updateEntity),
      switchMap((action) =>
        this.permissionEffectService
          .updateEntity$(action.permission, action.subCollectionPath)
          .pipe(
            map((entity) =>
              permissionActions.updateEntitySuccess({
                permission: {
                  changes: { ...entity },
                  id: entity && entity.uid,
                },
              })
            ),
            catchError((error) => {
              return of(permissionActions.updateEntityFail({ error }));
            })
          )
      )
    )
  );
}
