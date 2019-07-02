import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import { AuthGuard } from '../auth/auth.guard';
import { WelcomeSetupComponent } from './welcome-setup/welcome-setup.component';
import { WelcomeInitComponent } from './welcome-init/welcome-init.component';

const routes: Routes = [
  {
    path: '', component: WelcomeComponent, canActivate: [AuthGuard], children: [
      { path: '', component: WelcomeInitComponent },
      { path: 'account-setup', component: WelcomeSetupComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class WelcomeRoutingModule { }
