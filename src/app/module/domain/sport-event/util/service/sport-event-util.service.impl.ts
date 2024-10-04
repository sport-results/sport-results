import { filter, first, map, Observable, of, switchMap } from 'rxjs';

import { inject, Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  SportEventEntity,
  SportEventEntityAdd,
  SportEventEntityUpdate,
  SportEventModel,
  SportEventModelAdd,
  SportEventModelUpdate,
} from '@app/api/domain/sport-event';
import { EntityUtilServiceImpl } from '@app/core/entity';
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
      participants: entity.participants,
      sportCategoryRule: entity.sportCategoryRule,
      sportCategory: entity.sportCategory,
    };
  }

  public override convertModelToEntity$(
    model: SportEventModel
  ): Observable<SportEventEntity> {
    return of({
      meta: model.meta,
      dateTime: new Date(model.dateTime),
      location: model.location,
      participants: model.participants,
      sportCategory: model.sportCategory,
      sportCategoryRule: model.sportCategoryRule,
      uid: model.uid,
    });
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
