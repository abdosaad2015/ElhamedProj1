import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import * as firebase from 'firebase';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {
  user: firebase.User;
  constructor(private auth: AuthService, private userSer: UserService) {
  }
  canActivate() {
    return this.auth.AppUser$.pipe(map(e => e.roles.isAdmin));
  }
}
