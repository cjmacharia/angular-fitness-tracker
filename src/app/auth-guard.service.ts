import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { AuthService } from './auth.service';
import * as fromRoot from './app.reducer';
import { Store } from '@ngrx/store';
@Injectable({
	providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

	constructor(private authService: AuthService,
		private router: Router,
		private store: Store<fromRoot.State>
	) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		return this.store.select(fromRoot.getIsAuth);
	}
	canLoad(route: Route) {
		return this.store.select(fromRoot.getIsAuth);
	}
}
