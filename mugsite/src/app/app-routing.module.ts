import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },

    //lazy loaded modules
    { path: 'about', loadChildren: './about/about.module#AboutModule' },
    { path: 'mughub', loadChildren: './mughub/mughub.module#MughubModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
