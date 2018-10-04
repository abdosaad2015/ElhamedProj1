import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'elhamed';
  constructor(private auth:AuthService,private route:Router,private userServ:UserService) {
  auth.user$.subscribe(user => 
    {
      if(user) {
        let returnUrl=localStorage.getItem('returnUrl');
        route.navigateByUrl(returnUrl);
        this.userServ.save(user);
      }
    });
  }
}
