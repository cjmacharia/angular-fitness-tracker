import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Subscription } from 'rxjs';
import { UiService } from '../../shared/ui.service';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
	maxDate: Date;
	subscription: Subscription;
	isLoading = false;
	constructor(
		private authService: AuthService,
		private uiService: UiService) { }

	ngOnInit() {
		this.subscription = this.uiService.loadingStateChanged.subscribe(isLoading => {
			console.log(isLoading)
			this.isLoading = isLoading
		})
		this.maxDate = new Date()
		this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
	}
	onSubmit(form: NgForm) {
		this.authService.registerUser({
			email: form.value.email,
			password: form.value.password
		})
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

}