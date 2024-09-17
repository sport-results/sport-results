import { SportCategoryRuleEntity, SPORT_CATEGORY_RULE_FEATURE_KEY } from '@app/api/domain/sport-category-rule';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as sportCategoryRuleActions from './sport-category-rule.actions';

export interface State extends EntityState<SportCategoryRuleEntity> {
    isNewEntityButtonEnabled: boolean;
    selectedId?: string;
    selectedEntity: SportCategoryRuleEntity | null;
    loading: boolean;
    error?: string | null;
}

export interface SportCategoryRulePartialState {
    readonly [SPORT_CATEGORY_RULE_FEATURE_KEY]: State;
}

export const sportCategoryRuleAdapter: EntityAdapter<SportCategoryRuleEntity> =
    createEntityAdapter<SportCategoryRuleEntity>({
        selectId: (model: SportCategoryRuleEntity) => model.uid,
    });

export const initialState: State = sportCategoryRuleAdapter.getInitialState({
    isNewEntityButtonEnabled: true,
    loading: false,
    selectedEntity: null
});

const sportCategoryRuleReducer = createReducer(
    initialState,
    on(sportCategoryRuleActions.addEntity, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(sportCategoryRuleActions.addEntitySuccess, (state, { sportCategoryRule }) =>
        sportCategoryRuleAdapter.addOne(sportCategoryRule, { ...state, loading: false })
    ),
    on(sportCategoryRuleActions.addEntityFail, (state, { error }) => ({
        ...state, error, loading: false,
    })),
    on(sportCategoryRuleActions.changeNewEntityButtonEnabled, (state, { enabled }) => ({
        ...state,
        isNewEntityButtonEnabled: enabled,
    })),
    on(sportCategoryRuleActions.loadEntity, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(sportCategoryRuleActions.loadEntitySuccess, (state, { sportCategoryRule }) => {
        if (sportCategoryRule) {
            return sportCategoryRuleAdapter.upsertOne(sportCategoryRule, { ...state, loading: false });
        } else {
            return state;
        }
    }),
    on(sportCategoryRuleActions.loadEntityFail, (state, { error }) => ({
        ...state, error, loading: false,
    })),
    on(sportCategoryRuleActions.listEntities, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(sportCategoryRuleActions.listEntitiesSuccess, (state, { sportCategoryRules }) =>
        sportCategoryRuleAdapter. upsertMany(sportCategoryRules, {
            ...state, loading: false,
    })),
    on(sportCategoryRuleActions.listEntitiesFail, (state, { error }) => ({
        ...state, error, loading: false,
    })),
    on(sportCategoryRuleActions.selectEntity, (state, { sportCategoryRule }) => {
        return {
            ...state,
            selectedEntity: sportCategoryRule
        }
    }),
    on(sportCategoryRuleActions.updateEntitySuccess, (state, { sportCategoryRule }) =>
        sportCategoryRuleAdapter.updateOne(sportCategoryRule, state)
    ),
    on(sportCategoryRuleActions.updateEntityFail, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
    return sportCategoryRuleReducer(state, action);
}
