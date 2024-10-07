import { Observable } from 'rxjs';

import { FormGroup } from '@angular/forms';
import { User } from '@app/api/common';
import { Signal } from '@angular/core';
import { SimpleEntity, SimpleModel } from './entity';

export abstract class EntityUtilService<R, S, T, Y, Z, X> {
  public user$$$!: Signal<User | undefined>;
  public abstract _sort(a: R, b: R): number;
  public abstract convertEntityAddToModelAdd(entityAdd: S): Z;
  public abstract convertEntityToModel(entity: R): Y;
  public abstract convertEntityUpdateToModelUpdate(entity: T): X;
  public abstract convertModelAddToEntityAdd(model: Z): S;
  public abstract convertModelToEntity$(model: Y): Observable<R>;
  public abstract convertModelUpdateToEntityUpdate$(model: X): Observable<T>;
  public abstract createEntity(formGroup: FormGroup): S;
  public abstract createEntitySearchParameter(entity: R | S | T): string[];
  public abstract createFormGroup(entity: R | undefined): FormGroup;
  public abstract updateEntity(formGroup: FormGroup): T;
  public abstract createSimpleEntity(model: SimpleModel): SimpleEntity;
  public abstract createSimpleModel(entity: SimpleEntity): SimpleModel;

  protected abstract createSearchParameter(name: string): string[];
}
