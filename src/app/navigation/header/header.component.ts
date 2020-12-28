import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, AfterContentChecked, OnChanges } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy, OnChanges {
  @Output() sidenavToggle = new EventEmitter<void>();
  @Input() title: string;
  isAuth: boolean = false;
  private isAuthSubs: Subscription;
  private userDataSubsc: Subscription;
  domain: number;
  user: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isAuth = this.authService.getIsAuth();
    this.isAuthSubs = this.authService.getAuthStatusListner().subscribe(authStatus => {
      this.isAuth = authStatus.isAuth;
      this.domain = authStatus.user.domain;
    });
  }

  ngOnChanges() {
    this.isAuth = this.authService.getIsAuth();
    this.isAuthSubs = this.authService.getAuthStatusListner().subscribe(authStatus => {
      this.isAuth = authStatus.isAuth;
      this.domain = authStatus.user.domain;
    });  
  }
  

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.onLogoutall();
  }

  ngOnDestroy() {
    this.isAuthSubs.unsubscribe();
    this.userDataSubsc.unsubscribe();
  }
}
