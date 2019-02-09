import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	@Output() sidenavToggle = new EventEmitter<void>();
	isAuth$: Observable<boolean>;
	subscription: Subscription
	constructor(private authService: AuthService,
		private store: Store<fromRoot.State>) { }

	ngOnInit() {
		this.isAuth$ = this.store.select(fromRoot.getIsAuth);
		// this.subscription = this.authService.authChange.subscribe(authStatus => {
		// 	this.isAuth = authStatus
		// })
	}
	onToggle() {
		this.sidenavToggle.emit();
	}
	onClick() {
		this.authService.logout();
	}

}
