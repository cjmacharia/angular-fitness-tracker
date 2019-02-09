import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { FlexLayoutModule } from '@angular/flex-layout';

import { TrainigComponent } from './trainig.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { StopTrainingComponent } from './current-training/stop-training/stop-training.component';
// import { MaterialModule } from '../material';
import { SharedModule } from '../shared/shared.module';
import { TrainingRoutingModule } from './training-routing.module';
import { StoreModule } from '@ngrx/store';
import { trainingReducer } from './training.reducer';

@NgModule({
	declarations: [
		TrainigComponent,
		CurrentTrainingComponent,
		NewTrainingComponent,
		PastTrainingComponent,
		StopTrainingComponent
	],
	imports: [
		SharedModule,
		TrainingRoutingModule,
		StoreModule.forFeature('training', trainingReducer)
	],
	entryComponents: [StopTrainingComponent]
})
export class TrainingModule { }
