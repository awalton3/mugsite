import { Component, OnInit, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'mughub-headnav',
  templateUrl: './headnav.component.html',
  styleUrls: ['./headnav.component.css']
})
export class HeadnavComponent implements OnInit {

  @Input() title: string;
  @Input() iconLeft?: string;
  @Input() iconRight?: string;
  @Output() leftIconToggled = new Subject();
  @Output() rightIconToggled = new Subject();

  constructor() { }

  ngOnInit() {
    // this.title = 'MANAGE'; //default
  }

  onLeftIconToggle() {
    this.leftIconToggled.next();
  }

}
