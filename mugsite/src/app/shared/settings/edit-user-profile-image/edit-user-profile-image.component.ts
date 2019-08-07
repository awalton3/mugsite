import { Component, OnInit, OnDestroy, AfterViewInit, Output, Input } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { CompressImagesService } from '../../compress-images.service';
import { SnackBarService } from '../../snack-bar/snack-bar.service';
import { take } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'mughub-edit-user-profile-image',
  templateUrl: './edit-user-profile-image.component.html',
  styleUrls: ['./edit-user-profile-image.component.css']
})

export class EditUserProfileImageComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() currProfileImage: { isDataUrl: boolean, url: string };
  private subs = new Subscription();
  imageUrls: string[];
  imagesLoaded = false;
  imageClicked: { isDataUrl: boolean, url: string };
  imageUploading: boolean = false;
  @Output() onCancelImageUploader = new Subject();
  @Output() onFinish = new Subject<{ isDataUrl: boolean, url: string }>();

  constructor(
    private compressImagesService: CompressImagesService,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit() {
    this.imageClicked = {
      isDataUrl: this.currProfileImage.isDataUrl,
      url:  this.currProfileImage.url
    }
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

  ngAfterViewInit() {
    this.imagesLoaded = true;
  }

  onImageClick(index: string | number) {
    this.imageClicked = {
      isDataUrl: false,
      url:  this.imageUrls[index]
    }
  }

  onUpload(event: { target: { files: any[]; }; }): void {
    this.imageUploading = true;
    const file = event.target.files[0];
    const isFileImage = this.compressImagesService.isFileImage(file);

    if (isFileImage) {

      this.compressImage(file)
        .then(imageObservable => {
          imageObservable
            .pipe(take(1))
            .subscribe((image: { compressedImage: { imageDataUrl: string; }; }) => {
              const validImageSize = this.compressImagesService.ifImageinSizeRange(image.compressedImage.imageDataUrl)
              if (validImageSize) {
                this.imageClicked = {
                  isDataUrl: true,
                  url:  image.compressedImage.imageDataUrl
                }
                this.imageUploading = false;
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

  onError(message: string) {
    this.snackBarService.onOpenSnackBar.next({ message: message, isError: true });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }


}
