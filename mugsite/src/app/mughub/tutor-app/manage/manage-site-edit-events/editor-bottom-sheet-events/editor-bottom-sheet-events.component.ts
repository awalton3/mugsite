import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'editor-bottom-sheet-events',
  templateUrl: './editor-bottom-sheet-events.component.html',
  styleUrls: ['./editor-bottom-sheet-events.component.css']
})

export class EditorBottomSheetEventsComponent implements OnInit{

  constructor(
    private bottomSheetRef: MatBottomSheetRef<EditorBottomSheetEventsComponent>,
  ) { }


  ngOnInit() {

  }

  onCancel() {
    this.bottomSheetRef.dismiss();
  }

  onSubmit() {
    //...
  }

}
