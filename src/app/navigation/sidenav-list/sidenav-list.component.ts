import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-sidenav-list',
	templateUrl: './sidenav-list.component.html',
	styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
	@Output() closeSidenav = new EventEmitter<void>();
	subscription: Subscription;
	isAuth: boolean;
	constructor(private authService: AuthService) { }

	ngOnInit() {
		this.subscription = this.authService.authChange.subscribe(authStatus => {
			this.isAuth = authStatus;
		})
	}

	onLogout() {
		this.authService.logout();
	}
	onClose() {
		this.closeSidenav.emit();
	}
}
