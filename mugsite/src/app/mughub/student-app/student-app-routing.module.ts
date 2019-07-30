import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentAppComponent } from './student-app.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  //lazy loaded
  {
    path: '', component: StudentAppComponent, canActivate: [AuthGuard], children: [
      { path: '', redirectTo: 'mail', pathMatch: 'full' },
      { path: 'mail', loadChildren: './mail/mail.module#MailModule'},
      { path: '**', redirectTo: 'mail', pathMatch: 'full' }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class StudentAppRoutingModule { }
