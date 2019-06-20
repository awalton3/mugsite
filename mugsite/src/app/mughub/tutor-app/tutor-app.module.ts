import { NgModule } from '@angular/core';
import { TutorAppComponent } from './tutor-app.component';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from 'src/app/shared/angular-material/material-components.module';
import { TutorAppRoutingModule } from './tutor-app-routing.module';

@NgModule({
  declarations: [TutorAppComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    TutorAppRoutingModule
  ]
})

export class TutorAppModule {}
