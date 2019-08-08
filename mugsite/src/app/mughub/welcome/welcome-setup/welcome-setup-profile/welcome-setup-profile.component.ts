import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/mughub/auth/user.service';
import { StepperService } from 'src/app/shared/stepper/stepper.service';
import { MatDrawer } from '@angular/material/sidenav';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import { SnackBarService } from 'src/app/shared/snack-bar/snack-bar.service';

@Component({
  selector: 'mughub-welcome-setup-profile',
  templateUrl: './welcome-setup-profile.component.html',
  styleUrls: ['./welcome-setup-profile.component.css']
})

export class WelcomeSetupProfileComponent implements OnInit {

  @ViewChild('profileImageEditor', { static: false }) profileImageEditor: MatDrawer;
  currProfileImage: { isDataUrl: boolean, url: string };
  isUploading: boolean = false;
  submitted: boolean = false;

  constructor(
    private userService: UserService,
    private stepperService: StepperService,
    private router: Router,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit() {
    this.currProfileImage = {
      isDataUrl: false,
      url: this.userService.getUserSession().photoUrl
    };
  }

  requestNameFormValue() {
    this.submitted = true; //triggers edit-user-profile comp to send value
  }

  onProfileSubmit(event: string) {
    const username = event;
    this.userService.updateLocalUser([{ name: 'name', value: username }]);
    this.handleProfileImage();
  }

  handleProfileImage() {
    this.isUploading = true;
    if (this.currProfileImage.isDataUrl) {
      this.uploadProfileImage(this.currProfileImage.url)
        .then(snapshot => {
          this.getFbDownloadUrl(snapshot)
            .then(url => {
              this.userService.updateLocalUser([{ name: 'photoUrl', value: url }]);
              this.onSuccess();
            })
            .catch(error => {
              console.log(error);
              this.onError('Error in retrieving imageUrl from storage');
            })
        })
        .catch(error => {
          console.log(error);
          this.onError("Error saving your image to storage.");
        })
    } else {
      this.userService.updateLocalUser([{ name: 'photoUrl', value: this.currProfileImage.url }]);
      this.onSuccess();
    }
  }

  async uploadProfileImage(imageDataUrl: string): Promise<any> {
    try {
      const snapshot = await this.userService.uploadProfileImageToFb(imageDataUrl);
      return Promise.resolve(snapshot);
    }
    catch (error) {
      return Promise.reject(error);
    }
  }

  async getFbDownloadUrl(snapshot: UploadTaskSnapshot) {
    try {
      const url = await snapshot.ref.getDownloadURL();
      return Promise.resolve(url);
    }
    catch (error) {
      return Promise.resolve(error);
    }
  }

  onError(message: string) {
    this.snackBarService.onOpenSnackBar.next({ message: message, isError: true });
  }

  onSuccess() {
    this.isUploading = false;
    this.stepperService.onChangeStep.next({ name: 'settings', num: 1 });
    this.router.navigate(["mughub/welcome/account-setup/settings"])
  }

  loadImages() {
    this.router.navigate(['mughub/welcome/account-setup/profile/image']);
  }

  onFinishEditProfileImage(event: { isDataUrl: boolean, url: string }) {
    this.currProfileImage.url = event.url;
    this.currProfileImage.isDataUrl = event.isDataUrl;
    this.profileImageEditor.close();
  }

}
