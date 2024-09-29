import { SportEventEntity, SPORT_EVENT_FEATURE_KEY } from '@app/api/domain/sport-event';
import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State, sportEventAdapter } from './sport-event.reducer';

export const getEntityState = createFeatureSelector<State>(SPORT_EVENT_FEATURE_KEY);

const { selectAll, selectEntities } = sportEventAdapter.getSelectors();

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
    createSelector(getEntities, (entities: Dictionary<SportEventEntity>) => {
        return entities[uid];
    });
