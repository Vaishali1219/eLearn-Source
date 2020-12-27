import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { Course } from '../course.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ImageService } from '../../shared/image.service';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-view-all-course-detail',
  templateUrl: './view-all-course-detail.component.html',
  styleUrls: ['./view-all-course-detail.component.scss']
})
export class ViewAllCourseDetailComponent implements OnInit {
  isAuth: boolean = false;
  user: any;
  private courseId: string;
  imageSource: any;
  course: Course;
  courses: Course[] = [];
  private courseSubs: Subscription;
  totalCourses: number;
  coursesPerPage: number = 5;
  currentPage: number;
  pageSizeOptions = [];
  private selected = "updatedAt";
  private selectedOption = "desc";

  constructor(private courseService: CourseService, private route: ActivatedRoute, private imageService: ImageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isAuth = this.authService.getIsAuth();

    if (this.isAuth) {
      this.user = this.authService.getProfileInfo();
    }

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.courseId = paramMap.get('id');
      //console.log(this.courseId);
      this.courseService.getAllCourse(this.courseId).subscribe(courseData => {
        //console.log(courseData);
        this.course = courseData.task;
        //console.log(this.course);
      });
    });

    this.courseService.getAllCourses(this.coursesPerPage, this.currentPage, this.selected, this.selectedOption);
    this.courseSubs = this.courseService.sendallUserCourses().subscribe((courseData: { allCourses: Course[], allCourseCount: number }) => {
      this.totalCourses = courseData.allCourseCount;
      this.courses = courseData.allCourses;
    });
  }

  ngOnDestroy() {
    this.courseSubs.unsubscribe();
  }

  onSubscribe(courseId: string) {
    this.courseService.onSubscribeTask(courseId, this.user._id);
  }

  onChangePage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.coursesPerPage = pageData.pageSize;
    this.courseService.getAllCourses(this.coursesPerPage, this.currentPage, this.selected, this.selectedOption);
  }

  onChange() {
    this.courseService.getAllCourses(this.coursesPerPage, this.currentPage, this.selected, this.selectedOption);
  }


  getImage(img: any) {
    this.imageSource = this.imageService.createImageFromBlob(img);
    return this.imageSource;
  }


}
