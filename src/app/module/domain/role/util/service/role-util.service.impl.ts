import { map, Observable, of, switchMap } from 'rxjs';

import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  RoleEntity,
  RoleEntityUpdate,
  RoleModelUpdate,
} from '@app/api/domain/role';
import { EntityUtilServiceImpl } from '@app/core/entity';
import { Entity, EntityAdd, EntityUpdate, SimpleEntity, SimpleModel } from '@app/api/core/entity';

@Injectable()
export class RoleUtilServiceImpl extends EntityUtilServiceImpl {
  public override createSimpleEntity(model: SimpleModel): SimpleEntity {
    throw new Error('Method not implemented.');
  }
  public override createSimpleModel(entity: SimpleEntity): SimpleModel {
    throw new Error('Method not implemented.');
  }
  public override createEntitySearchParameter(
    entity: Entity | EntityAdd | EntityUpdate
  ): string[] {
    throw new Error('Method not implemented.');
  }
  public _sort = (a: RoleEntity, b: RoleEntity): number =>
    a.name < b.name ? 1 : -1;

  public constructor(formBuilder: FormBuilder) {
    super(formBuilder);
  }

  public override convertModelUpdateToEntityUpdate$(
    model: RoleModelUpdate
  ): Observable<RoleEntityUpdate> {
    return super.convertModelUpdateToEntityUpdate$(model).pipe(
      map((entity) => entity as RoleEntityUpdate),
      switchMap((entity) => {
        if (model.editable) {
          entity.editable = model.editable;
        }

        if (model.name) {
          entity.name = model.name;
        }

        if (model.permissions) {
          entity.permissions = model.permissions;
        }

        return of(entity);
      })
    );
  }
}
