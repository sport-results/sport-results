import { tapResponse } from '@ngrx/operators';
import {
  computed,
  effect,
  EnvironmentInjector,
  inject,
  runInInjectionContext,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleNamesEnum } from '@app/api/common';
import {
  UserEntity,
  UserPermissionsService,
  UserStoreService,
} from '@app/api/domain/user';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

export type UserTableState = {
  userEntities: UserEntity[];
  buttonPermissions: string[];
};

const initialState: UserTableState = {
  userEntities: [],
  buttonPermissions: [
    RoleNamesEnum.ADMIN,
    UserPermissionsService.updateUserEntity,
  ],
};

export const UserTableStore = signalStore(
  withState(initialState),
  withMethods((store) => {
    const activatedRoute = inject(ActivatedRoute);
    const userStoreService = inject(UserStoreService);
    const router = inject(Router);

    return {
      init$: rxMethod<void>(() =>
        toObservable(userStoreService.selectEntities()).pipe(
          tapResponse({
            next: (userEntities) => {
              patchState(store, { userEntities });
            },
            error: console.error,
          })
        )
      ),
      editUser(userEntity: UserEntity): void {
        router.navigate(['../edit', userEntity?.uid], {
          relativeTo: activatedRoute,
        });
      },
    };
  }),
  withHooks((store) => {
    return {
      onInit() {
        store.init$();
      },
      onDestroy() {},
    };
  })
);
