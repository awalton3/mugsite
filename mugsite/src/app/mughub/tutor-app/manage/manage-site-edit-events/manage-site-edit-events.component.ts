import { Component, OnInit } from '@angular/core';
import { MatBottomSheet} from '@angular/material/bottom-sheet';

import { ManageService } from '../manage.service';
import { EditorBottomSheetEventsComponent } from './editor-bottom-sheet-events/editor-bottom-sheet-events.component';

@Component({
  selector: 'manage-site-edit-events',
  templateUrl: './manage-site-edit-events.component.html',
  styleUrls: ['./manage-site-edit-events.component.css']
})
export class ManageSiteEditEventsComponent implements OnInit {

  constructor(
    private manageService: ManageService,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit() {
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
