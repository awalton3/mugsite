import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import { AuthGuard } from '../auth/auth.guard';
import { WelcomeSetupComponent } from './welcome-setup/welcome-setup.component';
import { WelcomeSetupProfileComponent } from './welcome-setup/welcome-setup-profile/welcome-setup-profile.component';
import { WelcomeSetupSettingsComponent } from './welcome-setup/welcome-setup-settings/welcome-setup-settings.component';
import { WelcomeSetupConnectionsComponent } from './welcome-setup/welcome-setup-connections/welcome-setup-connections.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent, canActivate: [AuthGuard], children: [
    { path: 'account-setup', component: WelcomeSetupComponent, children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full'},
      { path: 'profile', component: WelcomeSetupProfileComponent},
      { path: 'settings', component: WelcomeSetupSettingsComponent},
      { path: 'connections', component: WelcomeSetupConnectionsComponent},
      { path: '**', redirectTo: 'profile', pathMatch: 'full'} //TODO redirect to current route, instead of profile
    ]},
    { path: '**', redirectTo: 'account-setup', pathMatch: 'full'}
  ]}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class WelcomeRoutingModule { }
