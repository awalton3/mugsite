import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'src/app/mughub/auth/user.model';

@Injectable({providedIn: 'root'})

export class ConnectionFormService {
  onConnectionsChanged = new Subject<{ selectedConnections: User[], selectedConnectionsOrig: User[] }>();
  isformValid = new Subject<boolean>();
}
