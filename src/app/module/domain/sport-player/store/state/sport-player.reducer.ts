import { SportPlayerEntity, SPORT_PLAYER_FEATURE_KEY } from '@app/api/domain/sport-player';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as sportPlayerActions from './sport-player.actions';

export interface State extends EntityState<SportPlayerEntity> {
    isNewEntityButtonEnabled: boolean;
    selectedId?: string;
    selectedEntity: SportPlayerEntity | null;
    loading: boolean;
    error?: string | null;
}

export interface SportPlayerPartialState {
    readonly [SPORT_PLAYER_FEATURE_KEY]: State;
}

export const sportPlayerAdapter: EntityAdapter<SportPlayerEntity> =
    createEntityAdapter<SportPlayerEntity>({
        selectId: (model: SportPlayerEntity) => model.uid,
    });

export const initialState: State = sportPlayerAdapter.getInitialState({
    isNewEntityButtonEnabled: true,
    loading: false,
    selectedEntity: null
});

const sportPlayerReducer = createReducer(
    initialState,
    on(sportPlayerActions.addEntity, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(sportPlayerActions.addEntitySuccess, (state, { sportPlayer }) =>
        sportPlayerAdapter.addOne(sportPlayer, { ...state, loading: false })
    ),
    on(sportPlayerActions.addEntityFail, (state, { error }) => ({
        ...state, error, loading: false,
    })),
    on(sportPlayerActions.changeNewEntityButtonEnabled, (state, { enabled }) => ({
        ...state,
        isNewEntityButtonEnabled: enabled,
    })),
    on(sportPlayerActions.loadEntity, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(sportPlayerActions.loadEntitySuccess, (state, { sportPlayer }) => {
        if (sportPlayer) {
            return sportPlayerAdapter.upsertOne(sportPlayer, { ...state, loading: false });
        } else {
            return state;
        }
    }),
    on(sportPlayerActions.loadEntityFail, (state, { error }) => ({
        ...state, error, loading: false,
    })),
    on(sportPlayerActions.listEntities, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(sportPlayerActions.listEntitiesSuccess, (state, { sportPlayers }) =>
        sportPlayerAdapter. upsertMany(sportPlayers, {
            ...state, loading: false,
    })),
    on(sportPlayerActions.listEntitiesFail, (state, { error }) => ({
        ...state, error, loading: false,
    })),
    on(sportPlayerActions.selectEntity, (state, { sportPlayer }) => {
        return {
            ...state,
            selectedEntity: sportPlayer
        }
    }),
    on(sportPlayerActions.updateEntitySuccess, (state, { sportPlayer }) =>
        sportPlayerAdapter.updateOne(sportPlayer, state)
    ),
    on(sportPlayerActions.updateEntityFail, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
    return sportPlayerReducer(state, action);
}
