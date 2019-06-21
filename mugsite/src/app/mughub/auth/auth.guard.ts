import { Injectable } from '@angular/core';
import { Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanLoad {

  constructor(private userService: UserService) { }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    console.log(this.userService.isUserAuthenticated(route.path), route)
    return this.userService.isUserAuthenticated(route.path);
  }

  // canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot):
  //   boolean | Promise<boolean | UrlTree> | Observable<UrlTree | boolean> {
  //   console.log(this.route)
  //   return true;
  // }

}
