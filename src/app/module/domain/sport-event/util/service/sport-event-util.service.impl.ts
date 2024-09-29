import { filter, first, map, Observable, of, switchMap, tap } from 'rxjs';

import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  SportEventEntity,
  SportEventEntityAdd,
  SportEventEntityUpdate,
  SportEventModel,
  SportEventModelAdd,
  SportEventModelUpdate,
} from '@app/api/domain/sport-event';
import { EntityUtilServiceImpl } from '@app/core/entity';
import { Entity, EntityAdd, EntityUpdate } from '@app/api/core/entity';
import { SportPlayerStoreService } from '@app/api/domain/sport-player';

@Injectable()
export class SportEventUtilServiceImpl extends EntityUtilServiceImpl {
  private sportPlayerStoreService = inject(SportPlayerStoreService);

  public _sort = (a: SportEventEntity, b: SportEventEntity): number =>
    a.dateTime < b.dateTime ? 1 : -1;

  public constructor(formBuilder: FormBuilder) {
    super(formBuilder);
  }

  public override convertEntityAddToModelAdd(
    entity: SportEventEntityAdd
  ): SportEventModelAdd {
    return {
      dateTime: entity.dateTime.toISOString(),
      location: entity.location || null,
      meta: entity.meta,
      participantIds: entity.participants.map((participant) => participant.uid),
      sportCategoryRule: entity.sportCategoryRule,
      sportCategory: entity.sportCategory,
    };
  }

  public override convertModelToEntity$(
    model: SportEventModel
  ): Observable<SportEventEntity> {
    return this.sportPlayerStoreService
      .selectEntitiesByIds$(model.participantIds)
      .pipe(
        filter(
          (sportPlayers) =>
            !!sportPlayers &&
            sportPlayers.length == model.sportCategoryRule.participantSize
        ),
        first(),
        map((sportPlayers) => {
          return {
            meta: model.meta,
            dateTime: new Date(model.dateTime),
            location: model.location,
            participants: sportPlayers,
            sportCategory: model.sportCategory,
            sportCategoryRule: model.sportCategoryRule,
            uid: model.uid,
          };
        })
      );
  }

  public override convertModelUpdateToEntityUpdate$(
    model: SportEventModelUpdate
  ): Observable<SportEventEntityUpdate> {
    return super.convertModelUpdateToEntityUpdate$(model).pipe(
      map((entity) => entity as SportEventEntityUpdate),
      switchMap((entity) => {
        if (model.location) {
          entity.location = model.location;
        }

        return of(entity);
      })
    );
  }
}
