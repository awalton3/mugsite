import { NgModule } from '@angular/core';
import { StudentAppComponent } from './student-app.component';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from 'src/app/shared/angular-material/material-components.module';
import { StudentAppRoutingModule } from './student-app-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavModule } from '../sidenav/sidenav.module';
import { MailModule } from 'src/app/shared/mail/mail.module';

@NgModule({
  declarations: [StudentAppComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    StudentAppRoutingModule,
    MatSidenavModule,
    SidenavModule,
    MailModule
  ]
})

export class StudentAppModule {}
