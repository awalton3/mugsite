import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from 'src/app/shared/angular-material/material-components.module';
import { ProfileBgimageComponent } from './profile-bgimage.component';
import { ProfileBgimageRoutingModule } from './profile-bgimage-routing.module';

@NgModule({
  declarations: [ProfileBgimageComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    ProfileBgimageRoutingModule
  ]
})
export class ProfileBgimageModule { }
