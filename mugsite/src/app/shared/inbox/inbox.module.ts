import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InboxComponent } from './inbox.component';
import { MaterialComponentsModule } from '../angular-material/material-components.module';
import { HeadnavModule } from 'src/app/mughub/headnav/headnav.module';
import { UploadComponent } from '../upload/upload.component';
import { MonthStringPipe } from '../pipes/month-string.pipe';

@NgModule({
  declarations: [
    InboxComponent,
    UploadComponent,
    MonthStringPipe
  ],
  imports: [
    CommonModule,
    HeadnavModule,
    MaterialComponentsModule
  ]
})
export class InboxModule { }
