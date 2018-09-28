import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth'
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 user: firebase.User;
  constructor(private afAuth:AuthService) { 
    this.afAuth.user$.subscribe(user => this.user=user);
  }
  ngOnInit() {
  }
  login() {
 this.afAuth.login();
 }
}
