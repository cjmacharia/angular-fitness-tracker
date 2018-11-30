import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { Subject, Subscription } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { UiService } from '../shared/ui.service';

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

	constructor(private db: AngularFirestore) { }

	getExercise() {
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
			this.exercises = exercises;
			this.exercisesChanged.next([...this.exercises]);
		}))
	}

	startExercixe(selectedId: string) {
		this.runningExercise = this.exercises.find(
			ex => ex.id === selectedId);
		this.exerciseChanged.next({ ...this.runningExercise })
	}

	getRunningExercise() {
		return { ...this.runningExercise };
	}

	completeExercise() {
		this.addDatoDb({ ...this.runningExercise, date: new Date(), state: 'completed' });
		this.runningExercise = null;
		this.exerciseChanged.next(null);
	}

	cancelExercise(progress: number) {
		this.addDatoDb({
			...this.runningExercise,
			date: new Date(),
			duration: this.runningExercise.duration * (progress / 100),
			calories: this.runningExercise.calories * (progress / 100),
			state: 'canceled'
		});
		this.runningExercise = null;
		this.exerciseChanged.next(null);
	}

	fetch() {
		this.subs.push(this.db.collection('finishedExercises').valueChanges().subscribe((exercises: Exercise[]) => {
			this.finishedExercises.next(exercises);
		}))
	}

	addDatoDb(exercise: Exercise) {
		this.db.collection('finishedExercises').add(exercise);
	}

	cancelSubs() {
		this.subs.forEach(sub => sub.unsubscribe());
	}
}


