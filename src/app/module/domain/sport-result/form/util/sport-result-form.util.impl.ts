import { inject, Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import {
    SportResultEntity,
    SportResultEntityAdd,
    SportResultEntityUpdate,
    SportResultModelUpdate,
    SportResultFormUtil,
} from '@app/api/domain/sport-result';
import { KeyValue } from '@angular/common';
import { USER_FEATURE_KEY } from '@app/api/domain/user';

import { SportResultUtilService } from '@app/api/domain/sport-result';
import { FormValidatorService } from '../../../../core/form/validator';

@Injectable()
export class SportResultFormUtilImpl extends SportResultFormUtil {
  private formBuilder = inject(FormBuilder);
  private entityUtilService = inject(SportResultUtilService);

  public createEntity(formGroup: FormGroup, path?: KeyValue<string, string>[]): SportResultEntityAdd {
        const now = new Date().toISOString();

        return {
            meta: {
                creationDate: now,
                lastUpdated: now,
            },
            name: formGroup.value['name'],
            path: formGroup.value['path'],
        };
    }

    public createFormGroup(sportResult: SportResultEntity | undefined): FormGroup {
        return this.formBuilder.group({
            uid: [sportResult?.uid],
            meta: [sportResult?.meta],
            name: [sportResult?.name, Validators.required],
        });
    }

    public updateEntity(formGroup: FormGroup): SportResultEntityUpdate {
        return {
            uid: formGroup.value['uid'],
            meta: formGroup.value['meta'],
            name: formGroup.value['name'],
        };
    }

    public createPath(
        userId: string,
    ): KeyValue<string, string>[] {
        return [
        { key: USER_FEATURE_KEY, value: userId },
        ];
    }
}
