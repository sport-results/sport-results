import { map, Observable, of, switchMap } from 'rxjs';

import { Injectable } from '@angular/core';
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

@Injectable()
export class SportEventUtilServiceImpl extends EntityUtilServiceImpl {
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
      sportNetworkId: entity.sportNetworkId,
      userId: entity.userId,
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
      sportNetworkId: model.sportNetworkId,
      userId: model.userId,
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
