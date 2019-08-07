import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from '../../angular-material/material-components.module';
import { EditUserProfileImageComponent } from './edit-user-profile-image.component';
import { HeadnavModule } from 'src/app/mughub/headnav/headnav.module';

@NgModule({
  declarations: [EditUserProfileImageComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    HeadnavModule
  ],
  exports: [
    EditUserProfileImageComponent
  ]
})
export class EditUserProfileImageModule { }
