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

  public createEntity(formGroup: FormGroup): PermissionEntityAdd {
        const now = new Date().toISOString();

        return {
            meta: {
                creationDate: now,
                lastUpdated: now,
            },
            actions: formGroup.value['actions'],
            resourceId: formGroup.value['resourceId'],
            resourceType: formGroup.value['resourceType'],
            userId: formGroup.value['userId'],
        };
    }

    public createFormGroup(permission: PermissionEntity | undefined): FormGroup {
        return this.formBuilder.group({
            uid: [permission?.uid],
            meta: [permission?.meta],
            actions: [permission?.actions, Validators.required],
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
            userId: formGroup.value['userId'],
        };
    }
}
