import { NgModule } from '@angular/core';
import { MailComponent } from './mail.component';
import { RouterModule } from '@angular/router';
import { InboxComponent } from 'src/app/shared/inbox/inbox.component';

const routes = [
  {
    path: '', component: MailComponent, children: [
      { path: '', redirectTo: 'inbox', pathMatch: 'full' },
      { path: 'inbox', component: InboxComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MailRoutingModule { }
