import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';
import { UiService } from '../shared/ui.service';

@Component({
	selector: 'app-trainig',
	templateUrl: './trainig.component.html',
	styleUrls: ['./trainig.component.css']
})
export class TrainigComponent implements OnInit, OnDestroy {
	ongoingTraining = false;
	subscription: Subscription[] = [];
	constructor(private trainingService: TrainingService, private uiService: UiService) { }

	ngOnInit() {
		this.subscription.push(this.trainingService.exerciseChanged.subscribe(
			exercise => {
				if (exercise) {
					this.ongoingTraining = true;
				} else {
					this.ongoingTraining = false;
				}
			}
		))
	}

	ngOnDestroy() {
		this.subscription.forEach(sub => sub.unsubscribe);
	}
}
