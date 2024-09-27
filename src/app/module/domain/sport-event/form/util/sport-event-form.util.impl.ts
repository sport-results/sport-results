import { inject, Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EntityAdd } from '@app/api/core/entity';

import {
    SportEventEntity,
    SportEventEntityAdd,
    SportEventEntityUpdate,
    SportEventModelUpdate,
    SportEventFormUtil,
} from '@app/api/domain/sport-event';

import { FormValidatorService } from '../../../../core/form/validator';

@Injectable()
export class SportEventFormUtilImpl extends SportEventFormUtil {
  private formBuilder = inject(FormBuilder);

  public createEntity(formGroup: FormGroup): SportEventEntityAdd {
        const now = new Date().toISOString();

        return {
            meta: {
                creationDate: now,
                lastUpdated: now,
            },
            name: formGroup.value['name'],
        };
    }

    public createFormGroup(sportEvent: SportEventEntity | undefined): FormGroup {
        return this.formBuilder.group({
            uid: [sportEvent?.uid],
            meta: [sportEvent?.meta],
            name: [sportEvent?.name, Validators.required],
        });
    }

    public updateEntity(formGroup: FormGroup): SportEventEntityUpdate {
        return {
            uid: formGroup.value['uid'],
            meta: formGroup.value['meta'],
            name: formGroup.value['name'],
        };
    }
}
