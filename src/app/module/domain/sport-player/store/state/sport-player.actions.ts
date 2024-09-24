import { KeyValue } from '@angular/common';

import {
    SportPlayerEntity,
    SportPlayerEntityAdd,
    SportPlayerEntityUpdate
} from '@app/api/domain/sport-player';
import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

export const addEntity = createAction(
    '[SportPlayer Admin] Add SportPlayer',
    props<{
        sportPlayer: SportPlayerEntityAdd,
        parentEntityId?: string;
    }>()
);

export const addEntityFail = createAction(
    '[SportPlayer Admin] Add SportPlayer Fail',
    props<{ error: string }>()
);

export const addEntitySuccess = createAction(
    '[SportPlayer Admin] Add SportPlayer Success',
    props<{ sportPlayer: SportPlayerEntity }>()
);

export const loadEntity = createAction(
    '[SportPlayer] Load SportPlayer',
    props<{ uid: string }>()
);

export const loadEntitySuccess = createAction(
    '[SportPlayer] Load SportPlayer Success',
    props<{ sportPlayer: SportPlayerEntity | null }>()
);

export const loadEntityFail = createAction(
    '[SportPlayer] Load SportPlayer Fail',
    props<{ error: string }>()
);

export const changeNewEntityButtonEnabled = createAction(
	'[SportPlayer Admin] Change new Entity Button Enabled',
	props<{ enabled: boolean }>()
); 

export const listEntities = createAction(
    '[SportPlayer Admin] List SportPlayers',
    props<{
        subCollectionPath?: string;
        pathParams?: string[];
        queryParams?: KeyValue<string, string>[]
    }>()
);

export const listEntitiesSuccess = createAction(
    '[SportPlayer Admin] List SportPlayers Success',
    props<{ sportPlayers: SportPlayerEntity[] }>()
);

export const listEntitiesFail = createAction(
    '[SportPlayer Admin] List SportPlayers Fail',
    props<{ error: string }>()
);

export const selectEntity = createAction(
	'[SportPlayer Admin] Select SportPlayer',
	props<{ sportPlayer: SportPlayerEntity | null }>()
);

export const selectEntitySuccess = createAction(
	'[SportPlayer Admin] Select SportPlayer Success',
	props<{ sportPlayer: SportPlayerEntity }>()
);

export const updateEntity = createAction(
    '[SportPlayer Admin] Update SportPlayer',
    props<{
        sportPlayer: SportPlayerEntityUpdate;
        subCollectionPath?: string;
    }>()
);

export const updateEntitySuccess = createAction(
    '[SportPlayer Admin] Update SportPlayer Success',
    props<{ sportPlayer: Update<SportPlayerEntityUpdate> }>()
);

export const updateEntityFail = createAction(
    '[SportPlayer Admin] Update SportPlayer Fail',
    props<{ error: string }>()
);
