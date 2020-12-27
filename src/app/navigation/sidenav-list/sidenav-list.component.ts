import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit{
  @Output() sidenavClose = new EventEmitter<void>();
  private authStatusSubs: Subscription;
  isAuth: boolean = false;
  user: any;
  domain: number;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isAuth = this.authService.getIsAuth();
    if (this.isAuth) {
      var userInfo = this.authService.getProfileInfo();
      this.user = userInfo;
      this.domain = this.user.domain;
    }
    this.authStatusSubs = this.authService.getAuthStatusListner().subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  onClose() {
    this.sidenavClose.emit();
  }

  ngOnDestroy() {
    this.authStatusSubs.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

}
