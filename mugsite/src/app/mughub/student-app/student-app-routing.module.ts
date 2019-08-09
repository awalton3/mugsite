import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentAppComponent } from './student-app.component';
import { AuthGuard } from '../auth/auth.guard';
import { MailComponent } from 'src/app/shared/mail/mail.component';

const routes: Routes = [
  //lazy loaded
  {
    path: '', component: StudentAppComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
      { path: '', redirectTo: 'mail', pathMatch: 'full' },
      { path: 'settings', loadChildren: '../settings/settings.module#SettingsModule' },
      { path: 'mail', component: MailComponent },
      { path: '**', redirectTo: 'mail', pathMatch: 'full' }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class StudentAppRoutingModule { }
