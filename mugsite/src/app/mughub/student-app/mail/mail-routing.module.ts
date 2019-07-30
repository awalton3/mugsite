import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MailComponent } from '../../tutor-app/mail/mail.component';
import { InboxComponent } from 'src/app/shared/inbox/inbox.component';

const routes: Routes = [
  {
    path: '', component: MailComponent, children: [
      { path: '', redirectTo: 'inbox', pathMatch: 'full'}, 
      { path: 'inbox', component: InboxComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MailRoutingModule { }
