import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'editor-bottom-sheet-events',
  templateUrl: './editor-bottom-sheet-events.component.html',
  styleUrls: ['./editor-bottom-sheet-events.component.css']
})

export class EditorBottomSheetEventsComponent implements OnInit{

  constructor(
    private bottomSheetRef: MatBottomSheetRef<EditorBottomSheetEventsComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
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
