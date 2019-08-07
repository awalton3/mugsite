import { Component, OnInit, OnDestroy } from '@angular/core';
import { SidenavService } from '../sidenav/sidenav.service';
import { UserService } from '../auth/user.service';
import { User } from '../auth/user.model';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { MughubService } from '../mughub.service';
import { ConnectionFormService } from 'src/app/shared/connection-form/connection-form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {

  private subs = new Subscription();
  user: User;
  currProfileImage: { isDataUrl: boolean; url: string };
  possibleConnections: User[] = [];
  existingConnections: User[] = [];

  constructor(
    private userService: UserService,
    private sidenavService: SidenavService,
    private mughubService: MughubService,
    private connectionFormService: ConnectionFormService,
    private router: Router
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

  // loadImages() {
  //   this.router.navigate(['mughub/welcome/account-setup/profile/image']);
  // }

  closeSidenav() {
    this.sidenavService.onToggle.next();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
