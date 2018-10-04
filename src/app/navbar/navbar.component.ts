import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import * as firebase from 'firebase';
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    isAdmin:boolean;
    user$: Observable<firebase.User>;
    constructor(private afAuth: AuthService,private route:Router,private userServ:UserService) {
        this.afAuth.userState.subscribe(e =>{
            if(e) {
                this.user$ = afAuth.user$;
        } else {
            this.user$=null;
        } }  )
        this.user$ = afAuth.user$;
        afAuth.user$.subscribe(user =>this.userServ.getUser(user.uid).subscribe(user => this.isAdmin=user.roles.isAdmin));
        
    }
    ngOnInit() {
    }
    logout() {
        this.afAuth.logout();
    }
}
