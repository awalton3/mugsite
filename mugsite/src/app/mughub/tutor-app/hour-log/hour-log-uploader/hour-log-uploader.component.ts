import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mughub-hour-log-uploader',
  templateUrl: './hour-log-uploader.component.html',
  styleUrls: ['./hour-log-uploader.component.css']
})
export class HourLogUploaderComponent implements OnInit {

  @Input() dateClicked: Date;
  constructor() { }

  ngOnInit() {
    console.log(this.dateClicked);
  }

}
