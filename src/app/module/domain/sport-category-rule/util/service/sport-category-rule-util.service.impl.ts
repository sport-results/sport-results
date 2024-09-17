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

@Injectable()
export class SportCategoryRuleUtilServiceImpl extends EntityUtilServiceImpl {
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
