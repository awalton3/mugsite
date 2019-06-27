import { Component, OnInit } from '@angular/core';
import { MatBottomSheet} from '@angular/material/bottom-sheet';

import { ManageService } from '../manage.service';
import { EditorBottomSheetEventsComponent } from './editor-bottom-sheet-events/editor-bottom-sheet-events.component';
import { QueryDocumentSnapshot, DocumentData } from '@angular/fire/firestore';

@Component({
  selector: 'manage-site-edit-events',
  templateUrl: './manage-site-edit-events.component.html',
  styleUrls: ['./manage-site-edit-events.component.css']
})
export class ManageSiteEditEventsComponent implements OnInit {

  events: QueryDocumentSnapshot<DocumentData>[];

  constructor(
    private manageService: ManageService,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit() {
    this.manageService.fetchEvents().subscribe(resData => {
      this.events = resData.docs;
    })
  }

  onCancel() {
    this.manageService.onManageCancel.next();
  }

  onSubmit() {
    //...
  }

  onAdd() {
    this.bottomSheet.open(EditorBottomSheetEventsComponent, {
      hasBackdrop: false,
      data: {
        isEditMode: false
      }
    })
  }

  onEdit() {
    this.bottomSheet.open(EditorBottomSheetEventsComponent, {
      hasBackdrop: false,
      data: {
        isEditMode: true
      }
    })
  }
}
