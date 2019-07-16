import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TutorAppComponent } from './tutor-app.component';
import { AuthGuard } from '../auth/auth.guard';
import { UploadsResolve } from './uploads/uploads.resolve';

const routes: Routes = [
  {
    path: '', component: TutorAppComponent, canActivate: [AuthGuard], children: [
      { path: '', redirectTo: 'uploads', pathMatch: 'full' },
      { path: 'manage', loadChildren: './manage/manage.module#ManageModule' },
      { path: 'uploads', loadChildren: './uploads/uploads.module#UploadsModule', resolve: { uploads: UploadsResolve } },
      { path: '**', redirectTo: 'uploads', pathMatch: 'full' }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TutorAppRoutingModule { }
