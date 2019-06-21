import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentAppComponent } from './student-app.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  //lazy loaded
  { path: '', component: StudentAppComponent, canActivate: [AuthGuard]}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class StudentAppRoutingModule {}
