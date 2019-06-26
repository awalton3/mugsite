import { Component, OnInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { ManageService } from './manage/manage.service';

@Component({
  selector: 'app-tutor-app',
  templateUrl: './tutor-app.component.html',
  styleUrls: ['./tutor-app.component.css']
})

export class TutorAppComponent implements OnInit, OnDestroy {

  navDest: string;
  pageToManage: string;

  @ViewChild('navDrawer', { static: false }) navDrawer: any;
  @ViewChild('editor', { static: false }) editor: any;

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 960) {
      this.navDrawer.opened = false;
      this.navDrawer.mode = 'over';
    } else {
      this.navDrawer.opened = true;
      this.navDrawer.mode = 'side';
    }
  }

  constructor(private manageService: ManageService) { }

  ngOnInit() {
    this.manageService.onManage.subscribe(pageToManage => {
      this.pageToManage = pageToManage;
      this.editor.toggle();
    })
  }

  ngOnDestroy() {
  }

  getNavDest(navDest: string) {
    this.navDest = navDest;
  }

}
