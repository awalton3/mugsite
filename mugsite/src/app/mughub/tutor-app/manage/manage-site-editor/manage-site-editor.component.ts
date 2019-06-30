import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { QueryDocumentSnapshot, DocumentData } from '@angular/fire/firestore';
import { ManageService } from '../manage.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { EditorBottomSheetEventsComponent } from './editor-bottom-sheet-events/editor-bottom-sheet-events.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mughub-manage-site-editor',
  templateUrl: './manage-site-editor.component.html',
  styleUrls: ['./manage-site-editor.component.css']
})
export class ManageSiteEditorComponent implements OnInit, OnDestroy {

  @Input() pageToManage: string;
  data: QueryDocumentSnapshot<DocumentData>[];
  dataSub: Subscription;
  dataChangedSub: Subscription;
  emptyState: { mainTxt: string, subTxt: string }

  constructor(private manageService: ManageService, private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.fetchData();
    this.emptyState = this.manageService.getEmptyState(this.pageToManage);
    this.dataChangedSub = this.manageService.onDataChange.subscribe(() => {
      this.fetchData();
    })
  }

  fetchData() {
    this.dataSub = this.manageService.fetchData(this.pageToManage).subscribe(resData => {
      this.data = resData.docs;
    })
  }

  onCancel() {
    this.manageService.onManageCancel.next();
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

  ngOnDestroy() {
    this.dataChangedSub.unsubscribe();
    this.dataSub.unsubscribe();
  }

}
