import { NgModule } from '@angular/core';
import { StudentAppComponent } from './student-app.component';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from 'src/app/shared/angular-material/material-components.module';
import { StudentAppRoutingModule } from './student-app-routing.module';

@NgModule({
  declarations: [StudentAppComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    StudentAppRoutingModule
  ]
})

export class StudentAppModule {}
