import { KeyValue } from '@angular/common';

import {
    PermissionEntity,
    PermissionEntityAdd,
    PermissionEntityUpdate
} from '@app/api/domain/permission';
import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

export const addEntity = createAction(
    '[Permission Admin] Add Permission',
    props<{
        permission: PermissionEntityAdd,
        parentEntityId?: string;
    }>()
);

export const addEntityFail = createAction(
    '[Permission Admin] Add Permission Fail',
    props<{ error: string }>()
);

export const addEntitySuccess = createAction(
    '[Permission Admin] Add Permission Success',
    props<{ permission: PermissionEntity }>()
);

export const loadEntity = createAction(
    '[Permission] Load Permission',
    props<{ uid: string }>()
);

export const loadEntitySuccess = createAction(
    '[Permission] Load Permission Success',
    props<{ permission: PermissionEntity | null }>()
);

export const loadEntityFail = createAction(
    '[Permission] Load Permission Fail',
    props<{ error: string }>()
);

export const changeNewEntityButtonEnabled = createAction(
	'[Permission Admin] Change new Entity Button Enabled',
	props<{ enabled: boolean }>()
); 

export const listEntities = createAction(
    '[Permission Admin] List Permissions',
    props<{
        subCollectionPath?: string;
        pathParams?: string[];
        queryParams?: KeyValue<string, string>[]
    }>()
);

export const listEntitiesSuccess = createAction(
    '[Permission Admin] List Permissions Success',
    props<{ permissions: PermissionEntity[] }>()
);

export const listEntitiesFail = createAction(
    '[Permission Admin] List Permissions Fail',
    props<{ error: string }>()
);

export const selectEntity = createAction(
	'[Permission Admin] Select Permission',
	props<{ permission: PermissionEntity | null }>()
);

export const selectEntitySuccess = createAction(
	'[Permission Admin] Select Permission Success',
	props<{ permission: PermissionEntity }>()
);

export const updateEntity = createAction(
    '[Permission Admin] Update Permission',
    props<{
        permission: PermissionEntityUpdate;
        subCollectionPath?: string;
    }>()
);

export const updateEntitySuccess = createAction(
    '[Permission Admin] Update Permission Success',
    props<{ permission: Update<PermissionEntityUpdate> }>()
);

export const updateEntityFail = createAction(
    '[Permission Admin] Update Permission Fail',
    props<{ error: string }>()
);
