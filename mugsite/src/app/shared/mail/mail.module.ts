import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailComponent } from './mail.component';
import { HeadnavModule } from 'src/app/mughub/headnav/headnav.module';
import { MaterialComponentsModule } from '../angular-material/material-components.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UploaderModule } from './uploader/uploader.module';
import { UploadClickedModule } from './upload-clicked/upload-clicked.module';
import { UploadModule } from './upload/upload.module';
import { EmptyStateModule } from './empty-state/empty-state.module';

@NgModule({
  declarations: [MailComponent],
  imports: [
    CommonModule,
    HeadnavModule,
    MaterialComponentsModule,
    MatSidenavModule,
    UploaderModule,
    UploadModule,
    UploadClickedModule,
    EmptyStateModule
  ],
  exports: [
    MailComponent
  ]
})
export class MailModule {}
