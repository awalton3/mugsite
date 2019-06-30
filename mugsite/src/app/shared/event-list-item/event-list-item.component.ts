import { Component, OnInit, Input } from '@angular/core';
import { EventItem } from './EventItem.model';

@Component({
  selector: 'app-event-list-item',
  templateUrl: './event-list-item.component.html',
  styleUrls: ['./event-list-item.component.css']
})
export class EventListItemComponent implements OnInit {

  @Input() event: EventItem;
  formattedDateFrom: { day: string, month: string};
  formattedDateTo: { day: string, month: string};

//   defaultEvent: EventItem = {
//     title: 'Camp Funtastic 2019',
//     description: '$200 per child, Ages 9 - 14. Math intensives and fitness, writing and comic book design, environmetal science, overnight stay at Camp Round Meadow in Thurmont, MD, dinner included!.',
//     dateFrom: { day: '09', month: 'JUL' },
//     dateTo: { day: '08', month: 'AUG' },
//     location: '408 Addison Rd S, Capitol Heights, MD 20743',
//     time: 'Tuesdays, Wednesdays, Thursdays, 4 - 7:30 pm',
//     contact: 'For more info, call 301-928-2542 / visit m-u-g.org.',
//     instructions: '*Please fill out both forms below.',
//     attachments: ['Camp Fun-tastic 2019 Flyer', 'Camp Fun-tastic 2019', '2019 4-H Teen Xtreme Registration']
// }


  constructor() { }

  ngOnInit() {
    if (this.event) {
      this.formattedDateFrom = this.formatDate(this.event.dateFrom);
      this.formattedDateTo = this.formatDate(this.event.dateTo);
    }
    // else
    //   this.event = this.defaultEvent;
  }

  formatDate(date: { day: string, month: string}) {

    if (!date)
      return;

    let months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
    let formattedMonth = months[+date.month - 1];
    let formattedDay = date.day;
    if (JSON.stringify(date.day).length === 1)
      formattedDay = '0' + JSON.stringify(date.day)

    return { day: formattedDay, month: formattedMonth}

  }

}
