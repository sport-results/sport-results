import { KeyValue } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  SPORT_NETWORK_FEATURE_KEY,
  SportNetworkEntity,
  SportNetworkEntityAdd,
  SportNetworkEntityUpdate,
  SportNetworkFormUtil,
} from '@app/api/domain/sport-network';
import { USER_FEATURE_KEY } from '@app/api/domain/user';

@Injectable()
export class SportNetworkFormUtilImpl extends SportNetworkFormUtil {
  private formBuilder = inject(FormBuilder);

  public createEntity(
    formGroup: FormGroup,
    path?: KeyValue<string, string>[]
  ): SportNetworkEntityAdd {
    const now = new Date().toISOString();

    return {
      meta: {
        creationDate: now,
        lastUpdated: now,
      },
      name: formGroup.value['name'],
      path: path as KeyValue<string, string>[],
      sportCategories: formGroup.value['sportCategories'],
      userId: formGroup.value['userId'],
    };
  }

  public createFormGroup(
    sportNetwork: SportNetworkEntity | undefined
  ): FormGroup {
    return this.formBuilder.group({
      uid: [sportNetwork?.uid],
      userId: [sportNetwork?.userId],
      meta: [sportNetwork?.meta],
      path: [sportNetwork?.path],
      name: [sportNetwork?.name, Validators.required],
      sportCategories: [sportNetwork?.sportCategories, Validators.required],
    });
  }

  public updateEntity(formGroup: FormGroup): SportNetworkEntityUpdate {
    return {
      uid: formGroup.value['uid'],
      meta: formGroup.value['meta'],
      name: formGroup.value['name'],
      path: formGroup.value['path'],
      sportCategories: formGroup.value['sportCategories'],
      userId: formGroup.value['userId'],
    };
  }
}
