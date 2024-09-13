import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Entity, EntityAdd, EntityUpdate } from '@app/api/core/entity';

@Injectable()
export abstract class EntityFormService {
  public abstract createEntity(formGroup: FormGroup): EntityAdd;
  public abstract createFormGroup(entity: Entity | undefined): FormGroup;
  public abstract updateEntity(formGroup: FormGroup): EntityUpdate;
}
