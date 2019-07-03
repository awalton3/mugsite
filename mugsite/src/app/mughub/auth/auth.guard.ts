import { Injectable } from '@angular/core';
import { CanLoad, Route, ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  canLoad(route: Route): boolean {
    if (!this.userService.isUserAuthenticated(route.path)) {
      this.authService.logout();
      this.router.navigate(['mughub/login']);
    }
    return this.userService.isUserAuthenticated(route.path);
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.userService.isUserAuthenticated(route.parent.routeConfig.path)) {
      this.authService.logout();
      this.router.navigate(['mughub/login']);
    }
    return this.userService.isUserAuthenticated(route.parent.routeConfig.path);
  }

}
