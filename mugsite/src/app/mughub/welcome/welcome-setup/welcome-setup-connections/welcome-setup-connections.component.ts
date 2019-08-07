import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/mughub/auth/user.service';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { MughubService } from 'src/app/mughub/mughub.service';
import { User } from 'src/app/mughub/auth/user.model';
import { ConnectionFormService } from 'src/app/shared/connection-form/connection-form.service';

@Component({
  selector: 'mughub-welcome-setup-students',
  templateUrl: './welcome-setup-connections.component.html',
  styleUrls: ['./welcome-setup-connections.component.css']
})
export class WelcomeSetupConnectionsComponent implements OnInit, OnDestroy {

  private subs = new Subscription();
  possibleConnections: User[] = [];
  selectedConnections: string[] = [];
  selectedConnectionsOrig: string[] = [];
  connectionsValid: boolean = false;
  connectionRequired: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private mughubService: MughubService,
    private connectionsFormService: ConnectionFormService
  ) { }

  ngOnInit() {
    this.userService.getUserSession().type === 'tutor' ? this.getStudents() : this.getTutors();
    this.listenToSelectedConnections();
    this.listenToConnectionsValid();
  }

  listenToSelectedConnections() {
    this.subs.add(this.connectionsFormService.onConnectionsChanged.subscribe(connectionsObj => {
      this.selectedConnections = connectionsObj.selectedConnections;
      this.selectedConnectionsOrig = connectionsObj.selectedConnectionsOrig;
    }));
  }

  listenToConnectionsValid() {
    this.subs.add(this.connectionsFormService.isformValid.subscribe(isFormValid => {
      this.connectionsValid = isFormValid;
    }));
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

  onFinish() {
    this.userService.updateLocalUser([
      { name: 'isNewUser', value: false },
      { name: 'connections', value: this.selectedConnections }]);
    this.userService.updateFbCollect();
    this.router.navigate(['mughub', this.userService.getUserSession().type]);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
