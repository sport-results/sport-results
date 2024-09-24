import { inject, Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EntityAdd } from '@app/api/core/entity';

import {
    SportPlayerEntity,
    SportPlayerEntityAdd,
    SportPlayerEntityUpdate,
    SportPlayerModelUpdate,
    SportPlayerFormUtil,
} from '@app/api/domain/sport-player';

import { FormValidatorService } from '../../../../core/form/validator';

@Injectable()
export class SportPlayerFormUtilImpl extends SportPlayerFormUtil {
  private formBuilder = inject(FormBuilder);

  public createEntity(formGroup: FormGroup): SportPlayerEntityAdd {
        const now = new Date().toISOString();

        return {
            meta: {
                creationDate: now,
                lastUpdated: now,
            },
            name: formGroup.value['name'],
        };
    }

    public createFormGroup(sportPlayer: SportPlayerEntity | undefined): FormGroup {
        return this.formBuilder.group({
            uid: [sportPlayer?.uid],
            meta: [sportPlayer?.meta],
            name: [sportPlayer?.name, Validators.required],
        });
    }

    public updateEntity(formGroup: FormGroup): SportPlayerEntityUpdate {
        return {
            uid: formGroup.value['uid'],
            meta: formGroup.value['meta'],
            name: formGroup.value['name'],
        };
    }
}
