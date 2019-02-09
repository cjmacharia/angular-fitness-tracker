import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { TrainingService } from './training.service';
import { UiService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromTraining from './training.reducer';

@Component({
	selector: 'app-trainig',
	templateUrl: './trainig.component.html',
	styleUrls: ['./trainig.component.css']
})
export class TrainigComponent implements OnInit {
	ongoingTraining$: Observable<boolean>;
	subscription: Subscription[] = [];
	constructor(private trainingService: TrainingService,
		private uiService: UiService,
		private store: Store<fromTraining.State>) { }

	ngOnInit() {
		this.ongoingTraining$ = this.store.select(fromTraining.getIsTraining);
		// this.subscription.push(this.trainingService.exerciseChanged.subscribe(
		// 	exercise => {
		// 		if (exercise) {
		// 			this.ongoingTraining = true;
		// 		} else {
		// 			this.ongoingTraining = false;
		// 		}
		// 	}
		// ))
	}

}
