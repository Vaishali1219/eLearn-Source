import { Component, OnInit } from '@angular/core';
import { Course } from '../course.model';
import { Subscription } from 'rxjs';
import { CourseService } from '../course.service';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { mimeType } from './mime-type.validator';
import { ImageService } from '../../shared/image.service';

@Component({
  selector: 'app-courses-create',
  templateUrl: './courses-create.component.html',
  styleUrls: ['./courses-create.component.scss']
})
export class CoursesCreateComponent implements OnInit {
  title: string = '';
  instructions: string = '';
  owner: string = '';
  updateDate: string = '';

  mode = 'create';
  courseId: string;
  imagePreview: string | ArrayBuffer;
  course: Course;
  isLoading = false;
  form: FormGroup;
  private isAuth: boolean = false;
  private authStatusSub: Subscription;
  imageSource: any;
  imageSourceFile: any;

  constructor(private courseService: CourseService, private authService: AuthService, private route: ActivatedRoute, private imageService: ImageService, private router: Router) { }

  ngOnInit(): void {
    this.authStatusSub = this.authService.getAuthStatusListner().subscribe(authStatus => {
      this.isAuth = authStatus;
    });
    this.form = new FormGroup({
      'title': new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      'instructions': new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      'image': new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] })
    });
    this.isLoading = true;
    if (this.isLoading) {
      this.form.setValue({
        'title': null,
        'instructions': null,
        'image': null
      });
    }
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('courseId')) {
        
        this.mode = 'edit';
        this.courseId = paramMap.get('courseId');
        this.courseService.getUserCourse(this.courseId).subscribe(courseData => {
          this.course = {
            _id: courseData.task._id,
            title: courseData.task.title,
            instructions: courseData.task.instructions,
            avatar: courseData.task.avatar,
            owner: courseData.owner,
            createdAt: courseData.task.createdAt,
            updatedAt: courseData.task.updatedAt
          };
          this.isLoading = false;
          this.imagePreview = this.getImage(this.course.avatar);
          this.form.controls['title'].disable();
          this.form.setValue({
            'title': this.course.title,
            'instructions': this.course.instructions,
            'image': null
          });
          this.owner = courseData.owner;
          this.updateDate = this.course.updatedAt;
        });
        
      } else {
        this.mode = 'create';
        this.owner = this.authService.getUser();
        const presentDate = new Date();
        this.updateDate = presentDate.toISOString();
        this.courseId = null;
        this.isLoading = false;
      }
    });
  }

  onAddCourse() {
    this.isLoading = true;
    //console.log(this.mode);
    if (this.mode === "create") {
      this.courseService.addCourse(this.form.value.title, this.form.value.instructions, this.form.value.image);
      this.isLoading = false;
    } else {
      var avatar = null;
      if (this.form.value.image) {
       avatar = this.form.value.image
      } else {
        avatar = this.course.avatar;
        //var image = this.getImageFile(this.course.avatar);

        //avatar = image.toDataURL('image/jpeg');
      }
      this.courseService.updateCourse(
        this.courseId,
        this.form.value.instructions,
        avatar
      );
      this.isLoading = false;
    }
    this.form.reset();
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();

    //console.log(file);
    //console.log(this.form);

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  getImageFile(img: any) {
    this.imageSourceFile = this.imageService.b64toFile(img);
    return this.imageSourceFile;
  }

  getImage(img: any) {
    this.imageSource = this.imageService.createImageFromBlob(img);
    return this.imageSource;
  }
}
