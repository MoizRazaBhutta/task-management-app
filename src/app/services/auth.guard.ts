import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor() {}
  userService = inject(UserService);
  canActivate(): boolean {
    if (!this.userService.isLoggedIn()) {
      console.error('Access denied - not logged in');
      this.userService.router.navigate(['/login']);
      return false; // User is not logged in, access denied
    }
    return true;
  }
}
