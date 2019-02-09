import { Action } from "@ngrx/store";

export const SET_AUTHENTICATED = '[AUTH] set authenitcated';
export const SET_UNAUTHENTICATED = '[AUTH] set unauthenitcated';

export class setAuthenticated implements Action {
	readonly type = SET_AUTHENTICATED;
}

export class setUnAuthenticated implements Action {
	readonly type = SET_UNAUTHENTICATED;
}

export type AuthActions = setAuthenticated | setUnAuthenticated;