import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPreferencesComponent } from './edit-preferences.component';
import { MaterialComponentsModule } from '../../angular-material/material-components.module';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faCheckCircle, faTimesCircle, faCalendar, faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsMaterialComponentsModule } from '../../angular-material/forms-material-components.module';

@NgModule({
  declarations: [EditPreferencesComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    FontAwesomeModule,
    FormsMaterialComponentsModule
  ],
  exports: [
    EditPreferencesComponent
  ]
})
export class EditPreferencesModule {
  constructor() {
    library.add(faUser)
    library.add(faCheckCircle)
    library.add(faTimesCircle)
    library.add(faCalendar)
    library.add(faBell)
  }
}
