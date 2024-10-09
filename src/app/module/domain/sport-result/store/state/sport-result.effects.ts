import { catchError, map, of, switchMap } from 'rxjs';

import { inject, Injectable } from '@angular/core';
import {
    SPORT_RESULT_FEATURE_KEY,
    SportResultEffectService
} from '@app/api/domain/sport-result';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as sportResultActions from './sport-result.actions';

@Injectable()
export class SportResultEffects {
    private actions$ = inject(Actions);
    private sportResultEffectService = inject(SportResultEffectService);

    addEntity$ = createEffect(() =>
        this.actions$.pipe(
            ofType(sportResultActions.addEntity),
            switchMap((action) =>
                this.sportResultEffectService.addEntity$(
                    action.sportResult,
                    `${SPORT_RESULT_FEATURE_KEY}/${action.parentEntityId}`
                ).pipe(
                    map((entity) =>
                        sportResultActions.addEntitySuccess({
                            sportResult: entity,
                        })
                    )
                )
            )
        )
    );
    listEntities$ = createEffect(() =>
        this.actions$.pipe(
            ofType(sportResultActions.listEntities),
            switchMap((action) =>
                this.sportResultEffectService
                    .listEntities$(
                        action.subCollectionPath,
                        action.pathParams,
                        action.queryParams
                    )
                    .pipe(
                        map((entities) => {
                            return sportResultActions.listEntitiesSuccess({
                                sportResults: entities,
                            });
                        })
                    )
            )
        )
    );
    loadEntity$ = createEffect(() =>
        this.actions$.pipe(
            ofType(sportResultActions.loadEntity),
            switchMap((action) =>
                this.sportResultEffectService.loadEntity$(action.uid).pipe(
                    map((entity) =>
                        sportResultActions.loadEntitySuccess({
                            sportResult: entity,
                        })
                    )
                )
            )
        )
    );
    
    updateEntity$ = createEffect(() =>
        this.actions$.pipe(
            ofType(sportResultActions.updateEntity),
            switchMap((action) =>
                this.sportResultEffectService.updateEntity$(
                    action.sportResult,
                    action.subCollectionPath
                ).pipe(
                    map((entity) =>
                        sportResultActions.updateEntitySuccess({
                            sportResult: {
                                changes: { ...entity },
                                id: entity && entity.uid,
                            },
                        })
                    ),
                    catchError((error) => {
                        return of(sportResultActions.updateEntityFail({ error }));
                    })
                )
            )
        )
    );
}
