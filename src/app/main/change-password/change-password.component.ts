import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  isLoading: boolean = false;
  user: any;
  userUpdatedPassword: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.getProfileInfo();
  }

  onChangePassword(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.userUpdatedPassword = true;
    this.authService.changePassword(form.value.password, this.userUpdatedPassword);
  }
}
