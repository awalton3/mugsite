import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TutorAppComponent } from './tutor-app.component';
import { AuthGuard } from '../auth/auth.guard';
import { InboxComponent } from 'src/app/shared/mail/inbox/inbox.component';
import { SentComponent } from 'src/app/shared/mail/sent/sent.component';
import { InboxResolve } from 'src/app/shared/mail/inbox/inbox.resolve';
import { SentResolve } from 'src/app/shared/mail/sent/sent.resolve';

const routes: Routes = [
  {
    path: '', component: TutorAppComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
      { path: '',  redirectTo: 'mail/inbox', pathMatch: 'full'},
      { path: 'manage', loadChildren: './manage/manage.module#ManageModule' },
      // { path: 'uploads', loadChildren: './uploads/uploads.module#UploadsModule', resolve: { uploads: UploadsResolve } },
      { path: 'hour-log', loadChildren: './hour-log/hour-log.module#HourLogModule' },
      { path: 'settings', loadChildren: '../settings/settings.module#SettingsModule'},
      { path: 'mail/inbox', component: InboxComponent, resolve: { uploads: InboxResolve } },
      { path: 'mail/sent', component: SentComponent, resolve: { uploads: SentResolve } },
      { path: '**', redirectTo: 'mail/inbox', pathMatch: 'full' }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TutorAppRoutingModule { }
