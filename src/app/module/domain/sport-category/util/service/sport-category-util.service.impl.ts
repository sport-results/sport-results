import { map, Observable, of, switchMap } from 'rxjs';

import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Entity, EntityAdd, EntityUpdate } from '@app/api/core/entity';
import {
  SportCategoryEntity,
  SportCategoryEntityAdd,
  SportCategoryEntityUpdate,
  SportCategoryModelUpdate,
} from '@app/api/domain/sport-category';
import { EntityUtilServiceImpl } from '@app/core/entity';

@Injectable()
export class SportCategoryUtilServiceImpl extends EntityUtilServiceImpl {
  public _sort = (a: SportCategoryEntity, b: SportCategoryEntity): number =>
    a.name < b.name ? 1 : -1;

  public constructor(formBuilder: FormBuilder) {
    super(formBuilder);
  }

  public override convertModelUpdateToEntityUpdate$(
    model: SportCategoryModelUpdate
  ): Observable<SportCategoryEntityUpdate> {
    return super.convertModelUpdateToEntityUpdate$(model).pipe(
      map((entity) => entity as SportCategoryEntityUpdate),
      switchMap((entity) => {
        if (model.name) {
          entity.name = model.name;
        }

        return of(entity);
      })
    );
  }

  public createEntity(formGroup: FormGroup): SportCategoryEntityAdd {
    const now = new Date().toISOString();

    return {
      meta: {
        creationDate: now,
        lastUpdated: now,
      },
      name: formGroup.value['name'],
    };
  }

  public override createEntitySearchParameter(
    entity: Entity | EntityAdd | EntityUpdate
  ): string[] {
    throw new Error('Method not implemented.');
  }

  public createFormGroup(
    sportCategory: SportCategoryEntity | undefined
  ): FormGroup {
    return this.formBuilder.group({
      uid: [sportCategory?.uid],
      meta: [sportCategory?.meta],
      name: [sportCategory?.name, Validators.required],
    });
  }

  public updateEntity(formGroup: FormGroup): SportCategoryEntityUpdate {
    return {
      uid: formGroup.value['uid'],
      meta: formGroup.value['meta'],
      name: formGroup.value['name'],
    };
  }
}
