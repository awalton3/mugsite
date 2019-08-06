import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadClickedComponent } from './upload-clicked.component';
import { MaterialComponentsModule } from '../../angular-material/material-components.module';
import { AttachmentsModule } from '../../attachments/attachments.module';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [UploadClickedComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    AttachmentsModule,
    MatTooltipModule
  ],
  exports: [
    UploadClickedComponent
  ]
})
export class UploadClickedModule { }
