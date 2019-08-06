import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Upload } from '../upload/upload.model';
import { UserService } from 'src/app/mughub/auth/user.service';
import { SidenavService } from 'src/app/mughub/sidenav/sidenav.service';
import { User } from 'src/app/mughub/auth/user.model';
import { UploadService } from '../upload/upload.service';
import { ActivatedRoute } from '@angular/router';
import { Query } from '@angular/fire/firestore';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.css']
})
export class SentComponent implements OnInit {

  private subs = new Subscription();
  uploads: Upload[];
  uploadClicked: Upload = null;
  user: User;

  constructor(
    private userService: UserService,
    private sidenavService: SidenavService,
    private uploadService: UploadService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.user = this.userService.getUserSession();
    this.listenForUploadClicked();
    this.listenForUploads(this.route.snapshot.data.uploads);
  }

  listenForUploadClicked() {
    this.subs.add(this.uploadService.uploadClicked.subscribe(uploadClicked => {
      this.uploadClicked = uploadClicked;
    }))
  }

  listenForUploads(uploadQuery: Query) {
    this.subs.add(uploadQuery.onSnapshot(querySnapshot => {
      let uploads = [];
      querySnapshot.forEach(uploadDoc => uploads.push(this.uploadService.createUploadObj(uploadDoc)));
      this.uploads = uploads;
    }, error => console.log(error)))
  }

  onUploadClick(upload: Upload) {
    this.uploadService.uploadClicked.next(upload);
  }

  closeSidenav() {
    this.sidenavService.onToggle.next();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
