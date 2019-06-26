import { NgModule } from '@angular/core';
import { TutorAppComponent } from './tutor-app.component';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from 'src/app/shared/angular-material/material-components.module';
import { TutorAppRoutingModule } from './tutor-app-routing.module';
import { ManageModule } from './manage/manage.module';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { HeadnavComponent } from '../headnav/headnav.component';

@NgModule({
  declarations: [TutorAppComponent, SidenavComponent, HeadnavComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    TutorAppRoutingModule,
    ManageModule
  ]
})

export class TutorAppModule {}
