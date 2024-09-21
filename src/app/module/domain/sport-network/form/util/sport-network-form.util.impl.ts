import { inject, Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EntityAdd } from '@app/api/core/entity';

import {
    SportNetworkEntity,
    SportNetworkEntityAdd,
    SportNetworkEntityUpdate,
    SportNetworkModelUpdate,
    SportNetworkFormUtil,
} from '@app/api/domain/sport-network';

import { FormValidatorService } from '../../../../core/form/validator';

@Injectable()
export class SportNetworkFormUtilImpl extends SportNetworkFormUtil {
  private formBuilder = inject(FormBuilder);

  public createEntity(formGroup: FormGroup): SportNetworkEntityAdd {
        const now = new Date().toISOString();

        return {
            meta: {
                creationDate: now,
                lastUpdated: now,
            },
            name: formGroup.value['name'],
        };
    }

    public createFormGroup(sportNetwork: SportNetworkEntity | undefined): FormGroup {
        return this.formBuilder.group({
            uid: [sportNetwork?.uid],
            meta: [sportNetwork?.meta],
            name: [sportNetwork?.name, Validators.required],
        });
    }

    public updateEntity(formGroup: FormGroup): SportNetworkEntityUpdate {
        return {
            uid: formGroup.value['uid'],
            meta: formGroup.value['meta'],
            name: formGroup.value['name'],
        };
    }
}
