import { Injectable } from '@angular/core';
import { CanLoad, Route, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  canLoad(route: Route): boolean {
    if (!this.userService.isUserAuthenticated(route.path))
      this.router.navigate(['mughub/auth/login'])
    return this.userService.isUserAuthenticated(route.path);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.userService.isUserAuthenticated(route.parent.routeConfig.path))
      this.router.navigate(['mughub/auth/login'])
    return this.userService.isUserAuthenticated(route.parent.routeConfig.path);
  }

}
