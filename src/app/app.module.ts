import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout'
import { MaterialModule } from './material';
import { TrainigComponent } from './trainig/trainig.component';
import { CurrentTrainingComponent } from './trainig/current-training/current-training.component';
import { NewTrainingComponent } from './trainig/new-training/new-training.component';
import { PastTrainingComponent } from './trainig/past-training/past-training.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { StopTrainingComponent } from './trainig/current-training/stop-training/stop-training.component';
import { AuthGuardService } from './auth-guard.service';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthModule } from './auth/auth.module';
@NgModule({
	declarations: [
		AppComponent,
		TrainigComponent,
		CurrentTrainingComponent,
		NewTrainingComponent,
		PastTrainingComponent,
		WelcomeComponent,
		HeaderComponent,
		SidenavListComponent,
		StopTrainingComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		BrowserAnimationsModule,
		AuthModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		FlexLayoutModule,
		AppRoutingModule,
		MaterialModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent],
	entryComponents: [StopTrainingComponent]
})
export class AppModule { }
