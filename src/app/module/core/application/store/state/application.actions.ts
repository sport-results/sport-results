
import { User } from '@app/api/common';
import { createAction, props } from '@ngrx/store';

export const getAuthenticatedUser = createAction('[Auth] Get Authenticated User');

export const authenticated = createAction(
	'[Auth] Authenticated',
	props<{ user: User }>()
);

export const notAuthenticated = createAction('[Auth] Not Authenticated');

export const login = createAction('[Authentication] Login Attempt');

export const loginSuccess = createAction(
	'[Authentication] Login Success',
	props<{ user: User }>()
);

export const logout = createAction('[Auth] Logout');

export const logoutSuccess = createAction('[Auth] Logout Success');

export const authError = createAction(
	'[Authentication] Error',
	props<{ error: string }>()
);

export const loadExistedUser = createAction(
	'[Authentication] Load Existed User',
	props<{ user: User }>()
);
export const loadExistedUserSuccess = createAction(
	'[Authentication] Load Existed User Success',
	props<{ user: User }>()
);

export const loadExistedUserFail = createAction(
	'[Authentication] Load Existed User Fail',
	props<{ error: string }>()
);

export const setCheckpointId = createAction(
	'[Authentication] Set Checkpoint Id',
	props<{ checkpointId: number }>()
);

export const testLogin = createAction('[Authentication] Test Login', props<{ user: User }>());

export const testLoginSuccess = createAction(
	'[Authentication] Test Login Success',
	props<{ user: User }>()
);
