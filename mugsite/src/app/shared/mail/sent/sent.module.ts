import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SentComponent } from './sent.component';
import { MaterialComponentsModule } from '../../angular-material/material-components.module';
import { HeadnavModule } from 'src/app/mughub/headnav/headnav.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UploaderModule } from '../uploader/uploader.module';
import { UploadModule } from '../upload/upload.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { UploadClickedModule } from '../upload-clicked/upload-clicked.module';

@NgModule({
  declarations: [SentComponent],
  imports: [
    CommonModule,
    HeadnavModule,
    MaterialComponentsModule,
    MatSidenavModule,
    UploaderModule,
    UploadModule,
    UploadClickedModule,
    FontAwesomeModule
  ],
  exports: [SentComponent]
})
export class SentModule {
  constructor() {
    library.add(faGlobe)
  }
}
