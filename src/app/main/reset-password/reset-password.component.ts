import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onResetPassword(form: NgForm) {
    const email = form.value.email;
    const domain = form.value.domain;
    //console.log(domain);
    //console.log(email);
    this.authService.onForgotPassword(domain, email);
  }
}
