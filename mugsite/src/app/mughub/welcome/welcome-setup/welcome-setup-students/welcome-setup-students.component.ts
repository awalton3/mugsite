import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/mughub/auth/user.service';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { MughubService } from 'src/app/mughub/mughub.service';
import { User } from 'src/app/mughub/auth/user.model';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-welcome-setup-students',
  templateUrl: './welcome-setup-students.component.html',
  styleUrls: ['./welcome-setup-students.component.css']
})
export class WelcomeSetupStudentsComponent implements OnInit, OnDestroy {

  private subs = new Subscription();
  connectForm: FormGroup;
  possibleConnections: User[] = [];
  possibleConnectionNames: string[] = [];
  filteredOptions: Observable<User[]>;
  connections: User[] = [];
  selectedOption: User;

  constructor(
    private userService: UserService,
    private router: Router,
    private mughubService: MughubService
  ) { }

  ngOnInit() {

    this.initForm();

    if (this.userService.getUserSession().type === 'tutor') {
      this.getStudents();
    } else {
      this.getTutors();
    }

    this.filteredOptions = this.connectForm.controls.name.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filterAutoComp(value))
      );
  }

  initForm() {
    this.connectForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, this.ValidateConnection.bind(this)])
    });
  }

  ValidateConnection(control: AbstractControl) {
    return this.possibleConnectionNames.includes(control.value) ? null : { validConnection: false };
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
            doc.data().prefs);
          this.possibleConnections.push(student);
          this.possibleConnectionNames.push(doc.data().name)
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
            doc.data().prefs);
          this.possibleConnections.push(tutor);
          this.possibleConnectionNames.push(doc.data().name)
        });
      }, error => { console.log(error) }));
  }

  filterAutoComp(value: string): User[] {
    const filterValue = value.toLowerCase();
    return this.possibleConnections.filter(user => user.name.toLowerCase().includes(filterValue));
  }

  addStudent() {
    if (this.selectedOption) {
      this.connections.push(this.selectedOption);
      this.selectedOption = null;
    }
    console.log(this.connections);
  }

  onFinish() {
    this.userService.updateLocalUser([{ name: 'isNewUser', value: false }]);
    this.userService.updateFbCollect();
    this.router.navigate(['mughub', this.userService.getUserSession().type]);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
