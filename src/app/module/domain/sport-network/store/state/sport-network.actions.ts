import { KeyValue } from '@angular/common';

import {
    SportNetworkEntity,
    SportNetworkEntityAdd,
    SportNetworkEntityUpdate
} from '@app/api/domain/sport-network';
import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

export const addEntity = createAction(
    '[SportNetwork Admin] Add SportNetwork',
    props<{
        sportNetwork: SportNetworkEntityAdd,
        parentEntityId?: string;
    }>()
);

export const addEntityFail = createAction(
    '[SportNetwork Admin] Add SportNetwork Fail',
    props<{ error: string }>()
);

export const addEntitySuccess = createAction(
    '[SportNetwork Admin] Add SportNetwork Success',
    props<{ sportNetwork: SportNetworkEntity }>()
);

export const loadEntity = createAction(
    '[SportNetwork] Load SportNetwork',
    props<{ uid: string }>()
);

export const loadEntitySuccess = createAction(
    '[SportNetwork] Load SportNetwork Success',
    props<{ sportNetwork: SportNetworkEntity | null }>()
);

export const loadEntityFail = createAction(
    '[SportNetwork] Load SportNetwork Fail',
    props<{ error: string }>()
);

export const changeNewEntityButtonEnabled = createAction(
	'[SportNetwork Admin] Change new Entity Button Enabled',
	props<{ enabled: boolean }>()
); 

export const listEntities = createAction(
    '[SportNetwork Admin] List SportNetworks',
    props<{
        subCollectionPath?: string;
        pathParams?: string[];
        queryParams?: KeyValue<string, string>[]
    }>()
);

export const listEntitiesSuccess = createAction(
    '[SportNetwork Admin] List SportNetworks Success',
    props<{ sportNetworks: SportNetworkEntity[] }>()
);

export const listEntitiesFail = createAction(
    '[SportNetwork Admin] List SportNetworks Fail',
    props<{ error: string }>()
);

export const selectEntity = createAction(
	'[SportNetwork Admin] Select SportNetwork',
	props<{ sportNetwork: SportNetworkEntity | null }>()
);

export const selectEntitySuccess = createAction(
	'[SportNetwork Admin] Select SportNetwork Success',
	props<{ sportNetwork: SportNetworkEntity }>()
);

export const updateEntity = createAction(
    '[SportNetwork Admin] Update SportNetwork',
    props<{
        sportNetwork: SportNetworkEntityUpdate;
        subCollectionPath?: string;
    }>()
);

export const updateEntitySuccess = createAction(
    '[SportNetwork Admin] Update SportNetwork Success',
    props<{ sportNetwork: Update<SportNetworkEntityUpdate> }>()
);

export const updateEntityFail = createAction(
    '[SportNetwork Admin] Update SportNetwork Fail',
    props<{ error: string }>()
);
