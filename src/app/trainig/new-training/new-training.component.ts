import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
// import { AngularFirestore } from 'angularfire2/firestore'
import { Subscription, Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
import { UiService } from '../../shared/ui.service';
import * as fromTraining from '../training.reducer';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';
@Component({
	selector: 'app-new-training',
	templateUrl: './new-training.component.html',
	styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
	@Output() trainingStart = new EventEmitter<void>();
	exercises$: Observable<Exercise[]>;
	isLoading$: Observable<boolean>;
	// subscription: Subscription[] = [];
	constructor(private trainingService: TrainingService, private uiservice: UiService,
		private store: Store<fromTraining.State>) { }

	ngOnInit() {
		// this.subscription.push(this.uiservice.loadingStateChanged.subscribe(isLoading => {
		// 	console.log(isLoading)
		// 	this.isLoading = isLoading
		// }));
		// this.subscription.push(this.trainingService.exercisesChanged.subscribe(exercise => {
		// 	this.exercises = exercise;
		// }))
		this.isLoading$ = this.store.select(fromRoot.getIsLoaing);
		this.exercises$ = this.store.select(fromTraining.getAvailableTraining);
		this.trainingService.getExercise();

	}
	onStartTraining(form: NgForm) {
		this.trainingService.startExercixe(form.value.exercise);
	}

	// getExercise() {
	// 	// this.exercises = this.trainingService.getExercise();
	// }

}
