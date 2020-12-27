import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthData } from '../../auth/auth-data.model';
import { AuthService } from '../../auth/auth.service';
import { mimeType } from '../../courses/courses-create/mime-type.validator';
import { ImageService } from '../../shared/image.service';

@Component({
  selector: 'app-change-profile-pic',
  templateUrl: './change-profile-pic.component.html',
  styleUrls: ['./change-profile-pic.component.scss']
})
export class ChangeProfilePicComponent implements OnInit, OnDestroy {

  private authStatusSub: Subscription;
  private userSubsc: Subscription;
  isAuth: boolean = false;
  form: FormGroup;
  isLoading: boolean = false;
  user: AuthData;
  imagePreview: any = null;
  imageSource: any;
  private profilePicSubs: Subscription;

  constructor(private authService: AuthService, private imageService: ImageService) { }

  ngOnInit(): void {
    this.authStatusSub = this.authService.getAuthStatusListner().subscribe(authStatus => {
      this.isAuth = authStatus;
    });
    this.form = new FormGroup({
      'image': new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] })
    });
    this.isLoading = true;
    this.userSubsc = this.authService.getCurrentUser().subscribe(userInfo => {
      this.user = userInfo;
    });
    const userInfo = this.user;
    if (!userInfo) {
      this.user = this.authService.getProfileInfo();
    }
    this.isLoading = false;

    var image = this.authService.getCurrentProfilePic();
    this.imagePreview = this.getImage(image);
    this.profilePicSubs = this.authService.getUpdatedProfilePic().subscribe(pic => {
      this.imagePreview = this.getImage(pic);
    });

    //if (this.user.avatar) {
    //  this.imagePreview = this.getImage(this.user.avatar);
    //}

    
  }

  onUpdateProfile() {
    this.isLoading = true;
    this.authService.updateProfilePic(this.form.value.image);
    this.isLoading = false;
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  getImage(img: any) {
    this.imageSource = this.imageService.createImageFromBlob(img);
    return this.imageSource;
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
    this.userSubsc.unsubscribe();
  }

}
