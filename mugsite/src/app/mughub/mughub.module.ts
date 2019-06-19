import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MughubComponent } from './mughub.component';
import { MaterialComponentsModule } from '../shared/angular-material/material-components.module';
import { MughubRoutingModule } from './mughub-routing.module';
import { AuthModule } from './auth/auth.module';
import { ManageModule } from './manage/manage.module';

@NgModule({
  declarations: [MughubComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    MughubRoutingModule,
    AuthModule,
    ManageModule
  ]
})

export class MughubModule { }
