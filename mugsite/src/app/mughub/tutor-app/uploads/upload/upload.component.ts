import { Component, OnInit, Input, Output } from '@angular/core';
import { Upload } from '../upload.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'mughub-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  @Input() upload: Upload = null;
  @Input() currIndex: number = null;
  @Input() numOfUploads: number = null;
  @Output() finished = new Subject();
  creationMonth: string;

  constructor() { }

  ngOnInit() {
    if (this.currIndex === this.numOfUploads - 1)
     this.finished.next();
    this.creationMonth = this.getMonthStr(this.upload.creationDate.month);
  }

  getMonthStr(monthNum: number) {
    let months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    return months[monthNum - 1];
  }

}
