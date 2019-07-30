import { Injectable } from '@angular/core';
import { CanLoad, Route, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    let redirectUrl = '/mughub';
    segments.forEach(segment => redirectUrl = redirectUrl + '/' + segment.path);
    if (!this.userService.isUserAuthenticated(route.path)) {
      this.router.navigate(['mughub/login'], {
        queryParams: { return:  redirectUrl }
      });
    }
    return this.userService.isUserAuthenticated(route.path);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.userService.isUserAuthenticated(route.parent.routeConfig.path)) {
      this.router.navigate(['mughub/login'], {
        queryParams: { return: state.url }
      });
    }
    return this.userService.isUserAuthenticated(route.parent.routeConfig.path);
  }

}
