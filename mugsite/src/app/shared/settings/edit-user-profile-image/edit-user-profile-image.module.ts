import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from '../../angular-material/material-components.module';
import { EditUserProfileImageComponent } from './edit-user-profile-image.component';

@NgModule({
  declarations: [EditUserProfileImageComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule
  ],
  exports: [
    EditUserProfileImageComponent
  ]
})
export class EditUserProfileImageModule { }
