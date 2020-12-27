import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { ResetPasswordComponent } from '../../main/reset-password/reset-password.component';
import { ChangeResetPasswordComponent } from '../../main/change-reset-password/change-reset-password.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ResetPasswordComponent },
  { path: 'validate-otp', component: ChangeResetPasswordComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
