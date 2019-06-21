import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate, CanLoad {

  constructor(private userService: UserService) { }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.isUserAuthenticated(route.path);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.userService.isUserAuthenticated(route._urlSegment.segments[1].path);
  }

}
