import { catchError, map, of, switchMap } from 'rxjs';

import { inject, Injectable } from '@angular/core';
import {
    SPORT_EVENT_FEATURE_KEY,
    SportEventEffectService
} from '@app/api/domain/sport-event';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as sportEventActions from './sport-event.actions';

@Injectable()
export class SportEventEffects {
    private actions$ = inject(Actions);
    private sportEventEffectService = inject(SportEventEffectService);

    addEntity$ = createEffect(() =>
        this.actions$.pipe(
            ofType(sportEventActions.addEntity),
            switchMap((action) =>
                this.sportEventEffectService.addEntity$(
                    action.sportEvent,
                    `${SPORT_EVENT_FEATURE_KEY}/${action.parentEntityId}`
                ).pipe(
                    map((entity) =>
                        sportEventActions.addEntitySuccess({
                            sportEvent: entity,
                        })
                    )
                )
            )
        )
    );
    listEntities$ = createEffect(() =>
        this.actions$.pipe(
            ofType(sportEventActions.listEntities),
            switchMap((action) =>
                this.sportEventEffectService
                    .listEntities$(
                        action.subCollectionPath,
                        action.pathParams,
                        action.queryParams
                    )
                    .pipe(
                        map((entities) => {
                            return sportEventActions.listEntitiesSuccess({
                                sportEvents: entities,
                            });
                        })
                    )
            )
        )
    );
    loadEntity$ = createEffect(() =>
        this.actions$.pipe(
            ofType(sportEventActions.loadEntity),
            switchMap((action) =>
                this.sportEventEffectService.loadEntity$(action.uid).pipe(
                    map((entity) =>
                        sportEventActions.loadEntitySuccess({
                            sportEvent: entity,
                        })
                    )
                )
            )
        )
    );
    
    updateEntity$ = createEffect(() =>
        this.actions$.pipe(
            ofType(sportEventActions.updateEntity),
            switchMap((action) =>
                this.sportEventEffectService.updateEntity$(
                    action.sportEvent,
                    action.subCollectionPath
                ).pipe(
                    map((entity) =>
                        sportEventActions.updateEntitySuccess({
                            sportEvent: {
                                changes: { ...entity },
                                id: entity && entity.uid,
                            },
                        })
                    ),
                    catchError((error) => {
                        return of(sportEventActions.updateEntityFail({ error }));
                    })
                )
            )
        )
    );
}
