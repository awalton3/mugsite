import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from '../angular-material/material-components.module';
import { EventListItemComponent } from './event-list-item.component';

@NgModule({
  declarations: [EventListItemComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule
  ],
  exports: [
    EventListItemComponent
  ]
})
export class EventListItemModule { }
