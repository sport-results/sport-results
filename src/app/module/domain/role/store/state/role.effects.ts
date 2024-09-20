import { catchError, map, of, switchMap } from 'rxjs';

import { inject, Injectable } from '@angular/core';
import { RoleEffectService } from '@app/api/domain/role';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as roleActions from './role.actions';

@Injectable()
export class RoleEffects {
  private actions$ = inject(Actions);
  private roleEffectService = inject(RoleEffectService);

  addRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(roleActions.addEntity),
      switchMap((action) =>
        this.roleEffectService.addEntity$(action.role).pipe(
          map((entity) =>
            roleActions.addEntitySuccess({
              role: entity,
            })
          )
        )
      )
    )
  );
  listRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(roleActions.listEntities),
      switchMap((action) =>
        this.roleEffectService
          .listEntities$(action.subCollectionPath, action.pathParams, action.queryParams)
          .pipe(
            map((roles) => {
              return roleActions.listEntitiesSuccess({
                roles,
              });
            })
          )
      )
    )
  );
  loadRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(roleActions.loadEntity),
      switchMap((action) =>
        this.roleEffectService.loadEntity$(action.uid).pipe(
          map((role) =>
            roleActions.loadEntitySuccess({
              role,
            })
          )
        )
      )
    )
  );
  updateRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(roleActions.updateEntity),
      switchMap((action) =>
        this.roleEffectService.updateEntity$(action.role).pipe(
          map((roleEntity) =>
            roleActions.updateEntitySuccess({
              role: {
                changes: { ...roleEntity },
                id: roleEntity && roleEntity.uid,
              },
            })
          ),
          catchError((error) => {
            return of(roleActions.updateEntityFail({ error }));
          })
        )
      )
    )
  );
}
