import { NetworkPlayerEntity, NETWORK_PLAYER_FEATURE_KEY } from '@app/api/domain/network-player';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as networkPlayerActions from './network-player.actions';

export interface State extends EntityState<NetworkPlayerEntity> {
    isNewEntityButtonEnabled: boolean;
    selectedId?: string;
    selectedEntity: NetworkPlayerEntity | null;
    loading: boolean;
    error?: string | null;
}

export interface NetworkPlayerPartialState {
    readonly [NETWORK_PLAYER_FEATURE_KEY]: State;
}

export const networkPlayerAdapter: EntityAdapter<NetworkPlayerEntity> =
    createEntityAdapter<NetworkPlayerEntity>({
        selectId: (model: NetworkPlayerEntity) => model.uid,
    });

export const initialState: State = networkPlayerAdapter.getInitialState({
    isNewEntityButtonEnabled: true,
    loading: false,
    selectedEntity: null
});

const networkPlayerReducer = createReducer(
    initialState,
    on(networkPlayerActions.addEntity, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(networkPlayerActions.addEntitySuccess, (state, { networkPlayer }) =>
        networkPlayerAdapter.addOne(networkPlayer, { ...state, loading: false })
    ),
    on(networkPlayerActions.addEntityFail, (state, { error }) => ({
        ...state, error, loading: false,
    })),
    on(networkPlayerActions.changeNewEntityButtonEnabled, (state, { enabled }) => ({
        ...state,
        isNewEntityButtonEnabled: enabled,
    })),
    on(networkPlayerActions.loadEntity, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(networkPlayerActions.loadEntitySuccess, (state, { networkPlayer }) => {
        if (networkPlayer) {
            return networkPlayerAdapter.upsertOne(networkPlayer, { ...state, loading: false });
        } else {
            return state;
        }
    }),
    on(networkPlayerActions.loadEntityFail, (state, { error }) => ({
        ...state, error, loading: false,
    })),
    on(networkPlayerActions.listEntities, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(networkPlayerActions.listEntitiesSuccess, (state, { networkPlayers }) =>
        networkPlayerAdapter. upsertMany(networkPlayers, {
            ...state, loading: false,
    })),
    on(networkPlayerActions.listEntitiesFail, (state, { error }) => ({
        ...state, error, loading: false,
    })),
    on(networkPlayerActions.selectEntity, (state, { networkPlayer }) => {
        return {
            ...state,
            selectedEntity: networkPlayer
        }
    }),
    on(networkPlayerActions.updateEntitySuccess, (state, { networkPlayer }) =>
        networkPlayerAdapter.updateOne(networkPlayer, state)
    ),
    on(networkPlayerActions.updateEntityFail, (state, { error }) => ({ ...state, error })),
    on(networkPlayerActions.reset, (state) => (networkPlayerAdapter.removeAll(state)))
);

export function reducer(state: State | undefined, action: Action) {
    return networkPlayerReducer(state, action);
}
