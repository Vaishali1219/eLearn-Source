import { Component, OnInit, OnDestroy } from '@angular/core';
import { Course } from '../course.model';
import { CourseService } from '../course.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from '../../auth/auth.service';
import { ImageService } from '../../shared/image.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  imageSource: any;
  courses: Course[] = [];
  private courseSubs: Subscription;
  totalCourses: number;
  coursesPerPage: number = 2;
  currentPage: number = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userId: any;
  selected = null;
  selectedOption = "asc";
  user: any;

  constructor(private courseService: CourseService, private authService: AuthService, private imageService: ImageService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.user = this.authService.getUserInfo();

    if (this.user.domain === 0) {
      this.userId = this.user._id;
      this.courseService.getUserCourses(this.coursesPerPage, this.currentPage, this.selected, this.selectedOption);
      this.courseSubs = this.courseService.senduserCourses().subscribe((courseData: { courses: Course[], courseCount: number }) => {
        this.isLoading = false;
        this.totalCourses = courseData.courseCount;
        this.courses = courseData.courses;
      });
    } else {
      this.courseService.getBuyerCourses(this.coursesPerPage, this.currentPage);
      this.userId = this.user._id;
      this.courseSubs = this.courseService.sendbuyerCourses().subscribe((courseData: { buyerCourses: Course[], buyerCourseCount: number }) => {
        this.isLoading = false;
        this.totalCourses = courseData.buyerCourseCount;
        this.courses = courseData.buyerCourses;
      });
    }
    
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

    if (this.user.domain === 0) {
      this.courseService.getUserCourses(this.coursesPerPage, this.currentPage, this.selected, this.selectedOption);
    } else {
      this.courseService.getBuyerCourses(this.coursesPerPage, this.currentPage);
    }
    
  }

  onChange() {
    if (this.user.domain === 0) {
      this.courseService.getUserCourses(this.coursesPerPage, this.currentPage, this.selected, this.selectedOption);
    } else {
      this.courseService.getBuyerCourses(this.coursesPerPage, this.currentPage);
    }
  }

  getImage(img: any) {
    this.imageSource = this.imageService.createImageFromBlob(img);
    return this.imageSource;
  }

}
