import { SportResultEntity, SPORT_RESULT_FEATURE_KEY } from '@app/api/domain/sport-result';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as sportResultActions from './sport-result.actions';

export interface State extends EntityState<SportResultEntity> {
    isNewEntityButtonEnabled: boolean;
    selectedId?: string;
    selectedEntity: SportResultEntity | null;
    loading: boolean;
    error?: string | null;
}

export interface SportResultPartialState {
    readonly [SPORT_RESULT_FEATURE_KEY]: State;
}

export const sportResultAdapter: EntityAdapter<SportResultEntity> =
    createEntityAdapter<SportResultEntity>({
        selectId: (model: SportResultEntity) => model.uid,
    });

export const initialState: State = sportResultAdapter.getInitialState({
    isNewEntityButtonEnabled: true,
    loading: false,
    selectedEntity: null
});

const sportResultReducer = createReducer(
    initialState,
    on(sportResultActions.addEntity, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(sportResultActions.addEntitySuccess, (state, { sportResult }) =>
        sportResultAdapter.addOne(sportResult, { ...state, loading: false })
    ),
    on(sportResultActions.addEntityFail, (state, { error }) => ({
        ...state, error, loading: false,
    })),
    on(sportResultActions.changeNewEntityButtonEnabled, (state, { enabled }) => ({
        ...state,
        isNewEntityButtonEnabled: enabled,
    })),
    on(sportResultActions.loadEntity, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(sportResultActions.loadEntitySuccess, (state, { sportResult }) => {
        if (sportResult) {
            return sportResultAdapter.upsertOne(sportResult, { ...state, loading: false });
        } else {
            return state;
        }
    }),
    on(sportResultActions.loadEntityFail, (state, { error }) => ({
        ...state, error, loading: false,
    })),
    on(sportResultActions.listEntities, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(sportResultActions.listEntitiesSuccess, (state, { sportResults }) =>
        sportResultAdapter. upsertMany(sportResults, {
            ...state, loading: false,
    })),
    on(sportResultActions.listEntitiesFail, (state, { error }) => ({
        ...state, error, loading: false,
    })),
    on(sportResultActions.selectEntity, (state, { sportResult }) => {
        return {
            ...state,
            selectedEntity: sportResult
        }
    }),
    on(sportResultActions.updateEntitySuccess, (state, { sportResult }) =>
        sportResultAdapter.updateOne(sportResult, state)
    ),
    on(sportResultActions.updateEntityFail, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
    return sportResultReducer(state, action);
}
