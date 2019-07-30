import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from './shared/snack-bar/snack-bar.service';
import { SnackBarComponent } from './shared/snack-bar/snack-bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {

  private subs = new Subscription();
  loading: boolean = false;
  constructor(
    private router: Router,
    private snackBarService: SnackBarService,
    private snackBar: MatSnackBar
  ) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      } else if (event instanceof NavigationEnd) {
        this.loading = false;
      } else if (event instanceof NavigationError) {
        this.loading = false;
      } else if (event instanceof NavigationCancel) {
        this.loading = false;
      }
    });
  }

  ngOnInit() {
    this.listenForSnackBarOpen();
    this.listenForSnackBarClose();
  }

  listenForSnackBarOpen() {
    this.subs.add(this.snackBarService.onOpenSnackBar.subscribe(data =>
      this.openSnackbar({ message: data.message, isError: data.isError })));
  }

  listenForSnackBarClose() {
    this.subs.add(this.snackBarService.onCloseSnackBar.subscribe(() => this.snackBar.dismiss()));
  }

  openSnackbar(data: any) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 4000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      data: data
    })
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
