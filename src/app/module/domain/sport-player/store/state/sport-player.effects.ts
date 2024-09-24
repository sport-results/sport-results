import { catchError, map, of, switchMap } from 'rxjs';

import { inject, Injectable } from '@angular/core';
import {
  SPORT_PLAYER_FEATURE_KEY,
  SportPlayerEffectService,
} from '@app/api/domain/sport-player';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as sportPlayerActions from './sport-player.actions';

@Injectable()
export class SportPlayerEffects {
  private actions$ = inject(Actions);
  private sportPlayerEffectService = inject(SportPlayerEffectService);

  addEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sportPlayerActions.addEntity),
      switchMap((action) => {
        const subCollectionPath = action.parentEntityId
          ? `${SPORT_PLAYER_FEATURE_KEY}/${action.parentEntityId}`
          : undefined;
        return this.sportPlayerEffectService
          .addEntity$(action.sportPlayer, subCollectionPath)
          .pipe(
            map((entity) =>
              sportPlayerActions.addEntitySuccess({
                sportPlayer: entity,
              })
            )
          );
      })
    )
  );
  listEntities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sportPlayerActions.listEntities),
      switchMap((action) =>
        this.sportPlayerEffectService
          .listEntities$(
            action.subCollectionPath,
            action.pathParams,
            action.queryParams
          )
          .pipe(
            map((entities) => {
              return sportPlayerActions.listEntitiesSuccess({
                sportPlayers: entities,
              });
            })
          )
      )
    )
  );
  loadEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sportPlayerActions.loadEntity),
      switchMap((action) =>
        this.sportPlayerEffectService.loadEntity$(action.uid).pipe(
          map((entity) =>
            sportPlayerActions.loadEntitySuccess({
              sportPlayer: entity,
            })
          )
        )
      )
    )
  );

  updateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sportPlayerActions.updateEntity),
      switchMap((action) =>
        this.sportPlayerEffectService
          .updateEntity$(action.sportPlayer, action.subCollectionPath)
          .pipe(
            map((entity) =>
              sportPlayerActions.updateEntitySuccess({
                sportPlayer: {
                  changes: { ...entity },
                  id: entity && entity.uid,
                },
              })
            ),
            catchError((error) => {
              return of(sportPlayerActions.updateEntityFail({ error }));
            })
          )
      )
    )
  );
}
