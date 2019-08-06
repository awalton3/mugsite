import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormattedTimestampPipe } from './formatted-timestamp.pipe';

@NgModule({
  declarations: [FormattedTimestampPipe],
  imports: [
    CommonModule
  ],
  exports: [
    FormattedTimestampPipe
  ]
})
export class FormattedTimestampPipeModule { }
