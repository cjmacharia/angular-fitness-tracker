import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training/stop-training.component';
import { TrainingService } from '../training.service';

@Component({
	selector: 'app-current-training',
	templateUrl: './current-training.component.html',
	styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
	progress = 0;
	timer;
	constructor(private dialog: MatDialog, private trainingSerive: TrainingService) { }

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
		const step = this.trainingSerive.getRunningExercise().duration / 100 * 1000
		this.timer = setInterval(() => {
			this.progress = this.progress + 1;
			if (this.progress >= 100) {
				this.trainingSerive.completeExercise();
				clearInterval(this.timer);
			}
		}, step)
	}

} 
