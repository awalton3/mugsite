import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from './snack-bar.component';

@Injectable({ providedIn: 'root' })

export class SnackBarService {

  openSnackbar(snackBar: MatSnackBar, duration: number, verticalPosition: any, horizontalPosition: any, data: any) {
    snackBar.openFromComponent(SnackBarComponent, {
      duration: duration,
      verticalPosition: verticalPosition,
      horizontalPosition: horizontalPosition,
      data: data
    })
  }

}
