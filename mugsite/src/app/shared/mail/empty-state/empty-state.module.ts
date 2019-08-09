import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyStateComponent } from './empty-state.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [EmptyStateComponent],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    EmptyStateComponent
  ]
})
export class EmptyStateModule {
  constructor() {
    library.add(faGlobe)
  }
}
