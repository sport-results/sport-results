import { USER_FEATURE_KEY, UserEntity } from '@app/api/domain/user';
import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State, userAdapter, UserPartialState } from './user.reducer';

export const getEntityState = createFeatureSelector<UserPartialState, State>(
    USER_FEATURE_KEY
);

const { selectAll, selectEntities, } = userAdapter.getSelectors();

export const getUserLoading = createSelector(
    getEntityState,
    (state: State) => state.loading
);

export const getError = createSelector(
    getEntityState,
    (state: State) => state.error
);

export const getEntities = createSelector(getEntityState, selectEntities);

export const getAllEntities = createSelector(getEntityState, selectAll);

export const getSelectedId = createSelector(
    getEntityState,
    (state: State) => state.selectedId || ''
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

export const getEntityById = (userId: string) =>
    createSelector(
        getEntities,
        (userEntities: Dictionary<UserEntity>) => {
            return userEntities[userId];
        }
    );
