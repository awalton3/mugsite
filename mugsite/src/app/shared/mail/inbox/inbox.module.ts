import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InboxComponent } from './inbox.component';
import { HeadnavModule } from 'src/app/mughub/headnav/headnav.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UploaderModule } from '../uploader/uploader.module';
import { MaterialComponentsModule } from '../../angular-material/material-components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { UploadModule } from '../upload/upload.module';
import { UploadClickedModule } from '../upload-clicked/upload-clicked.module';

@NgModule({
  declarations: [InboxComponent],
  imports: [
    CommonModule,
    HeadnavModule,
    MaterialComponentsModule,
    MatSidenavModule,
    UploaderModule,
    UploadModule,
    FontAwesomeModule,
    UploadClickedModule
  ],
  exports: [InboxComponent]
})
export class InboxModule {
  constructor() {
    library.add(faTrophy)
  }
}
