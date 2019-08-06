import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadClickedComponent } from './upload-clicked.component';
import { MaterialComponentsModule } from '../../angular-material/material-components.module';
import { AttachmentsModule } from '../../attachments/attachments.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormattedTimestampPipeModule } from '../../pipes/formatted-timestamp/formatted-timestamp-pipe.module';
import { MonthStringPipeModule } from '../../pipes/month-string-pipe/month-string-pipe.module';
import { TwoDigitDatePipeModule } from '../../pipes/two-digit-date-pipe/two-digit-date-pipe.module';
import { StandardTimePipeModule } from '../../pipes/standard-time-pipe/standard-time-pipe.module';


@NgModule({
  declarations: [UploadClickedComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    AttachmentsModule,
    MatExpansionModule,
    FormattedTimestampPipeModule,
    MonthStringPipeModule,
    TwoDigitDatePipeModule,
    StandardTimePipeModule
  ],
  exports: [
    UploadClickedComponent
  ]
})
export class UploadClickedModule { }
