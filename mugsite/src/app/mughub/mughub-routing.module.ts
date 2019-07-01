import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MughubComponent } from './mughub.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '', component: MughubComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'welcome', loadChildren: './welcome/welcome.module#WelcomeModule' },
      { path: 'tutor', loadChildren: './tutor-app/tutor-app.module#TutorAppModule', canLoad: [AuthGuard] },
      { path: 'student', loadChildren: './student-app/student-app.module#StudentAppModule', canLoad: [AuthGuard] },
      { path: '**', redirectTo: 'login', pathMatch: 'full' }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MughubRoutingModule { }
