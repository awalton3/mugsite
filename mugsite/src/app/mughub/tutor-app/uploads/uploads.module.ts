import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from 'src/app/shared/angular-material/material-components.module';
import { UploadsComponent } from './uploads.component';
import { UploadsRoutingModule } from './uploads-routing.module';
import { UploadComponent } from './upload/upload.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UploadEditorComponent } from './upload-editor/upload-editor.component';
import { HeadnavModule } from '../../headnav/headnav.module';

@NgModule({
  declarations: [UploadsComponent, UploadComponent, UploadEditorComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    UploadsRoutingModule,
    MatSidenavModule,
    HeadnavModule
  ]
})

export class UploadsModule { }
