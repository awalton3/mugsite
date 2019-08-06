import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadClickedComponent } from './upload-clicked.component';
import { MaterialComponentsModule } from '../../angular-material/material-components.module';
import { AttachmentsModule } from '../../attachments/attachments.module';

@NgModule({
  declarations: [UploadClickedComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    AttachmentsModule
  ],
  exports: [
    UploadClickedComponent
  ]
})
export class UploadClickedModule { }
