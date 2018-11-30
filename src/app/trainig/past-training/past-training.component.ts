import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
	selector: 'app-past-training',
	templateUrl: './past-training.component.html',
	styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
	displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
	dataSource = new MatTableDataSource<Exercise>();
	sub: Subscription
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private trainingService: TrainingService) { }

	ngOnInit() {
		this.trainingService.fetch();
		this.sub = this.trainingService.finishedExercises.subscribe((exercises: Exercise[]) => {
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

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

}
