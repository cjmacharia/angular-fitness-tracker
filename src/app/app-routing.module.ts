import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { TrainingRoutingModule } from './trainig/training-routing.module';
const routes: Routes = [
	{ path: '', component: WelcomeComponent },
];

@NgModule({
	imports: [
		AuthRoutingModule,
		TrainingRoutingModule,
		RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
