import { KeyValue } from '@angular/common';

import {
    NetworkPlayerEntity,
    NetworkPlayerEntityAdd,
    NetworkPlayerEntityUpdate
} from '@app/api/domain/network-player';
import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

export const addEntity = createAction(
    '[NetworkPlayer Admin] Add NetworkPlayer',
    props<{
        networkPlayer: NetworkPlayerEntityAdd,
        subCollectionPath?: string;
    }>()
);

export const addEntityFail = createAction(
    '[NetworkPlayer Admin] Add NetworkPlayer Fail',
    props<{ error: string }>()
);

export const addEntitySuccess = createAction(
    '[NetworkPlayer Admin] Add NetworkPlayer Success',
    props<{ networkPlayer: NetworkPlayerEntity }>()
);

export const loadEntity = createAction(
    '[NetworkPlayer] Load NetworkPlayer',
    props<{ uid: string }>()
);

export const loadEntitySuccess = createAction(
    '[NetworkPlayer] Load NetworkPlayer Success',
    props<{ networkPlayer: NetworkPlayerEntity | null }>()
);

export const loadEntityFail = createAction(
    '[NetworkPlayer] Load NetworkPlayer Fail',
    props<{ error: string }>()
);

export const changeNewEntityButtonEnabled = createAction(
	'[NetworkPlayer Admin] Change new Entity Button Enabled',
	props<{ enabled: boolean }>()
);

export const listEntities = createAction(
    '[NetworkPlayer Admin] List NetworkPlayers',
    props<{
        subCollectionPath?: string;
        pathParams?: string[];
        queryParams?: KeyValue<string, string>[]
    }>()
);

export const listEntitiesSuccess = createAction(
    '[NetworkPlayer Admin] List NetworkPlayers Success',
    props<{ networkPlayers: NetworkPlayerEntity[] }>()
);

export const listEntitiesFail = createAction(
    '[NetworkPlayer Admin] List NetworkPlayers Fail',
    props<{ error: string }>()
);

export const selectEntity = createAction(
	'[NetworkPlayer Admin] Select NetworkPlayer',
	props<{ networkPlayer: NetworkPlayerEntity | null }>()
);

export const selectEntitySuccess = createAction(
	'[NetworkPlayer Admin] Select NetworkPlayer Success',
	props<{ networkPlayer: NetworkPlayerEntity }>()
);

export const updateEntity = createAction(
    '[NetworkPlayer Admin] Update NetworkPlayer',
    props<{
        networkPlayer: NetworkPlayerEntityUpdate;
        subCollectionPath?: string;
    }>()
);

export const updateEntitySuccess = createAction(
    '[NetworkPlayer Admin] Update NetworkPlayer Success',
    props<{ networkPlayer: Update<NetworkPlayerEntityUpdate> }>()
);

export const updateEntityFail = createAction(
    '[NetworkPlayer Admin] Update NetworkPlayer Fail',
    props<{ error: string }>()
);
