import { SportCategoryEntity, SPORT_CATEGORY_FEATURE_KEY } from '@app/api/domain/sport-category';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as sportCategoryActions from './sport-category.actions';

export interface State extends EntityState<SportCategoryEntity> {
    isNewEntityButtonEnabled: boolean;
    selectedId?: string;
    selectedEntity: SportCategoryEntity | null;
    loading: boolean;
    error?: string | null;
}

export interface SportCategoryPartialState {
    readonly [SPORT_CATEGORY_FEATURE_KEY]: State;
}

export const sportCategoryAdapter: EntityAdapter<SportCategoryEntity> =
    createEntityAdapter<SportCategoryEntity>({
        selectId: (model: SportCategoryEntity) => model.uid,
    });

export const initialState: State = sportCategoryAdapter.getInitialState({
    isNewEntityButtonEnabled: true,
    loading: false,
    selectedEntity: null
});

const sportCategoryReducer = createReducer(
    initialState,
    on(sportCategoryActions.addEntity, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(sportCategoryActions.addEntitySuccess, (state, { sportCategory }) =>
        sportCategoryAdapter.addOne(sportCategory, { ...state, loading: false })
    ),
    on(sportCategoryActions.addEntityFail, (state, { error }) => ({
        ...state, error, loading: false,
    })),
    on(sportCategoryActions.changeNewEntityButtonEnabled, (state, { enabled }) => ({
        ...state,
        isNewEntityButtonEnabled: enabled,
    })),
    on(sportCategoryActions.loadEntity, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(sportCategoryActions.loadEntitySuccess, (state, { sportCategory }) => {
        if (sportCategory) {
            return sportCategoryAdapter.upsertOne(sportCategory, { ...state, loading: false });
        } else {
            return state;
        }
    }),
    on(sportCategoryActions.loadEntityFail, (state, { error }) => ({
        ...state, error, loading: false,
    })),
    on(sportCategoryActions.listEntities, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(sportCategoryActions.listEntitiesSuccess, (state, { sportCategorys }) =>
        sportCategoryAdapter. upsertMany(sportCategorys, {
            ...state, loading: false,
    })),
    on(sportCategoryActions.listEntitiesFail, (state, { error }) => ({
        ...state, error, loading: false,
    })),
    on(sportCategoryActions.selectEntity, (state, { sportCategory }) => {
        return {
            ...state,
            selectedEntity: sportCategory
        }
    }),
    on(sportCategoryActions.updateEntitySuccess, (state, { sportCategory }) =>
        sportCategoryAdapter.updateOne(sportCategory, state)
    ),
    on(sportCategoryActions.updateEntityFail, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
    return sportCategoryReducer(state, action);
}
