import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MughubComponent } from './mughub.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  //lazy loading in use
  { path: '', component: MughubComponent,
    children: [
      { path: '', redirectTo: 'auth', pathMatch: 'full'},
      { path: 'auth', component: AuthComponent, children: [
        { path: '', redirectTo: '/mughub/auth/login', pathMatch: 'full' },
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent },
        { path: '**', redirectTo: 'login', pathMatch: 'full' }
      ]},
      { path: 'tutor-app', loadChildren: './tutor-app/tutor-app.module#TutorAppModule' },
      { path: 'student-app', loadChildren: './student-app/student-app.module#StudentAppModule' }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MughubRoutingModule {}
