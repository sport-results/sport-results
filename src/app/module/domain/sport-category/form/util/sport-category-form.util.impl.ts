import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  SportCategoryEntity,
  SportCategoryEntityAdd,
  SportCategoryEntityUpdate,
  SportCategoryFormUtil,
} from '@app/api/domain/sport-category';

@Injectable()
export class SportCategoryFormUtilImpl extends SportCategoryFormUtil {
  private formBuilder = inject(FormBuilder);

  public override createEntity(formGroup: FormGroup): SportCategoryEntityAdd {
    const now = new Date().toISOString();

    return {
      meta: {
        creationDate: now,
        lastUpdated: now,
      },
      name: formGroup.value['name'],
    };
  }

  public override createFormGroup(
    sportCategory: SportCategoryEntity | undefined
  ): FormGroup {
    return this.formBuilder.group({
      uid: [sportCategory?.uid],
      meta: [sportCategory?.meta],
      name: [sportCategory?.name, Validators.required],
    });
  }

  public override updateEntity(
    formGroup: FormGroup
  ): SportCategoryEntityUpdate {
    return {
      uid: formGroup.value['uid'],
      meta: formGroup.value['meta'],
      name: formGroup.value['name'],
    };
  }
}
