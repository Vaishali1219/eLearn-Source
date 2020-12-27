import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CourseListComponent } from '../course-list/course-list.component';
import { CoursesCreateComponent } from '../courses-create/courses-create.component';
import { CourseDetailComponent } from '../course-detail/course-detail.component';

import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
  { path: 'courses', component: CourseListComponent, canActivate: [AuthGuard] },
  { path: 'course-create', component: CoursesCreateComponent, canActivate: [AuthGuard] },
  { path: 'view/:courseId', component: CourseDetailComponent, canActivate: [AuthGuard] },
  { path: 'edit/:courseId', component: CoursesCreateComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
