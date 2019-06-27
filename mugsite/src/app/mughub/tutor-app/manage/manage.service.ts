import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({providedIn: 'root'})

export class ManageService {

  onManage = new Subject<string>();
  onManageCancel = new Subject();

  constructor(private db: AngularFirestore) {}

  fetchEvents() {
    return this.db.collection('/events').get(); 
  }

}
