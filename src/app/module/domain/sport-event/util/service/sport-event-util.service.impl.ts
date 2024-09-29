import { map, Observable, of, switchMap } from 'rxjs';

import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
    SportEventEntity,
    SportEventEntityAdd,
    SportEventEntityUpdate,
    SportEventModelAdd,
    SportEventModelUpdate,
} from '@app/api/domain/sport-event';
import { EntityUtilServiceImpl } from '@app/core/entity';
import { Entity, EntityAdd, EntityUpdate } from '@app/api/core/entity';

@Injectable()
export class SportEventUtilServiceImpl extends EntityUtilServiceImpl {
    public _sort = (a: SportEventEntity, b: SportEventEntity): number =>
        a.dateTime < b.dateTime ? 1 : -1;

    public constructor(formBuilder: FormBuilder) {
        super(formBuilder);
    }

    public override convertEntityAddToModelAdd(entity: SportEventEntityAdd): SportEventModelAdd {
      return {
        dateTime: entity.dateTime.toISOString(),
        location: entity.location || null,
        meta: entity.meta,
        participantIds: entity.participants.map(participant => participant.uid),
        sportCategoryRule: entity.sportCategoryRule,
      sportCategoryId: entity.sportCategory.uid,
      };
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
