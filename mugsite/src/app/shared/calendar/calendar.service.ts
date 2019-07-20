import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()

export class CalendarService {
  onDateClick = new Subject<Date>(); 
}
