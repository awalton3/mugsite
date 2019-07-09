import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ManageService } from './manage.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit, OnDestroy {

  pageToManage: string;
  @ViewChild('editor', { static: false }) editor: any;

  constructor(
    private manageService: ManageService
  ) { }

  ngOnInit() {
    this.manageService.onManage.subscribe(pageToManage => {
      this.pageToManage = pageToManage;
      this.editor.toggle();
    })
    this.manageService.onManageCancel.subscribe(() => {
      this.editor.close();
    })
  }

  ngOnDestroy() {
    this.manageService.onManage.unsubscribe();
    this.manageService.onManageCancel.unsubscribe();
  }

}
