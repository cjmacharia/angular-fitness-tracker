import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
	@Output() sidenavToggle = new EventEmitter<void>();
	isAuth: boolean;
	subscription: Subscription
	constructor(private authService: AuthService) { }

	ngOnInit() {
		this.subscription = this.authService.authChange.subscribe(authStatus => {
			this.isAuth = authStatus
		})
	}
	onToggle() {
		this.sidenavToggle.emit();
	}
	onClick() {
		this.authService.logout();
	}
	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

}
