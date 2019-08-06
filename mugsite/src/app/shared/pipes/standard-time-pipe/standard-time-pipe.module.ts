import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandardTimePipePipe } from './standard-time-pipe.pipe';

@NgModule({
  declarations: [StandardTimePipePipe],
  imports: [
    CommonModule
  ],
  exports: [
    StandardTimePipePipe
  ]
})
export class StandardTimePipeModule { }
