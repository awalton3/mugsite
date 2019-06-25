import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-headnav',
  templateUrl: './headnav.component.html',
  styleUrls: ['./headnav.component.css']
})
export class HeadnavComponent implements OnInit {

  @Input() title: string;
  @Output() sidenavToggled = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.title = 'MANAGE'; //default
  }

  onSidenavToggle() {
    this.sidenavToggled.emit();
  }

}
