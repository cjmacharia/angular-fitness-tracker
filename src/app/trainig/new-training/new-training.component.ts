import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore'
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UiService } from '../../shared/ui.service';

@Component({
	selector: 'app-new-training',
	templateUrl: './new-training.component.html',
	styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
	@Output() trainingStart = new EventEmitter<void>();
	exercises: Exercise[];
	isLoading = false;
	subscription: Subscription[] = [];
	constructor(private trainingService: TrainingService, private uiservice: UiService) { }

	ngOnInit() {
		this.subscription.push(this.uiservice.loadingStateChanged.subscribe(isLoading => {
			console.log(isLoading)
			this.isLoading = isLoading
		}));
		this.trainingService.getExercise()
		this.subscription.push(this.trainingService.exercisesChanged.subscribe(exercise => {
			this.exercises = exercise;
		}))
	}
	onStartTraining(form: NgForm) {
		this.trainingService.startExercixe(form.value.exercise);
	}

	getExercise() {
		// this.exercises = this.trainingService.getExercise();
	}

	ngOnDestroy() {
		this.subscription.forEach(sub => sub.unsubscribe());
	}
}
