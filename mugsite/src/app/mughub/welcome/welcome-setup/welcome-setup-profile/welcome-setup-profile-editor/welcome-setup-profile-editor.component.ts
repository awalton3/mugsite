import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/mughub/auth/user.service';
import { User } from 'src/app/mughub/auth/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'welcome-setup-profile-editor',
  templateUrl: './welcome-setup-profile-editor.component.html',
  styleUrls: ['./welcome-setup-profile-editor.component.css']
})
export class WelcomeSetupProfileEditorComponent implements OnInit, OnDestroy {

  private subs = new Subscription();
  imageUrls: string[];
  imagesLoaded = false;
  imageClicked: string;
  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getUserSession();
    this.listenForUser();
    this.imageUrls = [
      'https://i.ibb.co/qCWxMp9/4k-wallpaper-astronomy-evening-2085998-1.jpg',
      'https://i.ibb.co/TRW7CpR/action-adventure-bike-2519374-1.jpg',
      'https://i.ibb.co/dt9FSnb/adventure-automobile-classic-2533092-1.jpg',
      'https://i.ibb.co/g3pC0Hb/alley-architecture-buildings-2119106-1.jpg',
      'https://i.ibb.co/0fnsWZ8/anniversary-artificial-beautiful-1803911-1.jpg',
      'https://i.ibb.co/283rHBW/architecture-art-blur-2521470-1.jpg',
      'https://i.ibb.co/z859Jr0/bloom-blossom-depth-of-field-2184346-1.jpg',
      'https://i.ibb.co/qRS5zSy/branded-converse-all-star-converse-all-star-2421374-1.jpg',
      'https://i.ibb.co/bN7LHf8/environment-flora-foliage-2537632-1.jpg'
    ]
  }

  listenForUser() {
    this.subs.add(this.userService.user.subscribe(user => {
      this.user = user;
    }))
  }

  ngAfterViewInit() {
    this.imagesLoaded = true;
  }

  onImageClick(index: string | number) {
    this.userService.updateLocalUser([{ name: 'photoUrl', value: this.imageUrls[index] }]);
  }

  onUpload(event) {
    interface FileReaderEventTarget extends EventTarget {
      result: string
    }

    interface FileReaderEvent extends Event {
      target: FileReaderEventTarget;
      getMessage(): string;
    }

    let file = event.target.files[0];
    let reader: any = new FileReader();

    reader.onload = (e: FileReaderEvent) => {
      this.userService.updateLocalUser([{ name: 'photoUrl', value: e.target.result }]);
      this.imageUrls.unshift(e.target.result);
    }

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
