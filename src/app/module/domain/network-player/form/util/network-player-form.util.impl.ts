import { inject, Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EntityAdd } from '@app/api/core/entity';

import {
    NetworkPlayerEntity,
    NetworkPlayerEntityAdd,
    NetworkPlayerEntityUpdate,
    NetworkPlayerModelUpdate,
    NetworkPlayerFormUtil,
} from '@app/api/domain/network-player';

import { FormValidatorService } from '../../../../core/form/validator';

@Injectable()
export class NetworkPlayerFormUtilImpl extends NetworkPlayerFormUtil {
  private formBuilder = inject(FormBuilder);

  public createEntity(formGroup: FormGroup): NetworkPlayerEntityAdd {
        const now = new Date().toISOString();

        return {
            meta: {
                creationDate: now,
                lastUpdated: now,
            },
            startDate: formGroup.value['startDate'],
            newtworkId: formGroup.value['newtworkId'],
            playerId: formGroup.value['playerId'],
            endDate: formGroup.value['endDate'] || null,
        };
    }

    public createFormGroup(networkPlayer: NetworkPlayerEntity | undefined): FormGroup {
        return this.formBuilder.group({
            uid: [networkPlayer?.uid],
            meta: [networkPlayer?.meta],
            networkId: [networkPlayer?.newtworkId, Validators.required],
            playerId: [networkPlayer?.playerId, Validators.required],
            startDate: [networkPlayer?.startDate, Validators.required],
            endDate: [networkPlayer?.startDate],
        });
    }

    public updateEntity(formGroup: FormGroup): NetworkPlayerEntityUpdate {
        return {
            uid: formGroup.value['uid'],
            meta: formGroup.value['meta'],
            startDate: formGroup.value['startDate'],
            newtworkId: formGroup.value['newtworkId'],
            playerId: formGroup.value['playerId'],
            endDate: formGroup.value['endDate'] || null,
        };
    }
}
