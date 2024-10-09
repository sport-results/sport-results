import { KeyValue } from '@angular/common';

import {
    SportResultEntity,
    SportResultEntityAdd,
    SportResultEntityUpdate
} from '@app/api/domain/sport-result';
import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

export const addEntity = createAction(
    '[SportResult Admin] Add SportResult',
    props<{
        sportResult: SportResultEntityAdd,
        parentEntityId?: string;
    }>()
);

export const addEntityFail = createAction(
    '[SportResult Admin] Add SportResult Fail',
    props<{ error: string }>()
);

export const addEntitySuccess = createAction(
    '[SportResult Admin] Add SportResult Success',
    props<{ sportResult: SportResultEntity }>()
);

export const loadEntity = createAction(
    '[SportResult] Load SportResult',
    props<{ uid: string }>()
);

export const loadEntitySuccess = createAction(
    '[SportResult] Load SportResult Success',
    props<{ sportResult: SportResultEntity | null }>()
);

export const loadEntityFail = createAction(
    '[SportResult] Load SportResult Fail',
    props<{ error: string }>()
);

export const changeNewEntityButtonEnabled = createAction(
	'[SportResult Admin] Change new Entity Button Enabled',
	props<{ enabled: boolean }>()
); 

export const listEntities = createAction(
    '[SportResult Admin] List SportResults',
    props<{
        subCollectionPath?: string;
        pathParams?: string[];
        queryParams?: KeyValue<string, string>[]
    }>()
);

export const listEntitiesSuccess = createAction(
    '[SportResult Admin] List SportResults Success',
    props<{ sportResults: SportResultEntity[] }>()
);

export const listEntitiesFail = createAction(
    '[SportResult Admin] List SportResults Fail',
    props<{ error: string }>()
);

export const selectEntity = createAction(
	'[SportResult Admin] Select SportResult',
	props<{ sportResult: SportResultEntity | null }>()
);

export const selectEntitySuccess = createAction(
	'[SportResult Admin] Select SportResult Success',
	props<{ sportResult: SportResultEntity }>()
);

export const updateEntity = createAction(
    '[SportResult Admin] Update SportResult',
    props<{
        sportResult: SportResultEntityUpdate;
        subCollectionPath?: string;
    }>()
);

export const updateEntitySuccess = createAction(
    '[SportResult Admin] Update SportResult Success',
    props<{ sportResult: Update<SportResultEntityUpdate> }>()
);

export const updateEntityFail = createAction(
    '[SportResult Admin] Update SportResult Fail',
    props<{ error: string }>()
);
