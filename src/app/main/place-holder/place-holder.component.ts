import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { CourseService } from '../../courses/course.service';
import { Course } from '../../courses/course.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-place-holder',
  templateUrl: './place-holder.component.html',
  styleUrls: ['./place-holder.component.scss']
})
export class PlaceHolderComponent implements OnInit, OnDestroy, OnChanges {
  isLoading: boolean = false;
  courses: Course[] = [];
  private courseSubs: Subscription;
  totalCourses: number;
  coursesPerPage: number = 3;
  currentPage = 1;
  pageSizeOptions = [4];
  private selected = "createdAt";
  private selectedOption = "asc";
  private userId: string;
  private user: any;

  constructor(private courseService: CourseService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.user = this.authService.getUserInfo();
    //console.log(this.user);

    if (this.user.domain === 0) {
      const courseInfo = this.courseService.getUserCourses(this.coursesPerPage, this.currentPage, this.selected, this.selectedOption);
      this.courseSubs = this.courseService.userCoursesUpdated.subscribe((courseData: { courses: Course[], courseCount: number }) => {
        this.isLoading = false;
        this.totalCourses = courseData.courseCount;
        this.courses = courseData.courses;
      });
      this.courses = courseInfo.courses;
      this.totalCourses = courseInfo.maxCourses;
      //console.log(this.totalCourses);

    } else {
      const courseInfo = this.courseService.getBuyerCourses(this.coursesPerPage, this.currentPage);
      this.courseSubs = this.courseService.buyerCoursesUpdated.subscribe((courseData: { buyerCourses: Course[], buyerCourseCount: number }) => {
        this.isLoading = false;
        this.totalCourses = courseData.buyerCourseCount;
        this.courses = courseData.buyerCourses;
      });
      this.courses = courseInfo.buyerCourses;
      this.totalCourses = courseInfo.buyerCourseCount;
      //console.log(this.totalCourses);
    }
    
  }

  ngOnChanges() {
    this.isLoading = true;
    this.user = this.authService.getCurrentUser();
    //console.log(this.user);
    if (this.user.domain === 0) {
      const courseInfo = this.courseService.getUserCourses(this.coursesPerPage, this.currentPage, this.selected, this.selectedOption);
      this.courseSubs = this.courseService.userCoursesUpdated.subscribe((courseData: { courses: Course[], courseCount: number }) => {
        this.isLoading = false;
        this.totalCourses = courseData.courseCount;
        this.courses = courseData.courses;
      });
      this.courses = courseInfo.courses;
      this.totalCourses = courseInfo.maxCourses;
      //console.log(this.totalCourses);

    } else {
      const courseInfo = this.courseService.getBuyerCourses(this.coursesPerPage, this.currentPage);
      this.courseSubs = this.courseService.buyerCoursesUpdated.subscribe((courseData: { buyerCourses: Course[], buyerCourseCount: number }) => {
        this.isLoading = false;
        this.totalCourses = courseData.buyerCourseCount;
        this.courses = courseData.buyerCourses;
      });
      this.courses = courseInfo.buyerCourses;
      this.totalCourses = courseInfo.buyerCourseCount;
      //console.log(this.totalCourses);
    }
  }

  onView(id: string) {
    this.router.navigate(['courses','view', id]);
  }

  ngOnDestroy() {
    this.courseSubs.unsubscribe();
    this.totalCourses = 0;
    this.courses = [];
  }

  onChangePage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.coursesPerPage = pageData.pageSize;

    if (this.user.domain === 0) {
      this.courseService.getUserCourses(this.coursesPerPage, this.currentPage, this.selected, this.selectedOption);
    } else {
      this.courseService.getBuyerCourses(this.coursesPerPage, this.currentPage);
    }
    
  }
}
