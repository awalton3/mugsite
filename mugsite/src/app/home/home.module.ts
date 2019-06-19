import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { MaterialComponentsModule } from '../shared/angular-material/material-components.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
