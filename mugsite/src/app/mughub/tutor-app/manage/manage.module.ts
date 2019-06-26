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
import { ManageSiteEditHomeComponent } from './manage-site-edit-home/manage-site-edit-home.component';
import { ManageSiteEditAboutComponent } from './manage-site-edit-about/manage-site-edit-about.component';
import { ManageSiteEditSsComponent } from './manage-site-edit-ss/manage-site-edit-ss.component';
import { ManageSiteEditTutoringComponent } from './manage-site-edit-tutoring/manage-site-edit-tutoring.component';
import { ManageSiteEditEventsComponent } from './manage-site-edit-events/manage-site-edit-events.component';
import { ManageSiteEditJobComponent } from './manage-site-edit-job/manage-site-edit-job.component';
import { HeadnavModule } from '../../headnav/headnav.module';
import { EventListItemModule } from 'src/app/shared/event-list-item/event-list-item.module';
import { EditorBottomSheetEventsComponent } from './manage-site-edit-events/editor-bottom-sheet-events/editor-bottom-sheet-events.component';


@NgModule({
  declarations: [
    ManageComponent,
    ManageSiteComponent,
    ManageUsersComponent,
    ManageSiteEditHomeComponent,
    ManageSiteEditAboutComponent,
    ManageSiteEditSsComponent,
    ManageSiteEditTutoringComponent,
    ManageSiteEditEventsComponent,
    ManageSiteEditJobComponent,
    EditorBottomSheetEventsComponent,
  ],
  entryComponents: [EditorBottomSheetEventsComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    ManageRoutingModule,
    FontAwesomeModule,
    HeadnavModule,
    EventListItemModule
  ],
  exports: [
    ManageSiteEditHomeComponent,
    ManageSiteEditAboutComponent,
    ManageSiteEditSsComponent,
    ManageSiteEditTutoringComponent,
    ManageSiteEditEventsComponent,
    ManageSiteEditJobComponent
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
