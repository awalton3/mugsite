import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from 'src/app/shared/angular-material/material-components.module';
import { MailComponent } from './mail.component';
import { MailRoutingModule } from '../../tutor-app/mail/mail-routing.module';
import { InboxModule } from 'src/app/shared/inbox/inbox.module';

@NgModule({
  declarations: [MailComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    MailRoutingModule,
    InboxModule
  ]
})
export class MailModule { }
