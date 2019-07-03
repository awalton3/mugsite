import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule
  ]
})

export class FormsMaterialComponentsModule { }
