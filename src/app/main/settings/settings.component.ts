import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthData } from '../../auth/auth-data.model';
import { Router } from '@angular/router';
import { ImageService } from '../../shared/image.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  private authStatusSub: Subscription;
  private userSubsc: Subscription;
  isAuth: boolean = false;
  form: FormGroup;
  isLoading: boolean = false;
  user: AuthData;
  imageSource: any;
  tempUser: any;

  constructor(private authService: AuthService, private router: Router, private imageService: ImageService) { }

  ngOnInit(): void {
    this.authStatusSub = this.authService.getAuthStatusListner().subscribe(authStatus => {
      this.isAuth = authStatus.isAuth;
    });
    this.form = new FormGroup({
      'name': new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      'address': new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      'city': new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      'state': new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      'country': new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] })
    });
    this.isLoading = true;
    this.userSubsc = this.authService.getCurrentUser().subscribe(userInfo => {
      this.user = userInfo;
    });
    const userInfo = this.user;
    //console.log(userInfo);
    if (!userInfo) {
      this.user = this.authService.getProfileInfo();
    }
    //this.tempUser = this.authService.getUserProfile();
    //console.log(this.tempUser);

    this.isLoading = false;
    this.form.setValue({
      'name': this.user.name,
      'address': this.user.address,
      'city': this.user.city,
      'state': this.user.state,
      'country': this.user.country
    });
       
  }

  onUpdateProfile() {
    this.isLoading = true;
    this.authService.updateUserInfo(
      this.form.value.name,
      this.form.value.address,
      this.form.value.city,
      this.form.value.state,
      this.form.value.country
    );
    this.isLoading = false;
    this.form.reset();
  }

  onChangePassword(){
    this.router.navigate(['main', 'profile', 'change-password']);
  }

  onChangeProfilePic(){
    this.router.navigate(['main', 'profile', 'change-profile-pic']);
  }

  onLogoutall(){
    this.authService.onLogoutall();
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
