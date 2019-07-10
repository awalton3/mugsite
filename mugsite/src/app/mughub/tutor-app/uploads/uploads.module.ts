import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from 'src/app/shared/angular-material/material-components.module';
import { UploadsComponent } from './uploads.component';
import { UploadsRoutingModule } from './uploads-routing.module';
import { UploadComponent } from './upload/upload.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UploadEditorComponent } from './upload-editor/upload-editor.component';
import { HeadnavModule } from '../../headnav/headnav.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsMaterialComponentsModule } from 'src/app/shared/angular-material/forms-material-components.module';
import { AttachmentService } from 'src/app/shared/attachments/attachments.service';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [UploadsComponent, UploadComponent, UploadEditorComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    UploadsRoutingModule,
    MatSidenavModule,
    HeadnavModule,
    ReactiveFormsModule,
    FormsMaterialComponentsModule,
    MatListModule,
  ],
  providers: [
    AttachmentService
  ]
})

export class UploadsModule { }
