import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainigComponent } from './trainig.component';


const routes: Routes = [
	{ path: '', component: TrainigComponent }
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TrainingRoutingModule { }
