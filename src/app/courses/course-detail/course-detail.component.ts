import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseService } from '../course.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Course } from '../course.model';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { ImageService } from '../../shared/image.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit, OnDestroy {
  isAuth: boolean;
  private courseId: string;
  user: any;
  imageSource: any;
  course: Course;
  courses: Course[] = [];
  private courseSubs: Subscription;
  totalCourses: number;
  coursesPerPage: number = 2;
  currentPage: number = 1;
  pageSizeOptions = [];
  private selected = "updatedAt";
  private selectedOption = "desc";

  constructor(private courseService: CourseService, private route: ActivatedRoute, private imageService: ImageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isAuth = this.authService.getIsAuth();
    this.user = this.authService.getUserInfo();

    if (this.user.domain === 0) {
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        this.courseId = paramMap.get('courseId');
        //console.log(this.courseId);
        this.courseService.getUserCourse(this.courseId).subscribe(courseData => {
          //console.log(courseData);
          this.course = courseData.task;
          //console.log(this.course);
        });
      });

      this.courseService.getUserCourses(this.coursesPerPage, this.currentPage, this.selected, this.selectedOption);
      this.courseSubs = this.courseService.senduserCourses().subscribe((courseData: { courses: Course[], courseCount: number }) => {
        this.totalCourses = courseData.courseCount;
        this.courses = courseData.courses;
      });
    } else {

      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        this.courseId = paramMap.get('courseId');
        //console.log(this.courseId);
        this.courseService.getBuyerCourse(this.courseId).subscribe(courseData => {
          //console.log(courseData);
          this.course = courseData.task;
          //console.log(this.course);
        });
      });

      this.courseService.getBuyerCourses(this.coursesPerPage, this.currentPage);
      this.courseSubs = this.courseService.sendbuyerCourses().subscribe((courseData: { buyerCourses: Course[], buyerCourseCount: number }) => {
        this.totalCourses = courseData.buyerCourseCount;
        this.courses = courseData.buyerCourses;
      });
    }
    
  }

  ngOnDestroy() {
    this.courseSubs.unsubscribe();
  }

  onChangePage(pageData: PageEvent) {
    //console.log(pageData.pageIndex);
    this.currentPage = pageData.pageIndex + 1;
    this.coursesPerPage = pageData.pageSize;

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
