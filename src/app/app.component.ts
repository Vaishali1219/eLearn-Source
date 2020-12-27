import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'E-Learn';
  user: any;
  isAuth: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.autoAuthUser();
    this.isAuth = this.authService.getIsAuth();
    if (this.isAuth) {
      this.user = this.authService.userdomain;
    }
    
  }
}
