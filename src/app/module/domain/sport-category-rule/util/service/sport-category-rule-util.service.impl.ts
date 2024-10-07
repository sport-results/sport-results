import { map, Observable, of, switchMap } from 'rxjs';

import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    SportCategoryRuleEntity,
    SportCategoryRuleEntityAdd,
    SportCategoryRuleEntityUpdate,
    SportCategoryRuleModelUpdate,
} from '@app/api/domain/sport-category-rule';
import { EntityUtilServiceImpl } from '@app/core/entity';
import { EntityAdd, Entity, EntityUpdate, SimpleEntity, SimpleModel } from '@app/api/core/entity';

@Injectable()
export class SportCategoryRuleUtilServiceImpl extends EntityUtilServiceImpl {
    public override createSimpleEntity(model: SimpleModel): SimpleEntity {
      throw new Error('Method not implemented.');
    }
    public override createSimpleModel(entity: SimpleEntity): SimpleModel {
      throw new Error('Method not implemented.');
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
    public _sort = (a: SportCategoryRuleEntity, b: SportCategoryRuleEntity): number =>
        a.name < b.name ? 1 : -1;

    public constructor(formBuilder: FormBuilder) {
        super(formBuilder);
    }

    public override convertModelUpdateToEntityUpdate$(
        model: SportCategoryRuleModelUpdate
    ): Observable<SportCategoryRuleEntityUpdate> {
        return super.convertModelUpdateToEntityUpdate$(model).pipe(
            map((entity) => entity as SportCategoryRuleEntityUpdate),
            switchMap((entity) => {
                if (model.name) {
                    entity.name = model.name;
                }

                return of(entity);
            })
        );
    }
}
