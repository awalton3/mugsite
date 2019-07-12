import { NgModule } from '@angular/core';
import { TutorAppComponent } from './tutor-app.component';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from 'src/app/shared/angular-material/material-components.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TutorAppRoutingModule } from './tutor-app-routing.module';
import { SidenavModule } from '../sidenav/sidenav.module';

@NgModule({
  declarations: [TutorAppComponent],
  imports: [
    TutorAppRoutingModule,
    CommonModule,
    MaterialComponentsModule,
    MatSidenavModule,
    SidenavModule
  ]
})

export class TutorAppModule { }
