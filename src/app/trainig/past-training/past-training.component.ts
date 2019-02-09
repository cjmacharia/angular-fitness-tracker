import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';
@Component({
	selector: 'app-past-training',
	templateUrl: './past-training.component.html',
	styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
	displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
	dataSource = new MatTableDataSource<Exercise>();
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private trainingService: TrainingService, private store: Store<fromTraining.State>) { }

	ngOnInit() {

		this.trainingService.fetch();
		this.store.select(fromTraining.getFinishedTraining).subscribe((exercises: Exercise[]) => {
			this.dataSource.data = exercises;
		})

	}

	ngAfterViewInit() {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

	doFilter(value: string) {
		this.dataSource.filter = value.trim().toLowerCase();
	}

}
