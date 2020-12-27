import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  isLoading: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(form.value.domain,
      form.value.name,
      form.value.email,
      form.value.password,
      form.value.phone,
      form.value.address,
      form.value.city,
      form.value.state,
      form.value.country
    );
  }
}
