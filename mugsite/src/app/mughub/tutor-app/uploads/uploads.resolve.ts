import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { UploadService } from './upload.service';
import { Query } from '@angular/fire/firestore';

@Injectable()
export class UploadsResolve implements Resolve<Query>{

  constructor(private uploadService: UploadService) { }


  resolve(route: ActivatedRouteSnapshot): Query {
    return this.uploadService.fetchUploads()
  }

}
