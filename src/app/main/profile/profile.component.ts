import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ImageService } from '../../shared/image.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy, OnChanges {
  user: any;
  profilePic: any = null;
  isAuth: boolean = false;
  private isAuthSubs: Subscription;
  imageSource: any;
  private userSubsc: Subscription;
  private profilePicSubsc: Subscription;

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute, private imageService: ImageService) { }

  ngOnInit(): void {
    //window.location.reload();
    this.isAuth = this.authService.getIsAuth();
    this.isAuthSubs = this.authService.getAuthStatusListner().subscribe(authStatus => {
      this.isAuth = authStatus.isAuth;
    });

    if (this.isAuth) {
      this.user = this.authService.getProfileInfo();
      this.userSubsc = this.authService.getUpdatedUserInfo().subscribe(userInfo => {
        this.user = userInfo;
      });
      //console.log(this.user);
    }

    if (this.user.avatar) {
      this.profilePic = this.getImage(this.user.avatar);
    }

    this.profilePicSubsc = this.authService.getUpdatedProfilePic().subscribe(pic => {
      if (pic) {
        this.profilePic = this.getImage(pic);
      }
    });
  }

  sendData() {
    this.authService.currentUser(this.user);
  }

  onUpload() {
    this.router.navigate(["change-profile-pic"], { relativeTo: this.activatedRoute });
  }

  getImage(img: any) {
    this.imageSource = this.imageService.createImageFromBlob(img);
    return this.imageSource;
  }

  onDelete() {
    this.profilePic = null;
    this.authService.onProfilePicDeleted();
  }

  ngOnDestroy() {
    this.isAuthSubs.unsubscribe();
    this.userSubsc.unsubscribe();
    this.profilePicSubsc.unsubscribe();
  }

  ngOnChanges() {
    this.isAuth = this.authService.getIsAuth();
    this.isAuthSubs = this.authService.getAuthStatusListner().subscribe(authStatus => {
      this.isAuth = authStatus.isAuth;
    });

    if (this.isAuth) {
      this.user = this.authService.getProfileInfo();
      this.userSubsc = this.authService.getUpdatedUserInfo().subscribe(userInfo => {
        this.user = userInfo;
      });
    }

    if (this.user.avatar) {
      this.profilePic = this.getImage(this.user.avatar);
    }

    this.profilePicSubsc = this.authService.getUpdatedProfilePic().subscribe(pic => {
      if (pic) {
        this.profilePic = this.getImage(pic);
      }
    });
  }

}
