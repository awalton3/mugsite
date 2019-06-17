import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//using lazy loading optimization
const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'mughub', loadChildren: './mughub/mughub.module#MughubModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
