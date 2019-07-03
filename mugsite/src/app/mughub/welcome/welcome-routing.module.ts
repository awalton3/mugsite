import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import { AuthGuard } from '../auth/auth.guard';
import { WelcomeSetupComponent } from './welcome-setup/welcome-setup.component';
import { WelcomeInitComponent } from './welcome-init/welcome-init.component';
import { WelcomeSetupProfileComponent } from './welcome-setup/welcome-setup-profile/welcome-setup-profile.component';
import { WelcomeSetupSettingsComponent } from './welcome-setup/welcome-setup-settings/welcome-setup-settings.component';
import { WelcomeSetupStudentsComponent } from './welcome-setup/welcome-setup-students/welcome-setup-students.component';

const routes: Routes = [
  {
    path: '', component: WelcomeComponent, canActivate: [AuthGuard], children: [
      { path: '', component: WelcomeInitComponent },
      {
        path: 'account-setup', component: WelcomeSetupComponent, children: [
          { path: '', redirectTo: "profile", pathMatch: 'full' },
          {
            path: 'profile', component: WelcomeSetupProfileComponent, children: [
              { path: 'image', loadChildren: './welcome-setup/welcome-setup-profile/profile-bgimage/profile-bgimage.module#ProfileBgimageModule' }
            ]
          },
          { path: 'settings', component: WelcomeSetupSettingsComponent},
          { path: 'students', component: WelcomeSetupStudentsComponent},
        ]
      },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class WelcomeRoutingModule { }
