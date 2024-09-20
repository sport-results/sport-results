import { KeyValue } from '@angular/common';
import {
  RoleEntity,
  RoleEntityAdd,
  RoleEntityUpdate,
} from '@app/api/domain/role';
import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

export const addEntity = createAction(
  '[Role Admin] Add Role',
  props<{ role: RoleEntityAdd }>()
);

export const addEntityFail = createAction(
  '[Role Admin] Add Role Fail',
  props<{ error: string }>()
);

export const addEntitySuccess = createAction(
  '[Role Admin] Add Role Success',
  props<{ role: RoleEntity }>()
);

export const loadEntity = createAction(
  '[Role] Load Role',
  props<{ uid: string }>()
);

export const loadEntitySuccess = createAction(
  '[Role] Load Role Success',
  props<{ role: RoleEntity | null }>()
);

export const loadEntityFail = createAction(
  '[Role] Load Role Fail',
  props<{ error: string }>()
);

export const changeNewEntityButtonEnabled = createAction(
  '[Role Admin] Change new Entity Button Enabled',
  props<{ enabled: boolean }>()
);

export const listEntities = createAction(
  '[Role Admin] List Roles',
  props<{
    subCollectionPath?: string;
    pathParams?: string[];
    queryParams?: KeyValue<string, string>[];
  }>()
);

export const listEntitiesSuccess = createAction(
  '[Role Admin] List Roles Success',
  props<{ roles: RoleEntity[] }>()
);

export const selectEntity = createAction(
  '[Role Admin] Select Role',
  props<{ role: RoleEntity | null }>()
);

export const selectEntitySuccess = createAction(
  '[Role Admin] Select Role Success',
  props<{ role: RoleEntity }>()
);

export const listEntitiesFail = createAction(
  '[Role Admin] List Roles Fail',
  props<{ error: string }>()
);

export const updateEntity = createAction(
  '[Role Admin] Update Role',
  props<{ role: RoleEntityUpdate }>()
);

export const updateEntityFail = createAction(
  '[Role Admin] Update Role Fail',
  props<{ error: string }>()
);

export const updateEntitySuccess = createAction(
  '[Role Admin] Update Role Success',
  props<{ role: Update<RoleEntityUpdate> }>()
);
