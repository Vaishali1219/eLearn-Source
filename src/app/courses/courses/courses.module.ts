import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared/shared.module';

import { CourseDetailComponent } from '../course-detail/course-detail.component';
import { CoursesCreateComponent } from '../courses-create/courses-create.component';
import { CourseListComponent } from '../course-list/course-list.component';
import { ViewAllCourseDetailComponent } from '../view-all-course-detail/view-all-course-detail.component';
import { CoursesRoutingModule } from '../courses-routing/courses-routing.module';

@NgModule({
  declarations: [
    CourseDetailComponent,
    CoursesCreateComponent,
    CourseListComponent,
    ViewAllCourseDetailComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule
  ]
})
export class CoursesModule { }
