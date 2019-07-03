import { NgModule } from '@angular/core';
import { TutorAppComponent } from './tutor-app.component';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from 'src/app/shared/angular-material/material-components.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TutorAppRoutingModule } from './tutor-app-routing.module';
import { ManageModule } from './manage/manage.module';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { HeadnavModule } from '../headnav/headnav.module';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [TutorAppComponent, SidenavComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    MatSidenavModule,
    TutorAppRoutingModule,
    ManageModule,
    HeadnavModule,
    MatListModule
  ]
})

export class TutorAppModule { }
