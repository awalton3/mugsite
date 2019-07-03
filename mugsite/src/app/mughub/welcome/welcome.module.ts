import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from 'src/app/shared/angular-material/material-components.module';
import { WelcomeComponent } from './welcome.component';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeSetupComponent } from './welcome-setup/welcome-setup.component';
import { WelcomeInitComponent } from './welcome-init/welcome-init.component';
import { WelcomeSetupProfileComponent } from './welcome-setup/welcome-setup-profile/welcome-setup-profile.component';
import { HeadnavModule } from '../headnav/headnav.module';
import { ProfileBgimageModule } from './welcome-setup/welcome-setup-profile/profile-bgimage/profile-bgimage.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [WelcomeComponent, WelcomeSetupComponent, WelcomeInitComponent, WelcomeSetupProfileComponent],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    MaterialComponentsModule,
    HeadnavModule,
    ProfileBgimageModule,
    ReactiveFormsModule
  ]
})
export class WelcomeModule { }
