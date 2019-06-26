import { Component, OnInit, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-headnav',
  templateUrl: './headnav.component.html',
  styleUrls: ['./headnav.component.css']
})
export class HeadnavComponent implements OnInit {

  @Input() title: string;
  @Output() sidenavToggled = new Subject();

  constructor() { }

  ngOnInit() {
    this.title = 'MANAGE'; //default
  }

  onSidenavToggle() {
    this.sidenavToggled.next();
  }

}
