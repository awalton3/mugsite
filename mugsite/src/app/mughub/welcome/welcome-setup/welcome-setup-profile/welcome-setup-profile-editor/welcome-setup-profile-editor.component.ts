import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/mughub/auth/user.service';
import { User } from 'src/app/mughub/auth/user.model';
import { Subscription } from 'rxjs';
import { CompressImagesService } from 'src/app/shared/compress-images.service';
import { SnackBarService } from 'src/app/shared/snack-bar/snack-bar.service';
import { take } from 'rxjs/operators';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';

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
  imageUploading: boolean = false;
  user: User;

  constructor(
    private userService: UserService,
    private compressImagesService: CompressImagesService,
    private snackBarService: SnackBarService
  ) { }

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

  onUpload(event): void {
    this.imageUploading = true;
    const file = event.target.files[0];
    const isFileImage = this.compressImagesService.isFileImage(file);

    if (isFileImage) {

      this.compressImage(file)
        .then(imageObservable => {
          imageObservable
            .pipe(take(1))
            .subscribe(image => {
              const validImageSize = this.compressImagesService.ifImageinSizeRange(image.compressedImage.imageDataUrl)
              if (validImageSize) {
                this.uploadProfileImage(image.compressedImage.imageDataUrl)
                  .then(snapshot => this.updateUserSession(snapshot))
                  .catch(error => {
                    console.log(error);
                    this.onError("Error saving your image to storage.");
                  })
              } else {
                this.onError("File must be 1MB or under");
              }
            })
        })

    } else {
      this.onError("File must have a .png, .jpeg, or a .jpg extension.");
    }

  }

  async compressImage(file: File): Promise<any> {
    try {
      const imageObservable = await this.compressImagesService.compressImage(file);
      return Promise.resolve(imageObservable);
    }
    catch (error) {
      return Promise.reject(error);
    }
  }

  async uploadProfileImage(imageDataUrl: string): Promise<any> {
    try {
      const snapshot = await this.userService.uploadProfileImage(imageDataUrl);
      return Promise.resolve(snapshot);
    }
    catch (error) {
      return Promise.reject(error);
    }
  }

  updateUserSession(snapshot: UploadTaskSnapshot): void {
    snapshot.ref.getDownloadURL()
      .then(url => {
        this.userService.updateLocalUser([{ name: 'photoUrl', value: url }]);
        this.imageUrls.unshift(url);
        this.imageUploading = false;
      }).catch(error => {
        console.log(error)
        this.onError("Error in retrieving imageUrl from storage");
      })
  }

  onError(message: string) {
    this.snackBarService.onOpenSnackBar.next({ message: message, isError: true });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
