import { USER_FEATURE_KEY, UserEntity } from '@app/api/domain/user';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as UserActions from './user.actions';

export interface State extends EntityState<UserEntity> {
    isNewEntityButtonEnabled: boolean;
    selectedId?: string;
    loading: boolean;
    error?: string | null;
}

export interface UserPartialState {
    readonly [USER_FEATURE_KEY]: State;
}

export const userAdapter: EntityAdapter<UserEntity> =
    createEntityAdapter<UserEntity>({
        selectId: (model: UserEntity) => model.uid || '',
    });

export const initialState: State = userAdapter.getInitialState({
    isNewEntityButtonEnabled: false,
    loading: false,
});

const userReducer = createReducer(
    initialState,
    on(UserActions.addEntity, (state) => ({
        ...state,
        loading: false,
        error: null,
    })),
    on(UserActions.addEntitySuccess, (state, { user }) =>
        userAdapter.addOne(user, { ...state, loading: true })
    ),
    on(UserActions.addEntityFail, (state, { error }) => ({ ...state, error })),
    on(UserActions.changeNewEntityButtonEnabled, (state, { enabled }) => ({
        ...state,
        isNewEntityButtonEnabled: enabled,
    })),
    on(UserActions.loadEntity, UserActions.loadExistedUser, (state) => ({
        ...state,
        loading: false,
        error: null,
    })),
    on(
        UserActions.loadEntitySuccess,
        UserActions.loadExistedUserSuccess,
        (state, { user }) => {
            if (user) {
                return userAdapter.upsertOne({ ...user }, { ...state, loading: false });
            } else {
                return state;
            }
        }
    ),
    on(
        UserActions.loadEntityFail,
        UserActions.loadExistedUserFail,
        (state, { error }) => ({ ...state, error })
    ),
    on(UserActions.listEntities, (state) => ({
        ...state,
        loading: false,
        error: null,
    })),
    on(UserActions.listEntitiesSuccess, (state, { users }) =>
        userAdapter.upsertMany(users, { ...state, loading: true })
    ),
    on(UserActions.listEntitiesFail, (state, { error }) => ({ ...state, error })),
    on(UserActions.selectEntity, (state, { user }) => {
        return {
            ...state,
            selectedEntity: user,
        };
    }),
    on(UserActions.setSelectedEntityId, (state, { userId }) => ({
        ...state,
        selectedId: userId,
    })),
    on(UserActions.updateEntitySuccess, (state, { user }) =>
        userAdapter.updateOne(user, state)
    ),
    on(UserActions.updateEntityFail, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
    return userReducer(state, action);
}
