import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SidenavService } from '../sidenav/sidenav.service';
import { UserService } from '../auth/user.service';
import { User } from '../auth/user.model';
import { Subscription, throwError } from 'rxjs';
import { MughubService } from '../mughub.service';
import { ConnectionFormService } from 'src/app/shared/connection-form/connection-form.service';
import { MatDrawer } from '@angular/material/sidenav';
import { SnackBarService } from 'src/app/shared/snack-bar/snack-bar.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {

  @ViewChild('profileImageEditor', { static: false }) profileImageEditor: MatDrawer;
  private subs = new Subscription();
  user: User;
  currProfileImage: { isDataUrl: boolean; url: string };
  prevProfileImageUrl: string;
  possibleConnections: User[] = [];
  existingConnections: User[] = [];
  connectionsValid: boolean = false;
  styleBreak = true;
  isUploading: boolean = false;
  submittedProfile: boolean = false;
  connectionsRequired: boolean = false;

  constructor(
    private userService: UserService,
    private sidenavService: SidenavService,
    private mughubService: MughubService,
    private connectionFormService: ConnectionFormService,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit() {
    this.user = this.userService.getUserSession();
    this.prevProfileImageUrl = this.user.photoUrl;
    this.currProfileImage = {
      isDataUrl: false,
      url: this.user.photoUrl
    }
    this.getPossibleConnections();
    this.getExistingConnections();
    this.listenForConnectionsValid();
  }

  getPossibleConnections() {
    if (this.user.type === 'tutor')
      this.getStudents();
    else
      this.getTutors();
  }

  getStudents() {
    this.subs.add(this.mughubService.fetchStudentsFromFb()
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          let student = new User(
            doc.data().name,
            doc.data().photoUrl,
            doc.data().email,
            doc.data().type,
            doc.data().uid,
            doc.data().isNewUser,
            doc.data().prefs,
            doc.data().connections);
          this.possibleConnections.push(student);
        });
      }, error => { console.log(error) }));
  }

  getTutors() {
    this.subs.add(this.mughubService.fetchTutorsFromFb()
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          let tutor = new User(
            doc.data().name,
            doc.data().photoUrl,
            doc.data().email,
            doc.data().type,
            doc.data().uid,
            doc.data().isNewUser,
            doc.data().prefs,
            doc.data().connections);
          this.possibleConnections.push(tutor);
        });
      }, error => { console.log(error) }));
  }

  getExistingConnections() {
    const currConnectionIds = this.userService.getUserSession().connections;
    currConnectionIds.map((connectionId: string) => {
      this.userService.getUserFromFbCollect(connectionId)
        .pipe(take(1))
        .subscribe((user) => {
          const userObj = new User(
            user.data().name,
            user.data().photoUrl,
            user.data().email,
            user.data().type,
            user.data().uid,
            user.data().isNewUser,
            user.data().prefs,
            user.data().connections);
          this.existingConnections.push(userObj);
        }, error => throwError(error))
    })
  }

  listenForConnectionsValid() {
    this.subs.add(this.connectionFormService.isformValid.subscribe(isFormValid => {
      this.connectionsValid = isFormValid;
    }))
  }

  requestProfileNameFormValue() {
    this.submittedProfile = true; //triggers edit-user-profile comp to send value
  }

  updateUserProfile(event: string) {
    this.isUploading = true;
    const newUsername = event;
    if (this.profileHasChanged(newUsername)) {
      if (this.isValidUsername(newUsername)) {
        this.userService.updateLocalUser([{ name: 'name', value: newUsername }]);
        this.handleProfileImage();
      } else {
        this.onError("Your username cannot be blank.");
      }
    } else {
      this.onError('There are no changes to update.');
    }
  }

  isValidUsername(newUsername: string) {
    return (newUsername !== '')
  }

  profileHasChanged(newUsername: string): boolean {
    const usernameChanged = (newUsername !== this.user.name);
    const profileImageChanged = (this.currProfileImage.url !== this.prevProfileImageUrl);
    return usernameChanged || profileImageChanged;
  }

  handleProfileImage() {
    if (this.currProfileImage.isDataUrl) {
      this.userService.uploadProfileImage(this.currProfileImage.url)
        .then(imageUrl => {
          this.currProfileImage = {
            isDataUrl: false,
            url: imageUrl
          }
          this.userService.updateLocalUser([{ name: 'photoUrl', value: imageUrl }]);
          this.onSuccess();
        })
        .catch(error => {
          console.log(error);
          this.onError("Error in uploading your profile image.");
        })
    } else {
      console.log('simple work occuring...')
      this.userService.updateLocalUser([{ name: 'photoUrl', value: this.currProfileImage.url }]);
      this.onSuccess();
    }
  }

  onFinishProfileImage(event: { isDataUrl: boolean, url: string }) {
    this.prevProfileImageUrl = this.currProfileImage.url;
    this.currProfileImage = {
      isDataUrl: event.isDataUrl,
      url: event.url
    }
    this.profileImageEditor.close();
  }

  onError(message: string) {
    this.isUploading = false;
    this.submittedProfile = false;
    this.snackBarService.onOpenSnackBar.next({ message: message, isError: true });
  }

  onSuccess() {
    this.isUploading = false;
    this.submittedProfile = false;
    this.userService.updateFbCollect();
  }

  closeSidenav() {
    this.sidenavService.onToggle.next();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
