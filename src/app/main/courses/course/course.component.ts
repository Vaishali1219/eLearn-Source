import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../../../courses/course.model';
import { ImageService } from '../../../shared/image.service';
import { CourseService } from '../../../courses/course.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  @Input() course: Course;
  imageSource: any;
  isAuth: boolean = false;
  user: any;

  constructor(private imageService: ImageService, private router: Router, private authService: AuthService, private courseService: CourseService) { }

  ngOnInit(): void {
    this.isAuth = this.authService.getIsAuth();
    this.user = this.authService.getProfileInfo();
  }

  onViewCourse(id: string) {
    this.router.navigate(['main','products', id]);
  }

  onSubscribe(id: string) {
    this.courseService.onSubscribeTask(id, this.user._id);
  }

  getImage(img: any) {
    this.imageSource = this.imageService.createImageFromBlob(img);
    return this.imageSource;
  }

}
