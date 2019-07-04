import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from 'src/app/shared/angular-material/material-components.module';
import { WelcomeComponent } from './welcome.component';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeSetupComponent } from './welcome-setup/welcome-setup.component';
import { WelcomeSetupProfileComponent } from './welcome-setup/welcome-setup-profile/welcome-setup-profile.component';
import { HeadnavModule } from '../headnav/headnav.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsMaterialComponentsModule } from 'src/app/shared/angular-material/forms-material-components.module';
import { WelcomeSetupSettingsComponent } from './welcome-setup/welcome-setup-settings/welcome-setup-settings.component';
import { WelcomeSetupStudentsComponent } from './welcome-setup/welcome-setup-students/welcome-setup-students.component';
import { WelcomeSetupProfileEditorComponent } from './welcome-setup/welcome-setup-profile/welcome-setup-profile-editor/welcome-setup-profile-editor.component';
import { StepperModule } from 'src/app/shared/stepper/stepper.module';
import { StepperService } from 'src/app/shared/stepper/stepper.service';

//font awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faCheckCircle, faTimesCircle, faCalendar, faBell } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [
    WelcomeComponent,
    WelcomeSetupComponent,
    WelcomeSetupProfileComponent,
    WelcomeSetupSettingsComponent,
    WelcomeSetupStudentsComponent,
    WelcomeSetupProfileEditorComponent
  ],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    MaterialComponentsModule,
    FormsMaterialComponentsModule,
    MatSidenavModule,
    HeadnavModule,
    ReactiveFormsModule,
    StepperModule,
    FontAwesomeModule
  ],
  providers: [ StepperService ] //creates a new instance for all components in this module
})
export class WelcomeModule {
  constructor() {
    library.add(faUser)
    library.add(faCheckCircle)
    library.add(faTimesCircle)
    library.add(faCalendar)
    library.add(faBell)
  }
}
