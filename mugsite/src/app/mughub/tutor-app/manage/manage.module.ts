import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet'
import { ManageRoutingModule } from './manage-routing.module';
import { ManageComponent } from './manage.component';
import { MaterialComponentsModule } from 'src/app/shared/angular-material/material-components.module';
import { FormsMaterialComponentsModule } from 'src/app/shared/angular-material/forms-material-components.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faLightbulb, faUserMd, faBookOpen, faCalendar, faBriefcase } from '@fortawesome/free-solid-svg-icons';

import { ManageSiteComponent } from './manage-site/manage-site.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { HeadnavModule } from '../../headnav/headnav.module';
import { EventListItemModule } from 'src/app/shared/event-list-item/event-list-item.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StickyBitsDirective } from 'src/app/shared/stickybits/stickybits.directive';
import { ManageSiteEditorComponent } from './manage-site-editor/manage-site-editor.component';
import { EditorBottomSheetEventsComponent } from './manage-site-editor/editor-bottom-sheet-events/editor-bottom-sheet-events.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    ManageComponent,
    ManageSiteComponent,
    ManageUsersComponent,
    StickyBitsDirective,
    ManageSiteEditorComponent,
    EditorBottomSheetEventsComponent
  ],
  entryComponents: [EditorBottomSheetEventsComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    FormsMaterialComponentsModule,
    MatBottomSheetModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ManageRoutingModule,
    FontAwesomeModule,
    HeadnavModule,
    EventListItemModule,
    ReactiveFormsModule,
    MatListModule
  ],
  providers: [
    MatDatepickerModule
  ],
  exports: [
    ManageSiteEditorComponent
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
