import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userState:BehaviorSubject<Boolean>;
user$ :Observable<firebase.User>;
  constructor(private afAuth:AngularFireAuth,private route:ActivatedRoute,private router:Router) { 
    this.userState=new BehaviorSubject(false);
    this.user$=this.afAuth.authState;
  }
  login() {
    let reurnUrl= this.route.snapshot.queryParamMap.get('returnUrl') || '/';
     localStorage.setItem('returnUrl',reurnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
  logout(){
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
    localStorage.clear();
    this.userState.next(false);

  }
}
