import { map, Observable, of, switchMap } from 'rxjs';

import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    PermissionEntity,
    PermissionEntityAdd,
    PermissionEntityUpdate,
    PermissionModelUpdate,
} from '@app/api/domain/permission';
import { EntityUtilServiceImpl } from '@app/core/entity';
import { Entity, EntityAdd, EntityUpdate, SimpleEntity, SimpleModel } from '@app/api/core/entity';

@Injectable()
export class PermissionUtilServiceImpl extends EntityUtilServiceImpl {
  public override createSimpleEntity(model: SimpleModel): SimpleEntity {
    throw new Error('Method not implemented.');
  }
  public override createSimpleModel(entity: SimpleEntity): SimpleModel {
    throw new Error('Method not implemented.');
  }
    public _sort = (a: PermissionEntity, b: PermissionEntity): number =>
        a.uid < b.uid ? 1 : -1;

    public constructor(formBuilder: FormBuilder) {
        super(formBuilder);
    }

    public override convertModelUpdateToEntityUpdate$(
        model: PermissionModelUpdate
    ): Observable<PermissionEntityUpdate> {
        return super.convertModelUpdateToEntityUpdate$(model).pipe(
            map((entity) => entity as PermissionEntityUpdate),
            switchMap((entity) => {
                if (model.actions) {
                    entity.actions = model.actions;
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
