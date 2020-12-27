import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Course } from '../../courses/course.model';
import { Subscription } from 'rxjs';
import { CourseService } from '../../courses/course.service';
import { ImageService } from '../../shared/image.service';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, OnDestroy {
  isAuth: boolean = false;
  isLoading: boolean = false;
  courses: Course[] = [];
  private courseSubs: Subscription;
  totalCourses: number;
  coursesPerPage: number = 4;
  currentPage: number = 1;
  pageSizeOptions = [4, 8, 12, 16, 20];
  selected = null;
  selectedOption = "asc";

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.courseService.getAllCourses(this.coursesPerPage, this.currentPage, this.selected, this.selectedOption);
    this.courseSubs = this.courseService.sendallUserCourses().subscribe((courseData: { allCourses: Course[], allCourseCount: number }) => {
      this.isLoading = false;
      this.totalCourses = courseData.allCourseCount;
      this.courses = courseData.allCourses;
    });
  }

  getLength() {
    return this.totalCourses;
  }

  ngOnDestroy() {
    this.courseSubs.unsubscribe();
  }

  onChangePage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.coursesPerPage = pageData.pageSize;
    this.courseService.getAllCourses(this.coursesPerPage, this.currentPage, this.selected, this.selectedOption);
  }

  onChange() {
    this.courseService.getAllCourses(this.coursesPerPage, this.currentPage, this.selected, this.selectedOption);
  }

}
