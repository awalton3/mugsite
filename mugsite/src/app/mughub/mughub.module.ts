import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MughubComponent } from './mughub.component';
import { MaterialComponentsModule } from '../shared/angular-material/material-components.module';
import { MughubRoutingModule } from './mughub-routing.module';
import { TutorAppModule } from './tutor-app/tutor-app.module';
import { StudentAppModule } from './student-app/student-app.module';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

@NgModule({
  declarations: [MughubComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    MughubRoutingModule,
    ReactiveFormsModule,
    MaterialComponentsModule,
    TutorAppModule,
    StudentAppModule
  ]
})

export class MughubModule { }
