import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InboxComponent } from './inbox.component';
import { MaterialComponentsModule } from '../angular-material/material-components.module';
import { HeadnavModule } from 'src/app/mughub/headnav/headnav.module';
import { UploadComponent } from '../upload/upload.component';

@NgModule({
  declarations: [InboxComponent, UploadComponent],
  imports: [
    CommonModule,
    HeadnavModule,
    MaterialComponentsModule
  ]
})
export class InboxModule { }
