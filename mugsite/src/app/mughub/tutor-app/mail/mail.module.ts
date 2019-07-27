import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailComponent } from './mail.component';
import { InboxModule } from 'src/app/shared/inbox/inbox.module';
import { MailRoutingModule } from './mail-routing.module';

@NgModule({
  declarations: [MailComponent],
  imports: [
    CommonModule,
    MailRoutingModule,
    InboxModule
  ]
})
export class MailModule { }
