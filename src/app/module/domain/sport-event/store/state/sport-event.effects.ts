import { AuthorizationService } from '@app/api/core/authorization';
import { catchError, map, of, switchMap } from 'rxjs';

import { inject, Injectable } from '@angular/core';
import {
  SPORT_EVENT_FEATURE_KEY,
  SportEventEffectService,
} from '@app/api/domain/sport-event';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as sportEventActions from './sport-event.actions';
import {
  PERMISSION_FEATURE_KEY,
  PermissionEntityAdd,
  PermissionStoreService,
} from '@app/api/domain/permission';
import { ActionEnum, Meta, RoleNamesEnum } from '@app/api/common';
import { ParticipantTypeEnum } from '@app/api/domain/sport-category-rule';
import { SportPlayerEntity } from '@app/api/domain/sport-player';
import { KeyValue } from '@angular/common';

@Injectable()
export class SportEventEffects {
  private actions$ = inject(Actions);
  private authorizationService = inject(AuthorizationService);
  private sportEventEffectService = inject(SportEventEffectService);
  private permissionStoreService = inject(PermissionStoreService);

  addEntity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sportEventActions.addEntity),
      switchMap((action) =>
        this.sportEventEffectService
          .addEntity$(action.sportEvent, action.subCollectionPath)
          .pipe(
            map((entity) => {
              entity.participants
                .filter((participant) =>
                  entity.sportCategoryRule.participantType ===
                  ParticipantTypeEnum.player
                    ? (participant as SportPlayerEntity).userId !==
                      entity.meta.ownerId
                    : true
                )
                .forEach((participant) => {
                  if (
                    entity.sportCategoryRule.participantType ===
                    ParticipantTypeEnum.player
                      ? !!(participant as SportPlayerEntity).userId
                      : false
                  ) {
                    const permission: PermissionEntityAdd = {
                      actions: [ActionEnum.VIEW],
                      resourceId: entity.uid,
                      resourceType: typeof entity,
                      userId: (participant as SportPlayerEntity).userId || '',
                      path: [
                        ...this.addEntityIdToPath([...entity.path], entity.uid),
                        { key: PERMISSION_FEATURE_KEY, value: '' },
                      ],
                      meta: {} as Meta,
                    };
                    this.permissionStoreService.dispatchAddEntityAction(
                      permission,
                      action.subCollectionPath
                        ? `${action.subCollectionPath}/${SPORT_EVENT_FEATURE_KEY}/${entity.uid}`
                        : `${SPORT_EVENT_FEATURE_KEY}/${entity.uid}`
                    );
                  }
                });

              return sportEventActions.addEntitySuccess({
                sportEvent: entity,
              });
            })
          )
      )
    )
  );

  deleteEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sportEventActions.deleteEntity),
      switchMap((action) =>
        this.sportEventEffectService
          .deleteEntity$(action.entityId, action.subCollectionPath)
          .pipe(
            map(() => {
              return sportEventActions.deleteEntitySuccess({
                entityId: action.entityId,
              });
            }),
            catchError((error) => {
              return of(sportEventActions.deleteEntityFail({ error }));
            })
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
            map((sportEvents) => {
              sportEvents.forEach((sportEvent) =>
                this.authorizationService.addPermission(
                  this.authorizationService.generatePermissionName(
                    RoleNamesEnum.OWNER,
                    sportEvent.uid
                  )
                )
              );

              return sportEventActions.listEntitiesSuccess({
                sportEvents,
              });
            })
          )
      )
    )
  );

  listEntitiesByIds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sportEventActions.listEntitiesByIds),
      switchMap((action) =>
        this.sportEventEffectService
          .listEntitiesByCollectionGroup$(action.ids)
          .pipe(
            map((sportEvents) => {
              return sportEventActions.listEntitiesByIdsSuccess({
                sportEvents,
              });
            }),
            catchError((error) => {
              return of(sportEventActions.listEntitiesByIdsFail({ error }));
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
        this.sportEventEffectService
          .updateEntity$(action.sportEvent, action.subCollectionPath)
          .pipe(
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

  addEntityIdToPath(
    path: KeyValue<string, string>[],
    id: string
  ): KeyValue<string, string>[] {
    const newPath = [...path];
    const pathItem =  {...newPath[newPath.length - 1], value: id};
    newPath[newPath.length - 1] = pathItem

    return newPath;
  }
}
