import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MughubComponent } from './mughub.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: MughubComponent,
    children: [
      { path: '', redirectTo: 'auth', pathMatch: 'full'},
      { path: 'auth', component: AuthComponent, children: [
        { path: '', redirectTo: '/mughub/auth/login', pathMatch: 'full' },
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent },
        { path: '**', redirectTo: 'login', pathMatch: 'full' }
      ]},
      //lazy loaded modules
      { path: 'tutor', loadChildren: './tutor-app/tutor-app.module#TutorAppModule', canLoad: [AuthGuard]},
      { path: 'student', loadChildren: './student-app/student-app.module#StudentAppModule', canLoad: [AuthGuard]}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MughubRoutingModule {}
