import { USER_FEATURE_KEY, UserEntity } from '@app/api/domain/user';
import {
  patchState,
  signalStore,
  signalStoreFeature,
  type,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

import {
  addEntity,
  entityConfig,
  setEntities,
  setEntity,
  withEntities,
} from '@ngrx/signals/entities';

import { CustomEntityState } from '@app/api/core/entity';
import { computed } from '@angular/core';

const userStoreConfig = entityConfig({
  entity: type<UserEntity>(),
  collection: USER_FEATURE_KEY,
  selectId: (user) => user.uid,
});

export function setNewEntityButtonEnabled(
  newEntityButtonEnabled: boolean
): Partial<CustomEntityState> {
  return { newEntityButtonEnabled };
}

export function setSelectedEntity(
  selectedEntity: UserEntity | null
): Partial<CustomEntityState> {
  return { selectedEntity };
}

export function setLoading(isLoading: boolean): Partial<CustomEntityState> {
  return { isLoading };
}

export function withCustomEntity() {
  return signalStoreFeature(
    withState<CustomEntityState>({
      isLoading: false,
      newEntityButtonEnabled: false,
      selectedEntity: null,
    }),
    withComputed(({ newEntityButtonEnabled }) => ({
      isNewEntityButtonEnabled: computed(() => newEntityButtonEnabled()),
    })),
    withMethods((store) => {
      return {
        setNewEntityButtonEnabled(enabled: boolean): void {
          patchState(store, setNewEntityButtonEnabled(enabled));
        },
        setSelectedEntity(selectedEntity: UserEntity | null): void {
          patchState(store, setSelectedEntity(selectedEntity));
        },
        setLoading(isLoading: boolean): void {
          patchState(store, setLoading(isLoading));
        },
      };
    })
  );
}

export const UserStore = signalStore(
  { providedIn: 'root' },
  withEntities(userStoreConfig),
  withCustomEntity(),
  withMethods((store) => {
    return {
      addUser(user: UserEntity): void {
        patchState(store, addEntity(user, userStoreConfig));
      },
      setUsers(users: UserEntity[]): void {
        patchState(store, setEntities(users, userStoreConfig));
      },
      setUser(user: UserEntity): void {
        patchState(store, setEntity(user, userStoreConfig));
      },
    };
  }),
  withComputed(({ userEntityMap }) => ({}))
);
