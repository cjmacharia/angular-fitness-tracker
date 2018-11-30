import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { UiService } from '../../shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	subscription: Subscription;
	isLoading = false;
	constructor(private authService: AuthService, private uiService: UiService) { }

	ngOnInit() {
		this.subscription = this.uiService.loadingStateChanged.subscribe(isLoading => this.isLoading = isLoading)
	}

	onSubmit(form: NgForm) {
		this.authService.login({
			email: form.value.email,
			password: form.value.password
		})
	}
}
