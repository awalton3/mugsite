import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from 'src/app/shared/angular-material/material-components.module';
import { HeadnavComponent } from './headnav.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [HeadnavComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    MatToolbarModule
  ],
  exports: [
    HeadnavComponent
  ]
})
export class HeadnavModule { }
