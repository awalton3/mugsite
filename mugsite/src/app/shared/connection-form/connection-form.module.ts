import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectionFormComponent } from './connection-form.component';
import { MaterialComponentsModule } from '../angular-material/material-components.module';
import { FormsMaterialComponentsModule } from '../angular-material/forms-material-components.module';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { TruncatePipeModule } from '../pipes/truncate-pipe/truncate-pipe.module';

@NgModule({
  declarations: [ConnectionFormComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    FormsMaterialComponentsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatAutocompleteModule,
    TruncatePipeModule
  ],
  exports: [ConnectionFormComponent]
})

export class ConnectionFormModule { }
