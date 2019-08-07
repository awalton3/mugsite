import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditUserProfileComponent } from './edit-user-profile.component';
import { MaterialComponentsModule } from '../../angular-material/material-components.module';
import { FormsMaterialComponentsModule } from '../../angular-material/forms-material-components.module';

@NgModule({
  declarations: [EditUserProfileComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    FormsMaterialComponentsModule
  ],
  exports: [
    EditUserProfileComponent
  ]
})
export class EditUserProfileModule { }
