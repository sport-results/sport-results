import { createReducer, on } from '@ngrx/store';

import * as applicationActions from './application.actions';
import { APPLICATION_FEATURE_KEY } from '@app/api/core/application';
import { User } from '@app/api/common';

export interface ApplicationState {
  authenticatedUser: User | null;
  checkpointId: number;
  loading: boolean;
  error: string | null;
}

export interface ApplicationPartialState {
  readonly [APPLICATION_FEATURE_KEY]: ApplicationState;
}

const defaultState: ApplicationState = {
 authenticatedUser: null,
 checkpointId: 0,
 error: null,
 loading: false,
};

export const applicationReducer = createReducer(
 defaultState,
  on(applicationActions.getAuthenticatedUser, (state) => ({ ...state, loading: true })),
  on(applicationActions.authenticated, (state, { user }) => {
    return {
      ...state,
      authenticatedUser: user,
      loading: false,
    };
  }),
  on(applicationActions.notAuthenticated, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(applicationActions.logout, (state) => {
    return {
      ...state,
      authenticatedUser: null,
      loading: false,
    };
  }),
  on(applicationActions.loginSuccess, (state, { user }) => ({
    ...state,
    authenticatedUser: user,
  })),
  on(applicationActions.setCheckpointId, (state, { checkpointId }) => ({
    ...state,
    checkpointId: checkpointId,
  })),
  on(applicationActions.authError, (state) => ({
    ...state,
    authenticatedUser: null,
    loading: false,
  }))
);
