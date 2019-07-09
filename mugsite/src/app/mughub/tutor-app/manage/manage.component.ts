import { Component, OnInit } from '@angular/core';
import { HeadnavService } from '../../headnav/headnav.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  constructor(private headnavService: HeadnavService) { }

  ngOnInit() {
    this.headnavService.title.next('manage');
  }

}
