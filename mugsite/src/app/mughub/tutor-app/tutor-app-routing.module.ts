import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TutorAppComponent } from './tutor-app.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  //lazy loaded module
  {
    path: '', component: TutorAppComponent, canActivate: [AuthGuard], children: [
      { path: '', redirectTo: 'uploads', pathMatch: 'full' },
      { path: 'manage', loadChildren: './manage/manage.module#ManageModule' },
      { path: 'uploads', loadChildren: './uploads/uploads.module#UploadsModule' },
      { path: '**', redirectTo: 'uploads', pathMatch: 'full' }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TutorAppRoutingModule { }
