import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SidenavService } from '../sidenav/sidenav.service';
import { UserService } from '../auth/user.service';
import { User } from '../auth/user.model';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { MughubService } from '../mughub.service';
import { ConnectionFormService } from 'src/app/shared/connection-form/connection-form.service';
import { MatDrawer } from '@angular/material/sidenav';
import { SnackBarService } from 'src/app/shared/snack-bar/snack-bar.service';

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
  possibleConnections: User[] = [];
  existingConnections: User[] = [];
  styleBreak = true;
  isUploading: boolean = false;
  submittedProfile: boolean = false;

  constructor(
    private userService: UserService,
    private sidenavService: SidenavService,
    private mughubService: MughubService,
    private connectionFormService: ConnectionFormService,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit() {
    this.user = this.userService.getUserSession();
    this.currProfileImage = {
      isDataUrl: false,
      url: this.user.photoUrl
    }
    this.getExistingConnections();
    this.getPossibleConnections();
  }

  getPossibleConnections() {
    if (this.user.type === 'tutor')
      this.getStudents();
    else
      this.getTutors();
  }

  getExistingConnections() {
    this.userService.getUserSession().connections.forEach((connectionId: string) => {
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
        })
      this.connectionFormService.onInitForEdit.next(this.existingConnections);
    })
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

  requestProfileNameFormValue() {
    this.submittedProfile = true; //triggers edit-user-profile comp to send value
  }

  updateUserProfile(event: string) {
    this.isUploading = true;
    if (event !== '') {
      const username = event;
      this.userService.updateLocalUser([{ name: 'name', value: username }]);
      this.handleProfileImage();
    } else {
      this.onError('Your username cannot be blank.');
    }
  }

  handleProfileImage() {
    if (this.currProfileImage.isDataUrl) {
      this.userService.uploadProfileImage(this.currProfileImage.url)
        .then(imageUrl => {
          this.userService.updateLocalUser([{ name: 'photoUrl', value: imageUrl }]);
          this.isUploading = false;
        })
        .catch(error => {
          console.log(error);
          this.onError("Error in uploading your profile image.");
        })
    } else {
      this.userService.updateLocalUser([{ name: 'photoUrl', value: this.currProfileImage.url }]);
    }
  }

  onFinishProfileImage(event: { isDataUrl: boolean, url: string }) {
    this.currProfileImage = {
      isDataUrl: event.isDataUrl,
      url: event.url
    }
    this.profileImageEditor.close();
  }

  onError(message: string) {
    this.snackBarService.onOpenSnackBar.next({ message: message, isError: true });
  }

  closeSidenav() {
    this.sidenavService.onToggle.next();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
