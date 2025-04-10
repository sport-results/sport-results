import {
  NetworkPlayerEntity,
  NETWORK_PLAYER_FEATURE_KEY,
} from '@app/api/domain/network-player';
import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State, networkPlayerAdapter } from './network-player.reducer';

export const getEntityState = createFeatureSelector<State>(
  NETWORK_PLAYER_FEATURE_KEY
);

const { selectAll, selectEntities } = networkPlayerAdapter.getSelectors();

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
  createSelector(getEntities, (entities: Dictionary<NetworkPlayerEntity>) => {
    return entities[uid];
  });

export const getEntitiesBySportNetworkId = (sportNetworkId: string) =>
  createSelector(getAll, (networkPlayers: NetworkPlayerEntity[]) => {
    return (networkPlayers || []).filter(
      (networkPlayer) => networkPlayer.sportNetworkId === sportNetworkId
    );
  });
