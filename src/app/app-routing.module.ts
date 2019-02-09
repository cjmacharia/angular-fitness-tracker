import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { TrainingRoutingModule } from './trainig/training-routing.module';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
	{ path: '', component: WelcomeComponent },
	{ path: 'training', loadChildren: '../app/trainig/training-module#TrainingModule', canActivate: [AuthGuardService] }
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
