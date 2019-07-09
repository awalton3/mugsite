import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mughub-upload-editor',
  templateUrl: './upload-editor.component.html',
  styleUrls: ['./upload-editor.component.css']
})
export class UploadEditorComponent implements OnInit {

  @Output() onClose = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
