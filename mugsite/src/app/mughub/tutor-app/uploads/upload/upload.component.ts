import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mughub-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  @Input() upload = null;
  creationMonth: string;

  constructor() { }

  ngOnInit() {
    this.creationMonth = this.getMonthStr(this.upload.creationDate.month);
  }

  getMonthStr(monthNum: number) {
    let months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    return months[monthNum - 1];
  }

}
