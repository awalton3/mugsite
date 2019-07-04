import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperComponent } from './stepper.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MaterialComponentsModule } from '../angular-material/material-components.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [StepperComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    RouterModule,
    MatExpansionModule
  ],
  exports: [
    StepperComponent
  ]
})
export class StepperModule { }
