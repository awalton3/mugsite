import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { HeadnavModule } from '../headnav/headnav.module';
import { MaterialComponentsModule } from 'src/app/shared/angular-material/material-components.module';
import { EditUserProfileModule } from 'src/app/shared/settings/edit-user-profile/edit-user-profile.module';
import { EditUserProfileImageModule } from 'src/app/shared/settings/edit-user-profile-image/edit-user-profile-image.module';
import { EditPreferencesModule } from 'src/app/shared/settings/edit-preferences/edit-preferences.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { ConnectionFormModule } from 'src/app/shared/connection-form/connection-form.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    SettingsRoutingModule,
    HeadnavModule,
    EditUserProfileModule,
    EditUserProfileImageModule,
    EditPreferencesModule,
    ConnectionFormModule,
    MatSidenavModule,
    MatCardModule
  ]
})
export class SettingsModule { }
