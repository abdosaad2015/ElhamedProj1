import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    user$: Observable<firebase.User>;
    constructor(private afAuth: AuthService) {
        this.user$ = afAuth.user$;
    }
    ngOnInit() {
    }
    logout() {
        this.afAuth.logout();
    }
}
