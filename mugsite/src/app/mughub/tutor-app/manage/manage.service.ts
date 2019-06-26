import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})

export class ManageService {
  onManage = new Subject<string>();
  onManageCancel = new Subject(); 
}
