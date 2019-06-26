import { Component, OnInit } from '@angular/core';
import { ManageService } from '../manage.service';

@Component({
  selector: 'mughub-manage-site',
  templateUrl: './manage-site.component.html',
  styleUrls: ['./manage-site.component.css']
})
export class ManageSiteComponent implements OnInit {

  constructor(private manageService: ManageService) { }

  ngOnInit() {
  }

  onManage(pageToEdit) {
    this.manageService.onManage.next(pageToEdit); 
  }

}
