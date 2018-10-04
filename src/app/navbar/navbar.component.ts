import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    user$: Observable<firebase.User>;
    constructor(private afAuth: AuthService,private route:Router) {
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
