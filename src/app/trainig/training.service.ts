import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { Subject, Subscription } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { map, take } from 'rxjs/operators';
import { UiService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromTraining from './training.reducer';
import * as UI from '../shared/ui.actions';
import * as Training from './training.action';
@Injectable({
	providedIn: 'root'
})
export class TrainingService {
	exerciseChanged = new Subject<Exercise>();
	exercisesChanged = new Subject<Exercise[]>();
	finishedExercises = new Subject<Exercise[]>();
	subs: Subscription[] = [];
	private runningExercise: Exercise;
	exercises: Exercise[] = [];

	constructor(private db: AngularFirestore,
		private store: Store<fromTraining.State>) { }

	getExercise() {
		this.store.dispatch(new UI.StartLoading());
		this.subs.push(this.db.collection('availableExercises').snapshotChanges().pipe(map(docData => {
			return docData.map((doc: any) => {
				return {
					id: doc.payload.doc.id,
					name: doc.payload.doc.data().name,
					duration: doc.payload.doc.data().duration,
					calories: doc.payload.doc.data().calories,
					// name: doc.payload.doc.data().name,
				}
			})
		})).subscribe((exercises: Exercise[]) => {
			this.store.dispatch(new UI.StopLoading());
			this.store.dispatch(new Training.setAvailableTraining(exercises));
			// this.exercises = exercises;
			// this.exercisesChanged.next([...this.exercises]);
		}))
	}

	startExercixe(selectedId: string) {
		// this.runningExercise = this.exercises.find(
		// 	ex => ex.id === selectedId);
		// this.exerciseChanged.next({ ...this.runningExercise })
		this.store.dispatch(new Training.SetStartTraining(selectedId));

	}

	// getRunningExercise() {
	// 	return { ...this.runningExercise };
	// }

	completeExercise() {
		this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
			this.addDatoDb({ ...ex, date: new Date(), state: 'completed' });
		})
		this.store.dispatch(new Training.SetStopTraining());

		// this.runningExercise = null;
		// this.exerciseChanged.next(null);
	}

	cancelExercise(progress: number) {
		this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
			this.addDatoDb({
				...ex,
				date: new Date(),
				duration: ex.duration * (progress / 100),
				calories: ex.calories * (progress / 100),
				state: 'canceled'
			});
		})

		this.store.dispatch(new Training.SetStopTraining());

		// this.runningExercise = null;
		// this.exerciseChanged.next(null);
	}

	fetch() {
		this.subs.push(this.db.collection('finishedExercises').valueChanges().subscribe((exercises: Exercise[]) => {
			// this.finishedExercises.next(exercises);
			this.store.dispatch(new Training.SetFinishedTraining(exercises));

		}))
	}

	addDatoDb(exercise: Exercise) {
		this.db.collection('finishedExercises').add(exercise);
	}

	cancelSubs() {
		this.subs.forEach(sub => sub.unsubscribe());
	}
}


