import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import {
  NETWORK_PLAYER_FEATURE_KEY,
  NetworkPlayerEntity,
  NetworkPlayerEntityAdd,
  NetworkPlayerEntityUpdate,
  NetworkPlayerFormUtil,
} from '@app/api/domain/network-player';

import { FormValidatorService } from '../../../../core/form/validator';
import { KeyValue } from '@angular/common';
import { USER_FEATURE_KEY } from '@app/api/domain/user';
import { SPORT_NETWORK_FEATURE_KEY } from '@app/api/domain/sport-network';

@Injectable()
export class NetworkPlayerFormUtilImpl extends NetworkPlayerFormUtil {
  private formBuilder = inject(FormBuilder);

  public createEntity(formGroup: FormGroup, path?: KeyValue<string, string>[]): NetworkPlayerEntityAdd {
    const now = new Date().toISOString();

    return {
      meta: {
        creationDate: now,
        lastUpdated: now,
      },
      path: path as KeyValue<string, string>[],
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

  public createPath(
    userId: string,
    sportNetworkId: string,
  ): KeyValue<string, string>[] {
    return [
      { key: USER_FEATURE_KEY, value: userId },
      { key: SPORT_NETWORK_FEATURE_KEY, value: sportNetworkId },
      { key: NETWORK_PLAYER_FEATURE_KEY, value: '' },
    ];
  }
}
