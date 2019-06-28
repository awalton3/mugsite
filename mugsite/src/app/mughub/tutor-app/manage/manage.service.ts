import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })

export class ManageService {

  onManage = new Subject<string>();
  onManageCancel = new Subject();

  constructor(private db: AngularFirestore) { }

  fetchData(dataToFetch: string) {
    switch (dataToFetch) {
      case 'events': return this.fetchEvents();
    }
  }

  fetchEvents() {
    return this.db.collection('/events').get();
  }

  addNewEvent(event) {
    this.db.collection('/events').add({
      title: event.title,
      description: event.description,
      dateFrom: { day: event.dateFrom.getDay(), month: event.dateFrom.getMonth() },
      dateTo: { day: event.dateTo.getDay(), month: event.dateTo.getMonth() },
      location: event.location,
      time: event.time,
      contact: event.contact,
      instructions: event.instructions,
      attachments: null
    })
  }

  getEmptyState(pageToManage) {
    switch (pageToManage) {
      case 'events':
        return {
          mainTxt: 'spread the word',
          subTxt: 'Start by clicking the add button below to create an event.'
        }
    }
  }

}
