import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TwoDigitDatePipe } from './two-digit-date.pipe';

@NgModule({
  declarations: [TwoDigitDatePipe],
  imports: [
    CommonModule,
  ],
  exports: [
    TwoDigitDatePipe
  ]
})
export class TwoDigitDatePipeModule { }
