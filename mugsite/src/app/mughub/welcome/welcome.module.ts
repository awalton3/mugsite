import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from 'src/app/shared/angular-material/material-components.module';
import { WelcomeComponent } from './welcome.component';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeSetupComponent } from './welcome-setup/welcome-setup.component';
import { WelcomeSetupProfileComponent } from './welcome-setup/welcome-setup-profile/welcome-setup-profile.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { WelcomeSetupSettingsComponent } from './welcome-setup/welcome-setup-settings/welcome-setup-settings.component';
import { StepperModule } from 'src/app/shared/stepper/stepper.module';
import { StepperService } from 'src/app/shared/stepper/stepper.service';

import { WelcomeSetupConnectionsComponent } from './welcome-setup/welcome-setup-connections/welcome-setup-connections.component';
import { ConnectionFormModule } from 'src/app/shared/connection-form/connection-form.module';
import { EditUserProfileModule } from 'src/app/shared/settings/edit-user-profile/edit-user-profile.module';
import { EditUserProfileImageModule } from 'src/app/shared/settings/edit-user-profile-image/edit-user-profile-image.module';
import { EditPreferencesModule } from 'src/app/shared/settings/edit-preferences/edit-preferences.module';

@NgModule({
  declarations: [
    WelcomeComponent,
    WelcomeSetupComponent,
    WelcomeSetupProfileComponent,
    WelcomeSetupSettingsComponent,
    WelcomeSetupConnectionsComponent
  ],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    MaterialComponentsModule,
    MatSidenavModule,
    StepperModule,
    ConnectionFormModule,
    EditUserProfileModule,
    EditUserProfileImageModule,
    EditPreferencesModule
  ],
  providers: [StepperService] //creates a new instance for all components in this module
})
export class WelcomeModule {}
