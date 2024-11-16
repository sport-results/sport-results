import { KeyValue } from '@angular/common';
import { UserEntity, UserEntityAdd, } from './user';
import { Signal } from '@angular/core';

export abstract class UserStoreService {
  public abstract addEntity(userAdd: UserEntityAdd, subCollectionPath?: string): void;

  public abstract loadEntity(uid: string): void;

  public abstract  setNewEntityButtonEnabled(enabled: boolean): void;
  public abstract listEntities(
    subCollectionPath?: string,
    pathParams?: string[],
    queryParams?: KeyValue<string, string>[]
  ): void;

  public abstract loadExistedUser(existedUser: UserEntity): void;

  public abstract setSelectedEntity(user: UserEntity | null): void;

  public abstract updateEntity(userUpdate: UserEntity, subCollectionPath?: string): void;

  public abstract setLoading(isLoading: boolean): void;

  public abstract isLoading(): Signal<boolean>;

  public abstract selectEntities(): Signal<UserEntity[]>;
  public abstract selectEntityById(
    entityId: string
  ): Signal<UserEntity | undefined>;

  public abstract selectNewEntityButtonEnabled(): Signal<boolean>;

  public abstract selectSelectedEntityId$(): Signal<string | undefined>;
}
