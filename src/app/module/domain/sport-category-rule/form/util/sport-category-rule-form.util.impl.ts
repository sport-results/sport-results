import { KeyValue } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EntityAdd } from '@app/api/core/entity';
import { SportCategoryEntitySimple } from '@app/api/domain/sport-category';
import {
  SportCategoryRuleEntity,
  SportCategoryRuleEntityAdd,
  SportCategoryRuleEntityUpdate,
  SportCategoryRuleFormUtil,
} from '@app/api/domain/sport-category-rule';

import { FormValidatorService } from '@app/core/form';

@Injectable()
export class SportCategoryRuleFormUtilImpl extends SportCategoryRuleFormUtil {
  private formBuilder = inject(FormBuilder);

  public override createEntity(
    formGroup: FormGroup,
    path?: KeyValue<string, string>[]
  ): EntityAdd {
    throw new Error('Method not implemented.');
  }

  public createEntityWithCategory(
    formGroup: FormGroup,
    sportCategory?: SportCategoryEntitySimple
  ): SportCategoryRuleEntityAdd {
    const now = new Date().toISOString();

    return {
      meta: {
        creationDate: now,
        lastUpdated: now,
      },
      name: formGroup.value['name'],
      participantSize: formGroup.value['participantSize'],
      participantType: formGroup.value['participantType'],
      periodSize: formGroup.value['periodSize'],
      periodType: formGroup.value['periodType'],
      periodTypeWinningSize: formGroup.value['periodTypeWinningSize'],
      periodWinningSize: formGroup.value['periodWinningSize'],
      sportCategory: formGroup.value['sportCategory'] || sportCategory || null,
    };
  }

  public createFormGroup(
    sportCategoryRule: SportCategoryRuleEntity | undefined
  ): FormGroup {
    return this.formBuilder.group({
      uid: [sportCategoryRule?.uid],
      meta: [sportCategoryRule?.meta],
      name: [sportCategoryRule?.name, FormValidatorService.required],
      participantSize: [
        sportCategoryRule?.participantSize,
        FormValidatorService.required,
      ],
      periodSize: [
        sportCategoryRule?.periodSize,
        FormValidatorService.required,
      ],
      participantType: [
        sportCategoryRule?.participantType,
        FormValidatorService.required,
      ],
      periodType: [
        sportCategoryRule?.periodType,
        FormValidatorService.required,
      ],
      periodTypeWinningSize: [
        sportCategoryRule?.periodTypeWinningSize,
        FormValidatorService.required,
      ],
      periodWinningSize: [
        sportCategoryRule?.periodWinningSize,
        FormValidatorService.required,
      ],
      sportCategory: [sportCategoryRule?.sportCategory],
    });
  }

  public updateEntity(formGroup: FormGroup): SportCategoryRuleEntityUpdate {
    return {
      uid: formGroup.value['uid'],
      meta: formGroup.value['meta'],
      name: formGroup.value['name'],
      participantSize: formGroup.value['participantSize'],
      participantType: formGroup.value['participantType'],
      periodSize: formGroup.value['periodSize'],
      periodType: formGroup.value['periodType'],
      periodTypeWinningSize: formGroup.value['periodTypeWinningSize'],
      periodWinningSize: formGroup.value['periodWinningSize'],
      sportCategory: formGroup.value['sportCategory'],
    };
  }
}
