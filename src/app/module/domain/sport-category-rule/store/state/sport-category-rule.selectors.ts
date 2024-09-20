import { SportCategoryRuleEntity, SPORT_CATEGORY_RULE_FEATURE_KEY } from '@app/api/domain/sport-category-rule';
import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State, sportCategoryRuleAdapter } from './sport-category-rule.reducer';

export const getEntityState = createFeatureSelector<State>(SPORT_CATEGORY_RULE_FEATURE_KEY);

const { selectAll, selectEntities } = sportCategoryRuleAdapter.getSelectors();

export const getEntityLoading = createSelector(
    getEntityState,
    (state: State) => state.loading
);

export const getEntityError = createSelector(
    getEntityState,
    (state: State) => state.error
);

export const getAll = createSelector(getEntityState, (state: State) =>
    selectAll(state)
);

export const getEntities = createSelector(getEntityState, (state: State) =>
    selectEntities(state)
);

export const getSelectedId = createSelector(
    getEntityState,
    (state: State) => state.selectedId || ''
);

export const getSelectedEntity = createSelector(
    getEntityState,
    (state: State) => state.selectedEntity
);

export const isNewEntityButtonEnabled = createSelector(
	getEntityState,
	(state: State) => state.isNewEntityButtonEnabled
);

export const getEntity = createSelector(
    getEntities,
    getSelectedId,
    (entities, selectedId) => entities[selectedId]
);

export const getEntityById = (uid: string) =>
    createSelector(getEntities, (entities: Dictionary<SportCategoryRuleEntity>) => {
        return entities[uid];
    });

    export const getRulesByCategoryId = (categoryId: string) =>
        createSelector(getAll, (rules: SportCategoryRuleEntity[]) => {
            return (rules || []).filter(rule => rule.sportCategory?.uid === categoryId);
        });
