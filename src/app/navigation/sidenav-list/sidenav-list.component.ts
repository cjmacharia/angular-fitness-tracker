import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
@Component({
	selector: 'app-sidenav-list',
	templateUrl: './sidenav-list.component.html',
	styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
	@Output() closeSidenav = new EventEmitter<void>();
	subscription: Subscription;
	isAuth$: Observable<boolean>;
	constructor(private authService: AuthService,
		private store: Store<fromRoot.State>) { }

	ngOnInit() {
		this.isAuth$ = this.store.select(fromRoot.getIsAuth)
		// this.subscription = this.authService.authChange.subscribe(authStatus => {
		// 	this.isAuth = authStatus;
		// })
	}

	onLogout() {
		this.authService.logout();
	}
	onClose() {
		this.closeSidenav.emit();
	}
}
