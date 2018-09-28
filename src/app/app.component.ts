import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'elhamed';
  constructor(private auth:AuthService,route:Router) {
  auth.user$.subscribe(user => 
    {
      if(user) {
        let returnUrl=localStorage.getItem('returnUrl');
        route.navigateByUrl(returnUrl);
      }
    });
  }
}
