import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { User } from '../auth/user.model';
import { take } from 'rxjs/operators';
import { UserService } from '../auth/user.service';

@Injectable()
export class SettingsResolve implements Resolve<User[]>{

  existingConnections = [];
  constructor(private userService: UserService) { }

  resolve(): User[] {
    this.getConnections();
    return this.existingConnections;
  }

  getConnections() {
    this.userService.getUserSession().connections.map((connectionId: string) => {
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
          this.existingConnections.push(userObj)
        }, error => console.log(error))
    })
  }

}
