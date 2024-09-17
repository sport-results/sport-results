import { FormGroup } from '@angular/forms';

import { Entity, EntityAdd, EntityUpdate } from './entity';

export abstract class EntityFormUtil {
  public abstract createEntity(formGroup: FormGroup): EntityAdd;
  public abstract createFormGroup(checkpoint: Entity | undefined): FormGroup;
  public abstract updateEntity(formGroup: FormGroup): EntityUpdate;
}
