import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainigComponent } from './trainig.component';
import { AuthGuardService } from '../auth-guard.service';

const routes: Routes = [
	{ path: 'training', component: TrainigComponent, canActivate: [AuthGuardService] }
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TrainingRoutingModule { }
