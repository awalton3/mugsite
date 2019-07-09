import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { SidenavComponent } from './sidenav.component';
import { MaterialComponentsModule } from 'src/app/shared/angular-material/material-components.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    MatListModule,
    RouterModule,
  ],
  exports: [
    SidenavComponent
  ]
})
export class SidenavModule { }
