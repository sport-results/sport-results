import { KeyValue } from '@angular/common';

import {
    SportEventEntity,
    SportEventEntityAdd,
    SportEventEntityUpdate
} from '@app/api/domain/sport-event';
import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

export const addEntity = createAction(
    '[SportEvent Admin] Add SportEvent',
    props<{
        sportEvent: SportEventEntityAdd,
        subCollectionPath?: string;
    }>()
);

export const addEntityFail = createAction(
    '[SportEvent Admin] Add SportEvent Fail',
    props<{ error: string }>()
);

export const addEntitySuccess = createAction(
    '[SportEvent Admin] Add SportEvent Success',
    props<{ sportEvent: SportEventEntity }>()
);

export const loadEntity = createAction(
    '[SportEvent] Load SportEvent',
    props<{ uid: string }>()
);

export const loadEntitySuccess = createAction(
    '[SportEvent] Load SportEvent Success',
    props<{ sportEvent: SportEventEntity | null }>()
);

export const loadEntityFail = createAction(
    '[SportEvent] Load SportEvent Fail',
    props<{ error: string }>()
);

export const changeNewEntityButtonEnabled = createAction(
	'[SportEvent Admin] Change new Entity Button Enabled',
	props<{ enabled: boolean }>()
);

export const listEntities = createAction(
    '[SportEvent Admin] List SportEvents',
    props<{
        subCollectionPath?: string;
        pathParams?: string[];
        queryParams?: KeyValue<string, string>[]
    }>()
);

export const listEntitiesSuccess = createAction(
    '[SportEvent Admin] List SportEvents Success',
    props<{ sportEvents: SportEventEntity[] }>()
);

export const listEntitiesFail = createAction(
    '[SportEvent Admin] List SportEvents Fail',
    props<{ error: string }>()
);

export const selectEntity = createAction(
	'[SportEvent Admin] Select SportEvent',
	props<{ sportEvent: SportEventEntity | null }>()
);

export const selectEntitySuccess = createAction(
	'[SportEvent Admin] Select SportEvent Success',
	props<{ sportEvent: SportEventEntity }>()
);

export const updateEntity = createAction(
    '[SportEvent Admin] Update SportEvent',
    props<{
        sportEvent: SportEventEntityUpdate;
        subCollectionPath?: string;
    }>()
);

export const updateEntitySuccess = createAction(
    '[SportEvent Admin] Update SportEvent Success',
    props<{ sportEvent: Update<SportEventEntityUpdate> }>()
);

export const updateEntityFail = createAction(
    '[SportEvent Admin] Update SportEvent Fail',
    props<{ error: string }>()
);
