import { catchError, map, of, switchMap } from 'rxjs';

import { inject, Injectable } from '@angular/core';
import {
  NETWORK_PLAYER_FEATURE_KEY,
  NetworkPlayerEffectService,
} from '@app/api/domain/network-player';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as networkPlayerActions from './network-player.actions';

@Injectable()
export class NetworkPlayerEffects {
  private actions$ = inject(Actions);
  private networkPlayerEffectService = inject(NetworkPlayerEffectService);

  addEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(networkPlayerActions.addEntity),
      switchMap((action) =>
        this.networkPlayerEffectService
          .addEntity$(action.networkPlayer, action.subCollectionPath)
          .pipe(
            map((entity) =>
              networkPlayerActions.addEntitySuccess({
                networkPlayer: entity,
              })
            )
          )
      )
    )
  );
  listEntities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(networkPlayerActions.listEntities),
      switchMap((action) =>
        this.networkPlayerEffectService
          .listEntities$(
            action.subCollectionPath,
            action.pathParams,
            action.queryParams
          )
          .pipe(
            map((entities) => {
              return networkPlayerActions.listEntitiesSuccess({
                networkPlayers: entities,
              });
            }),
            catchError((error) => {
              return of(networkPlayerActions.listEntitiesFail({ error }));
            })
          )
      )
    )
  );
  loadEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(networkPlayerActions.loadEntity),
      switchMap((action) =>
        this.networkPlayerEffectService.loadEntity$(action.uid).pipe(
          map((entity) =>
            networkPlayerActions.loadEntitySuccess({
              networkPlayer: entity,
            })
          ),
          catchError((error) => {
            return of(networkPlayerActions.loadEntityFail({ error }));
          })
        )
      )
    )
  );

  updateEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(networkPlayerActions.updateEntity),
      switchMap((action) =>
        this.networkPlayerEffectService
          .updateEntity$(action.networkPlayer, action.subCollectionPath)
          .pipe(
            map((entity) =>
              networkPlayerActions.updateEntitySuccess({
                networkPlayer: {
                  changes: { ...entity },
                  id: entity && entity.uid,
                },
              })
            ),
            catchError((error) => {
              return of(networkPlayerActions.updateEntityFail({ error }));
            })
          )
      )
    )
  );
}
