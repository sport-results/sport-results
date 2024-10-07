import { FormGroup } from '@angular/forms';

import { Entity, EntityAdd, EntityUpdate } from './entity';
import { KeyValue } from '@angular/common';

export abstract class EntityFormUtil {
  public abstract createEntity(
    formGroup: FormGroup,
    path?: KeyValue<string, string>[]
  ): EntityAdd;
  public abstract createFormGroup(checkpoint: Entity | undefined): FormGroup;
  public abstract updateEntity(formGroup: FormGroup): EntityUpdate;
}
