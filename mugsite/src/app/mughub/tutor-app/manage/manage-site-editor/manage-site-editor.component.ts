import { Component, OnInit, Input } from '@angular/core';
import { QueryDocumentSnapshot, DocumentData } from '@angular/fire/firestore';
import { ManageService } from '../manage.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { EditorBottomSheetEventsComponent } from './editor-bottom-sheet-events/editor-bottom-sheet-events.component';

@Component({
  selector: 'mughub-manage-site-editor',
  templateUrl: './manage-site-editor.component.html',
  styleUrls: ['./manage-site-editor.component.css']
})
export class ManageSiteEditorComponent implements OnInit {

  @Input() pageToManage: string;
  data: QueryDocumentSnapshot<DocumentData>[];
  emptyState: { mainTxt:  string, subTxt: string }

  constructor(private manageService: ManageService, private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.manageService.fetchData(this.pageToManage).subscribe(resData => {
      this.data = resData.docs;
    })
    this.emptyState = this.manageService.getEmptyState(this.pageToManage);
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

  onEdit(dataToEdit: QueryDocumentSnapshot<DocumentData>, docId: string) {
    this.bottomSheet.open(EditorBottomSheetEventsComponent, {
      hasBackdrop: false,
      data: {
        isEditMode: true,
        dataToEdit: dataToEdit,
        docId: docId
      }
    })
  }

}
