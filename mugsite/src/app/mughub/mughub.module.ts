import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MughubComponent } from './mughub.component';
import { MaterialComponentsModule } from '../shared/angular-material/material-components.module';
import { MughubRoutingModule } from './mughub-routing.module';
import { AuthModule } from './auth/auth.module';
import { TutorAppModule } from './tutor-app/tutor-app.module';
import { StudentAppModule } from './student-app/student-app.module';

@NgModule({
  declarations: [MughubComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    MughubRoutingModule,
    AuthModule,
    TutorAppModule,
    StudentAppModule
  ]
})

export class MughubModule { }
