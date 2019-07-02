import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from 'src/app/shared/angular-material/material-components.module';
import { WelcomeComponent } from './welcome.component';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeSetupComponent } from './welcome-setup/welcome-setup.component';
import { WelcomeInitComponent } from './welcome-init/welcome-init.component';
import { WelcomeSetupProfileComponent } from './welcome-setup/welcome-setup-profile/welcome-setup-profile.component';

@NgModule({
  declarations: [WelcomeComponent, WelcomeSetupComponent, WelcomeInitComponent, WelcomeSetupProfileComponent],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    MaterialComponentsModule
  ]
})
export class WelcomeModule { }
