import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesComponent } from '../courses/courses.component';
import { ProfileComponent } from '../profile/profile.component';
import { SettingsComponent } from '../settings/settings.component';
import { AccountStatsComponent } from '../account-stats/account-stats.component';
import { PlaceHolderComponent } from '../place-holder/place-holder.component';
import { ChangeProfilePicComponent } from '../change-profile-pic/change-profile-pic.component';
import { ChangeResetPasswordComponent } from '../change-reset-password/change-reset-password.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { ViewProfilePicComponent } from '../view-profile-pic/view-profile-pic.component';
import { CourseComponent } from '../courses/course/course.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { SharedModule } from '../../shared/shared/shared.module';
import { ImageComponent } from '../../shared/image/image.component';
import { MainRoutingModule } from '../main-routing/main-routing.module';

@NgModule({
  declarations: [
    CoursesComponent,
    ProfileComponent,
    SettingsComponent,
    AccountStatsComponent,
    PlaceHolderComponent,
    ChangeProfilePicComponent,
    ChangeResetPasswordComponent,
    ChangePasswordComponent,
    ResetPasswordComponent,
    ViewProfilePicComponent,
    CourseComponent,
    ImageComponent,
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ]
})
export class MainModule { }
