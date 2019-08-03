import { Injectable } from '@angular/core';
import { ImageCompressService } from 'ng2-image-compress';

@Injectable({ providedIn: 'root' })

export class CompressImagesService {

  isFileImage(file: File) {
    const fileArr = file['type'].split('/');
    const acceptedFileTypes = ['jpg', 'jpeg', 'png'];
    return file && fileArr[0] === 'image' && acceptedFileTypes.includes(fileArr[1]);
  }

  compressImage(attachment: File) {
    return ImageCompressService.filesArrayToCompressedImageSource([attachment])
  }

  ifImageinSizeRange(imageDataUrl: string) {
    let base64Length = imageDataUrl.length - (imageDataUrl.indexOf(',') + 1);
    let padding = (imageDataUrl.charAt(imageDataUrl.length - 2) === '=') ? 2 : ((imageDataUrl.charAt(imageDataUrl.length - 1) === '=') ? 1 : 0);
    return (base64Length * 0.75 - padding) <= 1000000;
  }

}
