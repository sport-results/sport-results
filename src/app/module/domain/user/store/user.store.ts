import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  USER_FEATURE_KEY,
  UserEffectService,
  UserEntity,
} from '@app/api/domain/user';
import { tapResponse } from '@ngrx/operators';
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
import { computed, inject } from '@angular/core';
import { switchMap, tap } from 'rxjs';
import { KeyValue } from '@angular/common';

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
    const userEffectService = inject(UserEffectService);

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
      listEntities$: rxMethod<{
        subCollectionPath?: string;
        pathParams?: string[];
        queryParams?: KeyValue<string, string>[];
      }>((params$) =>
        params$.pipe(
          switchMap((params) =>
            userEffectService
              .listEntities$(
                params.subCollectionPath,
                params.pathParams,
                params.queryParams
              )
              .pipe(
                tapResponse({
                  next: (users) => {
                    patchState(store, setEntities(users, userStoreConfig))
                  },
                  error: console.error,
                })
              )
          )
        )
      ),
    };
  }),
  withComputed(({ userEntityMap }) => ({}))
);
