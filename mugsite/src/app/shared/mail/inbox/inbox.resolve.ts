import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Query } from '@angular/fire/firestore';
import { MailService } from '../mail.service';

@Injectable({providedIn: 'root'})
export class InboxResolve implements Resolve<Query>{

  constructor(private mailService: MailService) { }

  resolve(route: ActivatedRouteSnapshot): Query {
    return this.mailService.fetchInboxUploads()
  }

}
