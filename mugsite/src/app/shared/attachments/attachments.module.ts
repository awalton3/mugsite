import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachmentsComponent } from './attachments.component';
import { MaterialComponentsModule } from '../angular-material/material-components.module';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFilePdf, faFile, faFileExcel, faFileImage, faFilePowerpoint, faFileWord } from '@fortawesome/free-solid-svg-icons';
import { TruncatePipeModule } from '../pipes/truncate-pipe/truncate-pipe.module';

@NgModule({
  declarations: [AttachmentsComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    MatChipsModule,
    MatTooltipModule,
    FontAwesomeModule,
    TruncatePipeModule
  ],
  exports: [
    AttachmentsComponent
  ]
})
export class AttachmentsModule {
  constructor() {
    library.add(faFilePdf);
    library.add(faFile);
    library.add(faFileExcel);
    library.add(faFileImage);
    library.add(faFilePowerpoint);
    library.add(faFileWord);
  }
}
