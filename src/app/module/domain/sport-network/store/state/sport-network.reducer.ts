import { SportNetworkEntity, SPORT_NETWORK_FEATURE_KEY } from '@app/api/domain/sport-network';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as sportNetworkActions from './sport-network.actions';

export interface State extends EntityState<SportNetworkEntity> {
    isNewEntityButtonEnabled: boolean;
    selectedId?: string;
    selectedEntity: SportNetworkEntity | null;
    loading: boolean;
    error?: string | null;
}

export interface SportNetworkPartialState {
    readonly [SPORT_NETWORK_FEATURE_KEY]: State;
}

export const sportNetworkAdapter: EntityAdapter<SportNetworkEntity> =
    createEntityAdapter<SportNetworkEntity>({
        selectId: (model: SportNetworkEntity) => model.uid,
    });

export const initialState: State = sportNetworkAdapter.getInitialState({
    isNewEntityButtonEnabled: true,
    loading: false,
    selectedEntity: null
});

const sportNetworkReducer = createReducer(
    initialState,
    on(sportNetworkActions.addEntity, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(sportNetworkActions.addEntitySuccess, (state, { sportNetwork }) =>
        sportNetworkAdapter.addOne(sportNetwork, { ...state, loading: false })
    ),
    on(sportNetworkActions.addEntityFail, (state, { error }) => ({
        ...state, error, loading: false,
    })),
    on(sportNetworkActions.changeNewEntityButtonEnabled, (state, { enabled }) => ({
        ...state,
        isNewEntityButtonEnabled: enabled,
    })),
    on(sportNetworkActions.loadEntity, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(sportNetworkActions.loadEntitySuccess, (state, { sportNetwork }) => {
        if (sportNetwork) {
            return sportNetworkAdapter.upsertOne(sportNetwork, { ...state, loading: false });
        } else {
            return state;
        }
    }),
    on(sportNetworkActions.loadEntityFail, (state, { error }) => ({
        ...state, error, loading: false,
    })),
    on(sportNetworkActions.listEntities, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(sportNetworkActions.listEntitiesSuccess, (state, { sportNetworks }) =>
        sportNetworkAdapter. upsertMany(sportNetworks, {
            ...state, loading: false,
    })),
    on(sportNetworkActions.listEntitiesFail, (state, { error }) => ({
        ...state, error, loading: false,
    })),
    on(sportNetworkActions.selectEntity, (state, { sportNetwork }) => {
        return {
            ...state,
            selectedEntity: sportNetwork
        }
    }),
    on(sportNetworkActions.updateEntitySuccess, (state, { sportNetwork }) =>
        sportNetworkAdapter.updateOne(sportNetwork, state)
    ),
    on(sportNetworkActions.updateEntityFail, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
    return sportNetworkReducer(state, action);
}
