import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { SharedModule } from '../../shared/shared/shared.module';
import { AuthRoutingModule } from '../auth-routing/auth-routing.module';



@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
