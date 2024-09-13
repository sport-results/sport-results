
import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
	ApplicationPartialState,
	ApplicationState,
} from './application.reducer';
import { APPLICATION_FEATURE_KEY } from '@app/api/core/application';

export const selectApplicationState = createFeatureSelector<
	ApplicationPartialState,
	ApplicationState
>(APPLICATION_FEATURE_KEY);

export const selectAuthenticatedUser = createSelector(
	selectApplicationState,
	(state: ApplicationState) => state.authenticatedUser
);

export const selectIsAuthenticated = createSelector(
	selectApplicationState,
	(state: ApplicationState) => !!state.authenticatedUser
);

export const selectLoading = (state: ApplicationPartialState) =>
	state.application.loading;

export const selectCheckpointId = (state: ApplicationPartialState) =>
	state.application.checkpointId;
