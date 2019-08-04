import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SentComponent } from './sent.component';
import { MaterialComponentsModule } from '../../angular-material/material-components.module';
import { HeadnavModule } from 'src/app/mughub/headnav/headnav.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UploaderModule } from '../uploader/uploader.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UploadModule } from '../upload/upload.module';

@NgModule({
  declarations: [SentComponent],
  imports: [
    CommonModule,
    HeadnavModule,
    MaterialComponentsModule,
    MatSidenavModule,
    UploaderModule,
    UploadModule, 
    MatToolbarModule
  ],
  exports: [SentComponent]
})
export class SentModule { }
