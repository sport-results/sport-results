import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Entity } from '@app/api/core/entity';
import { SportCategoryEntity } from '@app/api/domain/sport-category';
import {
  SportCategoryRuleEntity,
  SportCategoryRuleEntityAdd,
  SportCategoryRuleEntityUpdate,
  SportCategoryRuleFormUtil,
  SportCategoryRuleModelUpdate,
} from '@app/api/domain/sport-category-rule';

import { FormValidatorService } from '../../../../core/form/validator';

@Injectable()
export class SportCategoryRuleFormUtilImpl extends SportCategoryRuleFormUtil {
  private formBuilder = inject(FormBuilder);

  public createEntity(
    formGroup: FormGroup,
    parentEntity?: SportCategoryEntity
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
      periodType: formGroup.value['periodType'],
      periodTypeWinningSize: formGroup.value['periodTypeWinningSize'],
      periodWinningSize: formGroup.value['periodWinningSize'],
      sportCategory:
        formGroup.value['sportCategory'] ||
        (parentEntity
          ? { uid: parentEntity.uid, name: parentEntity.name }
          : null),
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
      periodType: formGroup.value['periodType'],
      periodTypeWinningSize: formGroup.value['periodTypeWinningSize'],
      periodWinningSize: formGroup.value['periodWinningSize'],
      sportCategory: formGroup.value['sportCategory'],
    };
  }
}
