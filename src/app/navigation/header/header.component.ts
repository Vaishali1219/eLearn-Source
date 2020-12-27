import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  @Input() title: string;
  isAuth: boolean = false;
  private isAuthSubs: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isAuth = this.authService.getIsAuth();
    this.isAuthSubs = this.authService.getAuthStatusListner().subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.isAuthSubs.unsubscribe();
  }
}
