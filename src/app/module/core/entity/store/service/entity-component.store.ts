
import { inject } from '@angular/core';
import { EntityStoreService } from '@app/api/core/entity';
import { UserEntity, UserStoreService } from '@app/api/domain/user';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, of, switchMap, tap } from 'rxjs';

export interface EntityComponentState<S> {
  entity: S | undefined;
  entityId: string | undefined;
  user: UserEntity | undefined;
}

/*
* Z is a generic type extension of EntityComponentState<Z>
* Y is a generic type extension of EntityStoreService<Y>
* R is a generic type extension of Entity
* S is a generic type extension of EntityAdd
* T is a generic type extension of EntityUpdate
*/
export class EntityComponentStore<
  Z extends EntityComponentState<S>, R, S, T
> extends ComponentStore<Z> {
  protected entityStoreService!: EntityStoreService<R, S, T>;
  protected userStoreService = inject(UserStoreService);

  protected readonly entity$ = this.select((state) => state.entity as S | undefined);
  protected readonly entityId$ = this.select((state) => state.entityId);
  protected readonly user$ = this.select((state) => state.user);

  protected init(entityId: string | undefined, userId: string | undefined): void {
    this.updateEntityIdState(entityId);

    this.fetchEntity(this.entityId$);
    this.fetchUser(userId);
  }

  protected readonly fetchEntity = this.effect(
    (entityId$: Observable<string | undefined>) => {
      return entityId$.pipe(
        switchMap((entityId) =>
          this.entityStoreService.selectEntityById$(entityId || '').pipe(
            tap((entity) => {
              this.updateEntityState(entity as R);
            })
          )
        )
      );
    }
  );

  protected readonly fetchUser = (userId: string | undefined) =>
    this.effect(() => {
      const user = this.userStoreService.selectEntityById(userId || '')();

      this.updateUserState(user);

      return of(user);
    });

  protected updateEntityState(entity: R | undefined): void {
    this.setState((state) => {
      return {
        ...state,
        entity,
      };
    });
  }

  private updateEntityIdState(entityId: string | undefined): void {
    this.setState((state) => {
      return {
        ...state,
        entityId,
      };
    });
  }

  private updateUserState(user: UserEntity | undefined): void {
    this.setState((state) => {
      return {
        ...state,
        user,
      };
    });
  }

}
