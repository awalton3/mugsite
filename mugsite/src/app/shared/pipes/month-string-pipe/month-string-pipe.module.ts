import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthStringPipe } from './month-string.pipe';

@NgModule({
  declarations: [MonthStringPipe],
  imports: [
    CommonModule,
  ],
  exports: [
    MonthStringPipe
  ]
})

export class MonthStringPipeModule { }
