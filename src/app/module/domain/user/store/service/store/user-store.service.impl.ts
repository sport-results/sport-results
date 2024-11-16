import { listEntities } from './../../../../sport-result/store/state/sport-result.actions';
import {
  computed,
  effect,
  EnvironmentInjector,
  inject,
  Injectable,
  runInInjectionContext,
  Signal,
} from '@angular/core';
import { KeyValue } from '@angular/common';
import {
  UserEffectService,
  UserEntity,
  UserEntityAdd,
  UserStoreService,
} from '@app/api/domain/user';
import { UserStore } from '../../user.store';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class UserStoreServiceImpl extends UserStoreService {
  protected injector = inject(EnvironmentInjector);
  userStore = inject(UserStore);
  userEffectService = inject(UserEffectService);

  public addEntity(userAdd: UserEntityAdd, subCollectionPath?: string): void {
    runInInjectionContext(this.injector, () => {
      const user = toSignal(
        this.userEffectService.addEntity$(userAdd, subCollectionPath)
      )();

      if (user) {
        this.userStore.addUser(user);
      }
    });
  }

  public loadEntity(uid: string): void {
    runInInjectionContext(this.injector, () => {
      const user = toSignal(this.userEffectService.loadEntity$(uid))();

      if (user) {
        this.userStore.setUser(user);
      }
    });
  }

  public setNewEntityButtonEnabled(enabled: boolean): void {
    this.userStore.setNewEntityButtonEnabled(enabled);
  }

  public listEntities(
    subCollectionPath?: string,
    pathParams?: string[],
    queryParams?: KeyValue<string, string>[]
  ): void {
    this.userStore.listEntities$({
      subCollectionPath,
      pathParams,
      queryParams,
    });
  }

  public loadExistedUser(existedUser: UserEntity): void {
    runInInjectionContext(this.injector, () => {
      const user = toSignal(
        this.userEffectService.loadExistedUser$(existedUser)
      );

      computed(() => {
        const x = user();

        if (x) {
          this.userStore.setUser(x);
        }
      });
    });
  }

  public setSelectedEntity(user: UserEntity | null): void {
    this.userStore.setSelectedEntity(user);
  }

  public updateEntity(
    userUpdate: UserEntity,
    subCollectionPath?: string
  ): void {
    runInInjectionContext(this.injector, () => {
      const user = toSignal(
        this.userEffectService.updateEntity$(userUpdate, subCollectionPath)
      )();

      if (user) {
        this.userStore.setUser(user as UserEntity);
      }
    });
  }

  public setLoading(isLoading: boolean): void {
    this.userStore.setLoading(isLoading);
  }

  public isLoading(): Signal<boolean> {
    return this.userStore.isLoading;
  }

  public selectEntities(): Signal<UserEntity[]> {
    return this.userStore.userEntities;
  }

  public selectEntityById(entityId: string): Signal<UserEntity | undefined> {
    return computed(() => this.userStore.userEntityMap()[entityId]);
  }

  public selectNewEntityButtonEnabled(): Signal<boolean> {
    return this.userStore.isNewEntityButtonEnabled;
  }

  public selectSelectedEntityId$(): Signal<string | undefined> {
    return computed(() => this.userStore.selectedEntity()?.uid);
  }
}
