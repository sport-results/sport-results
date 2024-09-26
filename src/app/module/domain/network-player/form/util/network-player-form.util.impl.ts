import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import {
  NetworkPlayerEntity,
  NetworkPlayerEntityAdd,
  NetworkPlayerEntityUpdate,
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
      startDate: new Date(),
      sportNetworkId: formGroup.value['sportNetworkId'],
      sportPlayer: formGroup.value['sportPlayer'],
      endDate: formGroup.value['endDate'] || null,
    };
  }

  public createFormGroup(
    networkPlayer: NetworkPlayerEntity | undefined
  ): FormGroup {
    return this.formBuilder.group({
      uid: [networkPlayer?.uid],
      meta: [networkPlayer?.meta],
      sportNetworkId: [networkPlayer?.sportNetworkId, FormValidatorService.required],
      sportPlayer: [networkPlayer?.sportPlayer, FormValidatorService.required],
      startDate: [networkPlayer?.startDate],
      endDate: [networkPlayer?.startDate],
    });
  }

  public updateEntity(formGroup: FormGroup): NetworkPlayerEntityUpdate {
    return {
      uid: formGroup.value['uid'],
      meta: formGroup.value['meta'],
      startDate: formGroup.value['startDate'],
      sportNetworkId: formGroup.value['sportNetworkId'],
      sportPlayer: formGroup.value['sportPlayer'],
      endDate: formGroup.value['endDate'] || null,
    };
  }
}
