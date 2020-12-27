import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';

import { ProfileComponent } from '../profile/profile.component';
import { PlaceHolderComponent } from '../place-holder/place-holder.component';
import { SettingsComponent } from '../settings/settings.component';
import { AccountStatsComponent } from '../account-stats/account-stats.component';
import { ChangeProfilePicComponent } from '../change-profile-pic/change-profile-pic.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ViewProfilePicComponent } from '../view-profile-pic/view-profile-pic.component';
import { CoursesComponent } from '../courses/courses.component';
import { ViewAllCourseDetailComponent } from '../../courses/view-all-course-detail/view-all-course-detail.component';

const routes: Routes = [
  { path: 'products', component: CoursesComponent },
  { path: 'products/:id', component: ViewAllCourseDetailComponent },
  {
    path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], children: [
      { path: '', component: PlaceHolderComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'account-stats', component: AccountStatsComponent },
      { path: 'change-profile-pic', component: ChangeProfilePicComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'view-profile-pic', component: ViewProfilePicComponent }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MainRoutingModule { }
