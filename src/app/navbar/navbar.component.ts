import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserService, user } from '../user.service';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    isAdmin:boolean;
    user$: Observable<firebase.User>;
    user$$: Observable<user>;
    constructor(public afAuth: AuthService,private route:Router,private userServ:UserService) {
        this.user$$=this.afAuth.AppUser$.pipe(map(user =>user));
        this.afAuth.userState.subscribe(e =>{
            if(e) {
                this.user$ = afAuth.user$;
        } else {
            this.user$=null;
        } }  )
        this.user$ = afAuth.user$;        
    }
    ngOnInit() {
    }
    logout() {
        this.afAuth.logout();
    }
}
