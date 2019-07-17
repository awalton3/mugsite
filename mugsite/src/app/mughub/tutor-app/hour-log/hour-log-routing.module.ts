import { HourLogComponent } from './hour-log.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  //lazy loaded module
  { path: '', component: HourLogComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class HourLogRoutingModule {}
