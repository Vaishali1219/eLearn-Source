import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-reset-password',
  templateUrl: './change-reset-password.component.html',
  styleUrls: ['./change-reset-password.component.scss']
})
export class ChangeResetPasswordComponent implements OnInit {
  isLoading: boolean = false;
  interval: any;
  timeLeft: number = 20;
  timerUp: boolean = false;
  email: string;
  domain: number;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.email = this.authService.Email;
    this.domain = this.authService.Domain;
    //console.log(this.email);
    //console.log(this.domain);
    this.startTimer();
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.timerUp = false;
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.pauseTimer();
        this.timeLeft = 20;
      }
    }, 1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
    this.timerUp = true;
  }


  onValidateOtp(form: NgForm) {
    const otp = parseInt(form.value.otp);
    this.authService.onValidateOtp(otp);
    this.pauseTimer();
    this.router.navigate(['auth','login']);
  }

  onResendOtp() {
    this.authService.onForgotPassword(this.domain, this.email);
    if (!this.timerUp) {
      this.pauseTimer();
      this.startTimer();
    } else {
      this.startTimer();
    }
  }

}
