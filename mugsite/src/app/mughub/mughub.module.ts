import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MughubComponent } from './mughub/mughub.component';
import { RouterModule } from '@angular/router';
import { MaterialComponentsModule } from '../shared/angular-material/material-components.module';

@NgModule({
  declarations: [MughubComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    RouterModule.forChild([
      //lazy-loading optimization
      { path: '', component: MughubComponent }
    ])
  ]
})
export class MughubModule { }
