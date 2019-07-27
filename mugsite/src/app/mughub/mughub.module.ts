import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MughubComponent } from './mughub.component';
import { MaterialComponentsModule } from '../shared/angular-material/material-components.module';
import { FormsMaterialComponentsModule } from '../shared/angular-material/forms-material-components.module';

import { MughubRoutingModule } from './mughub-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    MughubComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    FormsMaterialComponentsModule,
    MughubRoutingModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatListModule,
  ]
})

export class MughubModule { }
