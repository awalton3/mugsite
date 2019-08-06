import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'src/app/mughub/auth/user.model';

@Injectable({providedIn: 'root'})

export class ConnectionFormService {
  onConnectionsChanged = new Subject<{ selectedConnections: string[], selectedConnectionsOrig: string[] }>();
  onInitForEdit = new Subject<User[]>(); 
  isformValid = new Subject<boolean>();
  resetConnectionForm = new Subject();
}
