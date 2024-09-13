import { KeyValue } from '@angular/common';
import { User } from '@app/api/common';
import {
    UserEntity,
    UserEntityAdd,
    UserEntityUpdate,
} from '@app/api/domain/user';
import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

export const addEntity = createAction(
    '[User Admin] Add User',
    props<{ user: UserEntityAdd }>()
);

export const addEntityFail = createAction(
    '[User Admin] Add User Fail',
    props<{ error: string }>()
);

export const addEntitySuccess = createAction(
    '[User Admin] Add User Success',
    props<{ user: UserEntity }>()
);

export const changeNewEntityButtonEnabled = createAction(
    '[User Admin] Change new Entity Button Enabled',
    props<{ enabled: boolean }>()
);

export const loadExistedUser = createAction(
    '[Authentication] Load Existed User',
    props<{ user: User }>()
);
export const loadExistedUserSuccess = createAction(
    '[Authentication] Load Existed User Success',
    props<{ user: UserEntity }>()
);

export const loadExistedUserFail = createAction(
    '[Authentication] Load Existed User Fail',
    props<{ error: string }>()
);

export const loadEntity = createAction(
    '[User] Load User',
    props<{ uid: string }>()
);

export const loadEntitySuccess = createAction(
    '[User] Load User Success',
    props<{ user: UserEntity | undefined }>()
);

export const loadEntityFail = createAction(
    '[User] Load User Fail',
    props<{ error: string }>()
);

export const listEntities = createAction(
    '[User Admin] List Users',
    props<{ pathParams: string[]; queryParams: KeyValue<string, string>[] }>()
);

export const listEntitiesSuccess = createAction(
    '[User Admin] List Users Success',
    props<{ users: UserEntity[] }>()
);

export const listEntitiesFail = createAction(
    '[User Admin] List Users Fail',
    props<{ error: string }>()
);

export const selectEntity = createAction(
    '[User Admin] Select User',
    props<{ user: UserEntity | null }>()
);

export const selectEntitySuccess = createAction(
    '[User Admin] Select User Success',
    props<{ user: UserEntity }>()
);

export const setSelectedEntityId = createAction(
    '[User Admin] Set Selected User Id',
    props<{ userId: string }>()
);

export const updateEntity = createAction(
    '[User Admin] Update User',
    props<{ user: UserEntityUpdate }>()
);

export const updateEntityFail = createAction(
    '[User Admin] Update User Fail',
    props<{ error: string }>()
);

export const updateEntitySuccess = createAction(
    '[User Admin] Update User Success',
    props<{ user: Update<UserEntityUpdate> }>()
);
