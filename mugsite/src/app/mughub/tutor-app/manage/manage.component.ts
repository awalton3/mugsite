import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ManageService } from './manage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit, OnDestroy {
  private sub = new Subscription()

  pageToManage: string;
  @ViewChild('editor', { static: false }) editor: any;

  constructor(
    private manageService: ManageService
  ) { }

  ngOnInit() {
    this.sub.add(this.manageService.onManage.subscribe(pageToManage => {
      this.pageToManage = pageToManage;
      this.editor.toggle();
    }))
    this.sub.add(this.manageService.onManageCancel.subscribe(() => {
      this.editor.close();
    }))
  }

  ngOnDestroy() {
    this.sub.unsubscribe(); 
  }

}
