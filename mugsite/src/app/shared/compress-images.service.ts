import { Injectable } from '@angular/core';
import { ImageCompressService, IImage } from 'ng2-image-compress';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class CompressImagesService {

  isFileImage(file: File): boolean {
    const fileArr = file['type'].split('/');
    const acceptedFileTypes = ['jpg', 'jpeg', 'png'];
    return file && fileArr[0] === 'image' && acceptedFileTypes.includes(fileArr[1]);
  }

  compressImage(file: File): Promise<Observable<IImage>> {
    return ImageCompressService.filesArrayToCompressedImageSource([file]);
  }

  ifImageinSizeRange(imageDataUrl: string): boolean {
    let base64Length = imageDataUrl.length - (imageDataUrl.indexOf(',') + 1);
    let padding = (imageDataUrl.charAt(imageDataUrl.length - 2) === '=') ? 2 : ((imageDataUrl.charAt(imageDataUrl.length - 1) === '=') ? 1 : 0);
    return (base64Length * 0.75 - padding) <= 1000000;
  }

}
