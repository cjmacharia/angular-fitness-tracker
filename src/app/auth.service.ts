import { Injectable } from '@angular/core';
import { User } from './auth/login/user.model';
import { Auth } from './auth/login/auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth'
import { TrainingService } from './trainig/training.service';
import { MatSnackBar } from '@angular/material';
import { UiService } from './shared/ui.service';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	authChange = new Subject<boolean>();
	private isAuthenticated: boolean;
	constructor(private router: Router,
		private trainingService: TrainingService,
		private afAuth: AngularFireAuth,
		private uiService: UiService) { }

	initAuthListener() {
		this.afAuth.authState.subscribe(user => {
			if (user) {
				this.isAuthenticated = true;
				this.authChange.next(true);
				this.router.navigate(['/training'])
			} else {
				this.trainingService.cancelSubs();
				this.afAuth.auth.signOut();
				this.isAuthenticated = false;
				this.authChange.next(false);
				this.router.navigate(['/login']);
			}
		})
	}

	registerUser(authData: Auth) {
		this.uiService.loadingStateChanged.next(true);
		this.afAuth.auth.createUserWithEmailAndPassword(
			authData.email,
			authData.password
		).then(result => {
			this.uiService.loadingStateChanged.next(false);
		}).catch(error => {
			this.uiService.loadingStateChanged.next(false);
			this.uiService.showSnackBar(error.message, null, 2000);
		});

	}

	login(authData: Auth) {
		this.uiService.loadingStateChanged.next(true);
		this.afAuth.auth.signInWithEmailAndPassword(
			authData.email,
			authData.password
		).then(result => {
			this.uiService.loadingStateChanged.next(false);
		}).catch(error => {
			this.uiService.loadingStateChanged.next(false);
			this.uiService.showSnackBar(error.message, null, 2000);
		});
	}
	logout() {
		this.afAuth.auth.signOut();
	}
	isAuth() {
		return this.isAuthenticated;
	}

}
