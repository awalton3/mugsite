import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadsComponent } from './uploads.component';
import { UploadsResolve } from './uploads.resolve';

const routes: Routes = [
  //lazy loaded module
  { path: '', component: UploadsComponent, resolve: { uploads: UploadsResolve } }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UploadsRoutingModule { }
