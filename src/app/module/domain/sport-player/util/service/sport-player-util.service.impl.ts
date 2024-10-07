import { map, Observable, of, switchMap } from 'rxjs';

import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  SportPlayerEntity,
  SportPlayerEntitySimple,
  SportPlayerEntityUpdate,
  SportPlayerModelSimple,
  SportPlayerModelUpdate,
} from '@app/api/domain/sport-player';
import { EntityUtilServiceImpl } from '@app/core/entity';
import { Entity, EntityAdd, EntityUpdate } from '@app/api/core/entity';

@Injectable()
export class SportPlayerUtilServiceImpl extends EntityUtilServiceImpl {
  public override createSimpleEntity(
    model: SportPlayerModelSimple
  ): SportPlayerEntitySimple {
    return {
      uid: model.uid,
      name: model.name,
      skills: model.skills,
      userId: model.userId,
    };
  }

  public override createSimpleModel(
    entity: SportPlayerEntitySimple
  ): SportPlayerModelSimple {
    return {
      uid: entity.uid,
      name: entity.name,
      skills: entity.skills,
      userId: entity.userId,
    };
  }
  public _sort = (a: SportPlayerEntity, b: SportPlayerEntity): number =>
    a.name < b.name ? 1 : -1;

  public constructor(formBuilder: FormBuilder) {
    super(formBuilder);
  }

  public override convertModelUpdateToEntityUpdate$(
    model: SportPlayerModelUpdate
  ): Observable<SportPlayerEntityUpdate> {
    return super.convertModelUpdateToEntityUpdate$(model).pipe(
      map((entity) => entity as SportPlayerEntityUpdate),
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
  public override createEntitySearchParameter(
    entity: Entity | EntityAdd | EntityUpdate
  ): string[] {
    throw new Error('Method not implemented.');
  }
  public override createFormGroup(entity: Entity | undefined): FormGroup {
    throw new Error('Method not implemented.');
  }
  public override updateEntity(formGroup: FormGroup): EntityUpdate {
    throw new Error('Method not implemented.');
  }
}
