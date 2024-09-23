import { catchError, map, of, switchMap } from 'rxjs';

import { inject, Injectable } from '@angular/core';
import {
  SPORT_NETWORK_FEATURE_KEY,
  SportNetworkEffectService,
} from '@app/api/domain/sport-network';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as sportNetworkActions from './sport-network.actions';

@Injectable()
export class SportNetworkEffects {
  private actions$ = inject(Actions);
  private sportNetworkEffectService = inject(SportNetworkEffectService);

  addEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sportNetworkActions.addEntity),
      switchMap((action) =>
        this.sportNetworkEffectService
          .addEntity$(
            action.sportNetwork,
            action.subCollectionPath
          )
          .pipe(
            map((entity) =>
              sportNetworkActions.addEntitySuccess({
                sportNetwork: entity,
              })
            ),
            catchError((error) => {
              return of(sportNetworkActions.listEntitiesFail({ error }));
            })
          )
      )
    )
  );
  listEntities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sportNetworkActions.listEntities),
      switchMap((action) =>
        this.sportNetworkEffectService
          .listEntities$(
            action.subCollectionPath,
            action.pathParams,
            action.queryParams
          )
          .pipe(
            map((entities) => {
              return sportNetworkActions.listEntitiesSuccess({
                sportNetworks: entities,
              });
            }),
            catchError((error) => {
              return of(sportNetworkActions.listEntitiesFail({ error }));
            })
          )
      )
    )
  );
  loadEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sportNetworkActions.loadEntity),
      switchMap((action) =>
        this.sportNetworkEffectService.loadEntity$(action.uid).pipe(
          map((entity) =>
            sportNetworkActions.loadEntitySuccess({
              sportNetwork: entity,
            })
          ),
          catchError((error) => {
            return of(sportNetworkActions.loadEntityFail({ error }));
          })
        )
      )
    )
  );

  updateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sportNetworkActions.updateEntity),
      switchMap((action) =>
        this.sportNetworkEffectService
          .updateEntity$(action.sportNetwork, action.subCollectionPath)
          .pipe(
            map((entity) =>
              sportNetworkActions.updateEntitySuccess({
                sportNetwork: {
                  changes: { ...entity },
                  id: entity && entity.uid,
                },
              })
            ),
            catchError((error) => {
              return of(sportNetworkActions.updateEntityFail({ error }));
            })
          )
      )
    )
  );
}
