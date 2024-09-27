import { map, Observable, of, switchMap } from 'rxjs';

import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    SportEventEntity,
    SportEventEntityAdd,
    SportEventEntityUpdate,
    SportEventModelUpdate,
} from '@app/api/domain/sport-event';
import { EntityUtilServiceImpl } from '@app/core/entity';
import { Entity, EntityAdd, EntityUpdate } from '@app/api/core/entity';

@Injectable()
export class SportEventUtilServiceImpl extends EntityUtilServiceImpl {
    public _sort = (a: SportEventEntity, b: SportEventEntity): number =>
        a.name < b.name ? 1 : -1;

    public constructor(formBuilder: FormBuilder) {
        super(formBuilder);
    }

    public override convertModelUpdateToEntityUpdate$(
        model: SportEventModelUpdate
    ): Observable<SportEventEntityUpdate> {
        return super.convertModelUpdateToEntityUpdate$(model).pipe(
            map((entity) => entity as SportEventEntityUpdate),
            switchMap((entity) => {
                if (model.name) {
                    entity.name = model.name;
                }

                return of(entity);
            })
        );
    }

     public override createEntity(formGroup: FormGroup): EntityAdd {
        throw new Error('Method not implemented.');
    }
    public override createEntitySearchParameter(entity: Entity | EntityAdd | EntityUpdate): string[] {
        throw new Error('Method not implemented.');
    }
    public override createFormGroup(entity: Entity | undefined): FormGroup {
        throw new Error('Method not implemented.');
    }
    public override updateEntity(formGroup: FormGroup): EntityUpdate {
        throw new Error('Method not implemented.');
    }
}
