import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})

export class ConnectionFormService {
  onConnectionsChanged = new Subject<{ selectedConnections: string[], selectedConnectionsOrig: string[] }>();
  isformValid = new Subject<boolean>();
  resetConnectionForm = new Subject();
}
