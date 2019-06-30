import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })

export class ManageService {

  onManage = new Subject<string>();
  onManageCancel = new Subject();
  onDataChange = new Subject();

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
    return this.db.collection('/events').add({
      title: event.title,
      description: event.description,
      dateFrom: {
        day: event.dateFrom.getDate(),
        month: event.dateFrom.getMonth() + 1
      },
      dateTo: {
        day: this.getDayMonth(event.dateTo, true),
        month: this.getDayMonth(event.dateTo, false)
      },
      location: event.location,
      time: event.time,
      contact: event.contact,
      instructions: event.instructions,
      attachments: null,
      dateOption: event.dateOption
    });
  }

  deleteEvent(id) {
    return this.db.collection('/events').doc(id).delete();
  }

  updateEvent(changedFieldsObj: {}, docId) {
    return this.db.collection('/events').doc(docId).update(changedFieldsObj);
  }

  getDayMonth(property: any, isDay: boolean) {
    if (!property)
      return null;
    return isDay ? property.getDate() : property.getMonth() + 1
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
