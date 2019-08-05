import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload.component';
import { MaterialComponentsModule } from '../../angular-material/material-components.module';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TruncatePipeModule } from '../../pipes/truncate-pipe/truncate-pipe.module';
import { TwoDigitDatePipeModule } from '../../pipes/two-digit-date-pipe/two-digit-date-pipe.module';
import { MonthStringPipeModule } from '../../pipes/month-string-pipe/month-string-pipe.module';
import { HttpClientModule } from '@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFilePdf, faFile, faFileExcel, faFileImage, faFilePowerpoint, faFileWord } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [UploadComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    MatChipsModule,
    MatTooltipModule,
    TruncatePipeModule,
    TwoDigitDatePipeModule,
    MonthStringPipeModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  exports: [
    UploadComponent
  ]
})
export class UploadModule {
  constructor() {
    library.add(faFilePdf);
    library.add(faFile);
    library.add(faFileExcel);
    library.add(faFileImage);
    library.add(faFilePowerpoint);
    library.add(faFileWord);


  }
}
