import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, throwError } from 'rxjs';
import { User } from 'src/app/mughub/auth/user.model';
import { UserService } from 'src/app/mughub/auth/user.service';
import { SidenavService } from 'src/app/mughub/sidenav/sidenav.service';
import { Upload } from './upload/upload.model';
import { UploadService } from './upload/upload.service';
import { MailService } from './mail.service';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit, OnDestroy {

  user: User;
  parent: string = 'inbox';
  uploads: Upload[];
  uploadClicked: Upload;
  loading: boolean;
  emptyState = {
    icon: '',
    title: { tutor: '', student: '' },
    subtitle: { tutor: '', student: '' }
  }

  private subs = new Subscription();
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private sidenavService: SidenavService,
    private uploadService: UploadService,
    private mailService: MailService
  ) { }

  ngOnInit() {
    this.loading = !(!!(this.uploads))
    this.user = this.userService.getUserSession();
    this.listenForUploads();
    this.listenForParentParam();
    this.listenForUploadClicked(); //do i need this???
    this.getEmptyState();
  }

  listenForParentParam() {
    this.subs.add(this.route.queryParams
      .subscribe(params => {
        if (params && params.reqDest) {
          this.parent = params.reqDest;
          this.getEmptyState();
          this.listenForUploads();
        }
      }, error => throwError(error)));
  }

  listenForUploads() {
    this.loading = true;
    this.uploads = [];
    if (this.parent === 'inbox')
      this.listenForInboxUploads();
    else if (this.parent === 'sent')
      this.listenForSentUploads();
    else
      this.listenForTrashUploads();
  }

  listenForInboxUploads() {
    this.subs.add(this.mailService.fetchInboxUploads().onSnapshot(querySnapshot => {
      console.log(querySnapshot)
      let uploads = [];
      querySnapshot.forEach(uploadDoc => uploads.push(this.uploadService.createUploadObj(uploadDoc)));
      this.uploads = uploads;
      this.loading = false;
    }, error => {
      this.loading = false;
      console.log(error)
    }))
  }

  listenForSentUploads() {
    this.subs.add(this.mailService.fetchUserUploads().onSnapshot(querySnapshot => {
      let uploads = [];
      querySnapshot.forEach(uploadDoc => uploads.push(this.uploadService.createUploadObj(uploadDoc)));
      this.uploads = uploads;
      this.loading = false;
    }, error => {
      this.loading = false;
      console.log(error)
    }))
  }

  listenForTrashUploads() {
    this.subs.add(this.mailService.fetchTrashUploads().onSnapshot(querySnapshot => {
      let uploads = [];
      querySnapshot.forEach(uploadDoc => {
        uploads.push(this.uploadService.createUploadObj(uploadDoc));
      });
      this.uploads = uploads;
      this.loading = false;
    }, error => {
      this.loading = false;
      console.log(error)
    }))
  }

  listenForUploadClicked() {
    this.subs.add(this.uploadService.uploadClicked.subscribe(uploadClicked => {
      this.uploadClicked = uploadClicked;
    }))
  }

  getEmptyState() {
    switch (this.parent) {
      case 'inbox':
        this.emptyState = {
          icon: 'trophy',
          title: { tutor: 'CONGRATS, YOU HAVE A CLEAN INBOX!', student: 'CONGRATS, YOU HAVE A CLEAN INBOX!' },
          subtitle: { tutor: "At MUG, we celebrate the small wins. Keep 'em coming.", student: "At MUG, we celebrate the small wins. Keep 'em coming." }
        }
        break;
      case 'sent':
        this.emptyState = {
          icon: 'globe',
          title: { tutor: 'BUILD A BETTER CONNECTION WITH YOUR STUDENT', student: 'BUILD A BETTER CONNECTION WITH YOUR TUTOR' },
          subtitle: { tutor: "Upload an assignment using the button on the bottom right.", student: "Ask a question or discuss assigned work, using the button on the bottom right." }
        }
        break;
      case 'trash':
        this.emptyState = {
          icon: 'trash',
          title: { tutor: "WHO TOOK THE TRASH OUT?", student: "WHO TOOK THE TRASH OUT?" },
          subtitle: { tutor: "When your trash bin reaches a max of 15 messages, we empty it for you.", student: "When your trash bin reaches a max of 15 messages, we empty it for you." }
        }
    }
  }

  onUploadClick(upload: Upload) {
    this.uploadService.uploadClicked.next(upload);
    this.uploadClicked = upload;
    if (upload.unread) {
      this.mailService.editMessage(upload, { unread: false }, []);
    }
  }

  closeSidenav() {
    this.sidenavService.onToggle.next();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
