import { Component, OnInit } from '@angular/core';
import { HeadnavService } from '../../headnav/headnav.service';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css']
})
export class UploadsComponent implements OnInit {

  constructor(
    private headnavService: HeadnavService
  ) { }

  ngOnInit() {
    this.headnavService.title.next('uploads'); 
  }

}
