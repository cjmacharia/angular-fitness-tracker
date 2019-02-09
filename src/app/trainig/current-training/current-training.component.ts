import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training/stop-training.component';
import { TrainingService } from '../training.service';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';
import { take } from 'rxjs/operators';
@Component({
	selector: 'app-current-training',
	templateUrl: './current-training.component.html',
	styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
	progress = 0;
	timer;
	constructor(private dialog: MatDialog,
		private trainingSerive: TrainingService,
		private store: Store<fromTraining.State>) { }

	ngOnInit() {
		this.startOrResumetimer();
	}
	onStop() {
		clearInterval(this.timer);
		const dialogRef = this.dialog.open(StopTrainingComponent, {
			data: {
				progress: this.progress
			}
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.trainingSerive.cancelExercise(this.progress);
			} else {
				this.startOrResumetimer();
			}
		})
	}

	startOrResumetimer() {
		this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
			const step = ex.duration / 100 * 1000
			this.timer = setInterval(() => {
				this.progress = this.progress + 1;
				if (this.progress >= 100) {
					this.trainingSerive.completeExercise();
					clearInterval(this.timer);
				}
			}, step)
		})
	}


} 
