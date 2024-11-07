import { ROLE_FEATURE_KEY, RoleEntity } from '@app/api/domain/role';
import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { roleAdapter, State } from './role.reducer';

export const getRoleState = createFeatureSelector<State>(ROLE_FEATURE_KEY);

const { selectAll, selectEntities } = roleAdapter.getSelectors();

export const getRoleLoading = createSelector(
    getRoleState,
    (state: State) => state.loading
);

export const getRoleError = createSelector(
    getRoleState,
    (state: State) => state.error
);

export const getAllRole = createSelector(getRoleState, (state: State) =>
    selectAll(state)
);

export const getRoleEntities = createSelector(getRoleState, (state: State) =>
    selectEntities(state)
);

export const getSelectedId = createSelector(
    getRoleState,
    (state: State) => state.selectedId || ''
);

export const selectSelectedEntity = createSelector(
    getRoleState,
    (state: State) => state.selectedEntity
);

export const isNewEntityButtonEnabled = createSelector(
    getRoleState,
    (state: State) => state.isNewEntityButtonEnabled
);

export const selectRole = createSelector(
    getRoleEntities,
    getSelectedId,
    (entities, selectedId) => entities[selectedId]
);

export const selectRoleById = (id: string) =>
    createSelector(getRoleEntities, (roleEntities: Dictionary<RoleEntity>) => {
        return roleEntities[id];
    });

    export const getEntitiesByIds = (ids: string[]) =>
      createSelector(getAllRole, (entities: RoleEntity[]) =>
        entities.filter((entity) => ids.includes(entity.uid))
      );
