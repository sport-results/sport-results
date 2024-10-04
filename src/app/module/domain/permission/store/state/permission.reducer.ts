import {
  PermissionEntity,
  PERMISSION_FEATURE_KEY,
} from '@app/api/domain/permission';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as permissionActions from './permission.actions';

export interface State extends EntityState<PermissionEntity> {
  isNewEntityButtonEnabled: boolean;
  selectedId?: string;
  selectedEntity: PermissionEntity | null;
  loading: boolean;
  error?: string | null;
}

export interface PermissionPartialState {
  readonly [PERMISSION_FEATURE_KEY]: State;
}

export const permissionAdapter: EntityAdapter<PermissionEntity> =
  createEntityAdapter<PermissionEntity>({
    selectId: (model: PermissionEntity) => model.uid,
  });

export const initialState: State = permissionAdapter.getInitialState({
  isNewEntityButtonEnabled: true,
  loading: false,
  selectedEntity: null,
});

const permissionReducer = createReducer(
  initialState,
  on(permissionActions.addEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(permissionActions.addEntitySuccess, (state, { permission }) =>
    permissionAdapter.addOne(permission, { ...state, loading: false })
  ),
  on(permissionActions.addEntityFail, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(permissionActions.changeNewEntityButtonEnabled, (state, { enabled }) => ({
    ...state,
    isNewEntityButtonEnabled: enabled,
  })),
  on(permissionActions.loadEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(permissionActions.loadEntitySuccess, (state, { permission }) => {
    if (permission) {
      return permissionAdapter.upsertOne(permission, {
        ...state,
        loading: false,
      });
    } else {
      return state;
    }
  }),
  on(permissionActions.loadEntityFail, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(permissionActions.listEntities, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    permissionActions.listEntitiesSuccess,
    permissionActions.searchEntitiesByCollectionGroupSuccess,
    (state, { permissions }) =>
      permissionAdapter.upsertMany(permissions, {
        ...state,
        loading: false,
      })
  ),
  on(permissionActions.listEntitiesFail, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(permissionActions.selectEntity, (state, { permission }) => {
    return {
      ...state,
      selectedEntity: permission,
    };
  }),
  on(permissionActions.updateEntitySuccess, (state, { permission }) =>
    permissionAdapter.updateOne(permission, state)
  ),
  on(permissionActions.updateEntityFail, (state, { error }) => ({
    ...state,
    error,
  })),
  on(permissionActions.reset, (state) => permissionAdapter.removeAll(state))
);

export function reducer(state: State | undefined, action: Action) {
  return permissionReducer(state, action);
}
