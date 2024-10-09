import { map, Observable, of, switchMap } from 'rxjs';

import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    SportResultEntity,
    SportResultEntityAdd,
    SportResultEntityUpdate,
    SportResultModelUpdate,
} from '@app/api/domain/sport-result';
import { EntityUtilServiceImpl } from '@app/core/entity';
import { Entity, EntityAdd, EntityUpdate, SimpleEntity, SimpleModel } from '@app/api/core/entity';

@Injectable()
export class SportResultUtilServiceImpl extends EntityUtilServiceImpl {
    public _sort = (a: SportResultEntity, b: SportResultEntity): number =>
        a.name < b.name ? 1 : -1;

    public constructor(formBuilder: FormBuilder) {
        super(formBuilder);
    }

    public override convertModelUpdateToEntityUpdate$(
        model: SportResultModelUpdate
    ): Observable<SportResultEntityUpdate> {
        return super.convertModelUpdateToEntityUpdate$(model).pipe(
            map((entity) => entity as SportResultEntityUpdate),
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
    public override createSimpleEntity(model: SimpleModel): SimpleEntity {
        throw new Error('Method not implemented.');
    }
    public override createSimpleModel(entity: SimpleEntity): SimpleModel {
        throw new Error('Method not implemented.');
    }
}
