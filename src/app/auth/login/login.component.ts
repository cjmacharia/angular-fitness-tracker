import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { UiService } from '../../shared/ui.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	isLoading$: Observable<boolean>;
	constructor(private authService: AuthService,

		private store: Store<{ ui: fromRoot.State }>) { }

	ngOnInit() {
		this.isLoading$ = this.store.select(fromRoot.getIsLoaing);
		// this.store.subscribe(data => console.log(data))
		// this.subscription = this.uiService.loadingStateChanged.subscribe(isLoading => this.isLoading = isLoading)
	}

	onSubmit(form: NgForm) {
		this.authService.login({
			email: form.value.email,
			password: form.value.password
		})
	}
}
