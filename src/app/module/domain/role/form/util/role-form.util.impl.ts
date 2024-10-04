import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  RoleEntity,
  RoleEntityAdd,
  RoleEntityUpdate,
  RoleFormUtil,
} from '@app/api/domain/role';

@Injectable()
export class RoleFormUtilImpl extends RoleFormUtil {
  private formBuilder = inject(FormBuilder);

  public override createEntity(formGroup: FormGroup): RoleEntityAdd {
    const now = new Date().toISOString();

    return {
      editable: formGroup.value['editable'],
      meta: {
        creationDate: now,
        lastUpdated: now,
      },
      name: formGroup.value['name'],
      permissions: formGroup.value['permissions'],
    };
  }

  public override createFormGroup(role: RoleEntity | undefined): FormGroup {
    return this.formBuilder.group({
      editable: [role ? role?.editable : true],
      meta: [role?.meta],
      name: [role?.name, Validators.required],
      permissions: [role?.permissions],
      uid: [role?.uid],
    });
  }

  public override updateEntity(formGroup: FormGroup): RoleEntityUpdate {
    return {
      editable: formGroup.value['editable'],
      meta: formGroup.value['meta'],
      name: formGroup.value['name'],
      permissions: formGroup.value['permissions'],
      uid: formGroup.value['uid'],
    };
  }
}
