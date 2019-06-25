import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageRoutingModule } from './manage-routing.module';
import { ManageComponent } from './manage.component';
import { MaterialComponentsModule } from 'src/app/shared/angular-material/material-components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { faUserMd } from '@fortawesome/free-solid-svg-icons';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { ManageSiteComponent } from './manage-site/manage-site.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';


@NgModule({
  declarations: [ManageComponent, ManageSiteComponent, ManageUsersComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    ManageRoutingModule,
    FontAwesomeModule
  ]
})
export class ManageModule {
  constructor() {
    //font-awesome icons
    library.add(faHome)
    library.add(faLightbulb)
    library.add(faUserMd)
    library.add(faBookOpen)
    library.add(faCalendar)
    library.add(faBriefcase)
  }
}
