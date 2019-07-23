import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HourLogElement } from 'src/app/mughub/tutor-app/hour-log/hour-log-element.model';

@Injectable()

export class CalendarService {
  onDateClick = new Subject<{ dateObj: Date, month: string, date: number }>();
}
