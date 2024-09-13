import { ROLE_FEATURE_KEY, RoleEntity } from '@app/api/domain/role';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as roleActions from './role.actions';

export interface State extends EntityState<RoleEntity> {
    isNewEntityButtonEnabled: boolean;
    selectedId?: string;
    selectedEntity: RoleEntity | null;
    loading: boolean;
    error?: string | null;
}

export interface RolePartialState {
    readonly [ROLE_FEATURE_KEY]: State;
}

export const roleAdapter: EntityAdapter<RoleEntity> =
    createEntityAdapter<RoleEntity>({
        selectId: (model: RoleEntity) => model.uid,
    });

export const initialState: State = roleAdapter.getInitialState({
    isNewEntityButtonEnabled: true,
    loading: false,
    selectedEntity: null,
});

const roleReducer = createReducer(
    initialState,
    on(roleActions.addEntity, (state) => ({
        ...state,
        loading: false,
        error: null,
    })),
    on(roleActions.addEntitySuccess, (state, { role }) =>
        roleAdapter.addOne(role, { ...state, loading: true })
    ),
    on(roleActions.addEntityFail, (state, { error }) => ({ ...state, error })),
    on(roleActions.changeNewEntityButtonEnabled, (state, { enabled }) => ({
        ...state,
        isNewEntityButtonEnabled: enabled,
    })),
    on(roleActions.loadEntity, (state) => ({
        ...state,
        loading: false,
        error: null,
    })),
    on(roleActions.loadEntitySuccess, (state, { role }) => {
        if (role) {
            return roleAdapter.upsertOne(role, { ...state, loading: false });
        } else {
            return state;
        }
    }),
    on(roleActions.loadEntityFail, (state, { error }) => ({ ...state, error })),
    on(roleActions.listEntities, (state) => ({
        ...state,
        loading: false,
        error: null,
    })),
    on(roleActions.listEntitiesSuccess, (state, { roles }) =>
        roleAdapter.upsertMany(roles, { ...state, loading: true })
    ),
    on(roleActions.listEntitiesFail, (state, { error }) => ({ ...state, error })),
    on(roleActions.selectEntity, (state, { role }) => {
        return {
            ...state,
            selectedEntity: role,
        };
    }),
    on(roleActions.updateEntitySuccess, (state, { role }) =>
        roleAdapter.updateOne(role, state)
    ),
    on(roleActions.updateEntityFail, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
    return roleReducer(state, action);
}
