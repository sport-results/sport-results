import { catchError, map, of, switchMap } from 'rxjs';

import { inject, Injectable } from '@angular/core';
import {
    PERMISSION_FEATURE_KEY,
    PermissionEffectService
} from '@app/api/domain/permission';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as permissionActions from './permission.actions';

@Injectable()
export class PermissionEffects {
    private actions$ = inject(Actions);
    private permissionEffectService = inject(PermissionEffectService);

    addEntity$ = createEffect(() =>
        this.actions$.pipe(
            ofType(permissionActions.addEntity),
            switchMap((action) =>
                this.permissionEffectService.addEntity$(
                    action.permission,
                    `${PERMISSION_FEATURE_KEY}/${action.parentEntityId}`
                ).pipe(
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
    
    updateEntity$ = createEffect(() =>
        this.actions$.pipe(
            ofType(permissionActions.updateEntity),
            switchMap((action) =>
                this.permissionEffectService.updateEntity$(
                    action.permission,
                    action.subCollectionPath
                ).pipe(
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
