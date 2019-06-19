import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialComponentsModule } from 'src/app/shared/angular-material/material-components.module';
import { ManageRoutingModule } from './manage-routing.module';
import { ManageComponent } from './manage.component';

@NgModule({
  declarations: [ManageComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    ManageRoutingModule
  ]
})

export class ManageModule {}
