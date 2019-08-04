import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload.component';
import { MaterialComponentsModule } from '../../angular-material/material-components.module';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TruncatePipeModule } from '../../pipes/truncate-pipe/truncate-pipe.module';
import { TwoDigitDatePipeModule } from '../../pipes/two-digit-date-pipe/two-digit-date-pipe.module';
import { MonthStringPipeModule } from '../../pipes/month-string-pipe/month-string-pipe.module';

@NgModule({
  declarations: [UploadComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    MatChipsModule,
    MatTooltipModule,
    TruncatePipeModule,
    TwoDigitDatePipeModule,
    MonthStringPipeModule
  ],
  exports: [
    UploadComponent
  ]
})
export class UploadModule { }
