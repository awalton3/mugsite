import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentAppComponent } from './student-app.component';
import { AuthGuard } from '../auth/auth.guard';
import { InboxComponent } from 'src/app/shared/inbox/inbox.component';

const routes: Routes = [
  //lazy loaded
  {
    path: '', component: StudentAppComponent, canActivate: [AuthGuard], children: [
      // { path: '', redirectTo: 'inbox', pathMatch: 'full' },
      { path: 'inbox', component: InboxComponent },
      // { path: '**', component: InboxComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class StudentAppRoutingModule { }
