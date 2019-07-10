import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mughub-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  @Input() upload = {};

  constructor() { }

  ngOnInit() {
  }

}
