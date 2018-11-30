import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../app/material';
import { FlexLayoutModule } from '@angular/flex-layout'
import { AngularFireAuthModule } from 'angularfire2/auth';

@NgModule({
	declarations: [SignupComponent,
		LoginComponent,],
	imports: [
		CommonModule,
		AngularFireAuthModule,
		FormsModule,
		FlexLayoutModule,
		ReactiveFormsModule,
		MaterialModule,
	],
	exports: []
})

export class AuthModule { }