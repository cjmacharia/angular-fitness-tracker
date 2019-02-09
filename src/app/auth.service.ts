import { Injectable } from '@angular/core';
import { User } from './auth/login/user.model';
import { Auth } from './auth/login/auth-data.model';
// import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth'
import { TrainingService } from './trainig/training.service';
import { UiService } from './shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app/app.reducer';
import * as UI from './shared/ui.actions';
import * as AuthActions from './auth/auth.actions';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	// authChange = new Subject<boolean>();
	// private isAuthenticated: boolean;
	constructor(private router: Router,
		private trainingService: TrainingService,
		private afAuth: AngularFireAuth,
		private uiService: UiService,
		private store: Store<{ ui: fromRoot.State }>) { }

	initAuthListener() {
		this.afAuth.authState.subscribe(user => {
			if (user) {
				this.store.dispatch(new AuthActions.setAuthenticated());
				// this.isAuthenticated = true;
				// this.authChange.next(true);
				this.router.navigate(['/training'])
			} else {
				this.trainingService.cancelSubs();
				this.afAuth.auth.signOut();
				this.store.dispatch(new AuthActions.setUnAuthenticated());
				// this.isAuthenticated = false;
				// this.authChange.next(false);
				this.router.navigate(['/login']);
			}
		})
	}

	registerUser(authData: Auth) {
		this.store.dispatch(new UI.StartLoading());
		this.afAuth.auth.createUserWithEmailAndPassword(
			authData.email,
			authData.password
		).then(result => {
			this.store.dispatch(new UI.StopLoading());
			// this.uiService.loadingStateChanged.next(false);
		}).catch(error => {
			this.store.dispatch(new UI.StopLoading());
			// this.uiService.loadingStateChanged.next(false);
			this.uiService.showSnackBar(error.message, null, 2000);
		});

	}

	login(authData: Auth) {
		this.store.dispatch(new UI.StartLoading());
		// this.uiService.loadingStateChanged.next(true);
		this.afAuth.auth.signInWithEmailAndPassword(
			authData.email,
			authData.password
		).then(result => {
			this.store.dispatch(new UI.StopLoading());
			// this.uiService.loadingStateChanged.next(false);
		}).catch(error => {
			this.store.dispatch(new UI.StopLoading());
			// this.uiService.loadingStateChanged.next(false);
			this.uiService.showSnackBar(error.message, null, 2000);
		});
	}
	logout() {
		this.afAuth.auth.signOut();
	}
	// isAuth() {
	// 	return this.isAuthenticated;
	// }

}
