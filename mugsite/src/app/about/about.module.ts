import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutComponent } from './about.component';
import { MaterialComponentsModule } from '../shared/angular-material/material-components.module';
import { AboutRoutingModule } from './about-routing.module';

@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    AboutRoutingModule
  ]
})

export class AboutModule { }
