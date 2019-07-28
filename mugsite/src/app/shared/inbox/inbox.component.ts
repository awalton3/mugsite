import { Component, OnInit } from '@angular/core';
import { SidenavService } from 'src/app/mughub/sidenav/sidenav.service';
import { Upload } from 'src/app/mughub/tutor-app/uploads/upload.model';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  testUpload: Upload;

  constructor(private sidenavService: SidenavService) { }

  ngOnInit() {
    this.testUpload = new Upload(null, null, null, null, null, null, null, null, null); 
  }

  closeSidenav() {
    this.sidenavService.onToggle.next();
  }

}
