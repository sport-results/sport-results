import { inject, Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EntityAdd } from '@app/api/core/entity';

import {
    SportCategoryRuleEntity,
    SportCategoryRuleEntityAdd,
    SportCategoryRuleEntityUpdate,
    SportCategoryRuleModelUpdate,
    SportCategoryRuleFormUtil,
} from '@app/api/domain/sport-category-rule';

import { FormValidatorService } from '../../../../core/form/validator';

@Injectable()
export class SportCategoryRuleFormUtilImpl extends SportCategoryRuleFormUtil {
  private formBuilder = inject(FormBuilder);

  public createEntity(formGroup: FormGroup): SportCategoryRuleEntityAdd {
        const now = new Date().toISOString();

        return {
            meta: {
                creationDate: now,
                lastUpdated: now,
            },
            name: formGroup.value['name'],
        };
    }

    public createFormGroup(sportCategoryRule: SportCategoryRuleEntity | undefined): FormGroup {
        return this.formBuilder.group({
            uid: [sportCategoryRule?.uid],
            meta: [sportCategoryRule?.meta],
            name: [sportCategoryRule?.name, Validators.required],
        });
    }

    public updateEntity(formGroup: FormGroup): SportCategoryRuleEntityUpdate {
        return {
            uid: formGroup.value['uid'],
            meta: formGroup.value['meta'],
            name: formGroup.value['name'],
        };
    }
}
