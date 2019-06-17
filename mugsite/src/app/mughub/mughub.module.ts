import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MughubComponent } from './mughub/mughub.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MughubComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'mughub', component: MughubComponent }
    ])
  ]
})
export class MughubModule { }
