import { KeyValue } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import {
    PermissionEntity,
    PermissionEntityAdd,
    PermissionEntityUpdate,
    PermissionModelUpdate,
    PermissionFormUtil,
} from '@app/api/domain/permission';

@Injectable()
export class PermissionFormUtilImpl extends PermissionFormUtil {
  private formBuilder = inject(FormBuilder);

  public createEntity(formGroup: FormGroup, path: KeyValue<string, string>[]): PermissionEntityAdd {
        const now = new Date().toISOString();

        return {
            meta: {
                creationDate: now,
                lastUpdated: now,
            },
            actions: formGroup.value['actions'],
            resourceId: formGroup.value['resourceId'],
            resourceType: formGroup.value['resourceType'],
            path: path || null,
            userId: formGroup.value['userId'],
        };
    }

    public createFormGroup(permission: PermissionEntity | undefined): FormGroup {
        return this.formBuilder.group({
            uid: [permission?.uid],
            meta: [permission?.meta],
            actions: [permission?.actions, Validators.required],
            path: [permission?.path],
            resourceId: [permission?.resourceId],
            resourceType: [permission?.resourceType],
            userId: [permission?.userId],
        });
    }

    public updateEntity(formGroup: FormGroup): PermissionEntityUpdate {
        return {
            uid: formGroup.value['uid'],
            meta: formGroup.value['meta'],
            actions: formGroup.value['actions'],
            resourceId: formGroup.value['resourceId'],
            resourceType: formGroup.value['resourceType'],
            path: formGroup.value['path'],
            userId: formGroup.value['userId'],
        };
    }
}
