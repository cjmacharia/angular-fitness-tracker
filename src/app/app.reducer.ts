import * as fromUi from './shared/ui.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth/auth.reducer';
export interface State {
	ui: fromUi.State;
	auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
	ui: fromUi.uireducer,
	auth: fromAuth.authReducer
}

export const getUiState = createFeatureSelector<fromUi.State>('ui');
export const getIsLoaing = createSelector(getUiState, fromUi.getIsLoading);
export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getisAuthenticated);