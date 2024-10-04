import { SPORT_EVENT_FEATURE_KEY, SportEventEntity } from '@app/api/domain/sport-event';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as sportEventActions from './sport-event.actions';

export interface State extends EntityState<SportEventEntity> {
  isNewEntityButtonEnabled: boolean;
  selectedId?: string;
  selectedEntity: SportEventEntity | null;
  loading: boolean;
  error?: string | null;
}

export interface SportEventPartialState {
  readonly [SPORT_EVENT_FEATURE_KEY]: State;
}

export const sportEventAdapter: EntityAdapter<SportEventEntity> =
  createEntityAdapter<SportEventEntity>({
    selectId: (model: SportEventEntity) => model.uid,
  });

export const initialState: State = sportEventAdapter.getInitialState({
  isNewEntityButtonEnabled: true,
  loading: false,
  selectedEntity: null,
});

const sportEventReducer = createReducer(
  initialState,
  on(sportEventActions.addEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(sportEventActions.addEntitySuccess, (state, { sportEvent }) =>
    sportEventAdapter.addOne(sportEvent, { ...state, loading: false })
  ),
  on(sportEventActions.addEntityFail, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(sportEventActions.changeNewEntityButtonEnabled, (state, { enabled }) => ({
    ...state,
    isNewEntityButtonEnabled: enabled,
  })),
  on(sportEventActions.loadEntity, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(sportEventActions.loadEntitySuccess, (state, { sportEvent }) => {
    if (sportEvent) {
      return sportEventAdapter.upsertOne(sportEvent, {
        ...state,
        loading: false,
      });
    } else {
      return state;
    }
  }),
  on(sportEventActions.loadEntityFail, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(sportEventActions.listEntities, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    sportEventActions.listEntitiesSuccess,
    sportEventActions.listEntitiesByIdsSuccess,
    (state, { sportEvents }) =>
      sportEventAdapter.upsertMany(sportEvents, {
        ...state,
        loading: false,
      })
  ),
  on(sportEventActions.listEntitiesFail, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(sportEventActions.selectEntity, (state, { sportEvent }) => {
    return {
      ...state,
      selectedEntity: sportEvent,
    };
  }),
  on(sportEventActions.updateEntitySuccess, (state, { sportEvent }) =>
    sportEventAdapter.updateOne(sportEvent, state)
  ),
  on(sportEventActions.updateEntityFail, (state, { error }) => ({
    ...state,
    error,
  })),
  on(sportEventActions.reset, (state) => sportEventAdapter.removeAll(state))
);

export function reducer(state: State | undefined, action: Action) {
  return sportEventReducer(state, action);
}
