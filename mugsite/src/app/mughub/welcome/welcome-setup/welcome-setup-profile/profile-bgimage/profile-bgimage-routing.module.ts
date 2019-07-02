import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileBgimageComponent } from './profile-bgimage.component';

const routes: Routes = [
  { path: '', component: ProfileBgimageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProfileBgimageRoutingModule { }
